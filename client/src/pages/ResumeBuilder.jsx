import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight,
  FileText, FolderIcon, GraduationCap,
  Sparkles, User, Maximize2, MousePointer2
} from 'lucide-react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { dummyResumeData } from '../assets/assets'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'

// Form Components
import PersonalInfoForm from '../components/PersonalInfoForm'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'

// UI Components
import ResumePreview from '../components/ResumePreview'
import ColorPicker from '../components/ColorPicker'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "",
    accent_color: "#D97706",
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  const sections = [
    { id: "personal", name: "Profile", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Work", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  const loadExistingResume = async () => {
    try {
      setIsFetching(true)
      const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title || "Editor";
      }
    } catch (error) {
      console.log(error.message)
      toast.error("Failed to load resume")
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    if (resumeId) loadExistingResume()
  }, [resumeId])

  const saveResume = async () => {
    if (isFetching) return;

    try {
      let dataToSend = JSON.parse(JSON.stringify(resumeData));
      const imageFile = resumeData.personal_info?.image;

      if (imageFile instanceof File) {
        dataToSend.personal_info.image = "";
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append('resumeData', JSON.stringify(dataToSend));

      if (removeBackground) formData.append("removeBackground", "yes");
      if (imageFile instanceof File) {
        formData.append("image", imageFile);
      }

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token }
      });

      if (data.resume) {
        setResumeData(data.resume);
        toast.success("Sync complete");
      }
    } catch (error) {
      console.error("Save Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Sync failed");
    }
  };

  const handleFillSampleData = () => {
    const sample = structuredClone(dummyResumeData[0]);
    setResumeData({
      ...resumeData,
      personal_info: sample.personal_info,
      professional_summary: sample.professional_summary,
      experience: sample.experience,
      education: sample.education,
      project: sample.project,
      skills: sample.skills,
    });
    toast.success("Sample data applied");
  }

  const downloadResume = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;
    const loadingToast = toast.loading("Rendering PDF...");
    try {
      const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 3, backgroundColor: '#ffffff' });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (pdf.internal.pageSize.getHeight());
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.title || 'resume'}.pdf`);
      toast.dismiss(loadingToast);
      toast.success("Export successful");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Export failed");
    }
  };

  if (isFetching) return (
    <div className='h-screen flex items-center justify-center bg-[#FAFAFA]'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-amber-600'></div>
    </div>
  )

  return (
    <div className='min-h-screen bg-[#FAFAFA] pb-20 font-sans text-slate-900'>

      <nav className="bg-white/40 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-10 h-14 flex items-center justify-between">
          <div className='flex items-center gap-10'>
            <Link to={'/app'} className='text-slate-400 hover:text-amber-600 transition-colors'>
              <ArrowLeftIcon size={18} />
            </Link>

            <div className='flex items-center gap-4'>
              <input
                type="text"
                value={resumeData.title || ""}
                onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
                className="text-xs font-bold uppercase tracking-[0.3em] bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-300 w-64"
                placeholder="UNTITLED_RESUME"
              />
              <div className='h-3 w-[1px] bg-slate-200 hidden sm:block' />
              <div className='hidden sm:flex items-center gap-2'>
                <div className='size-1 bg-amber-500 rounded-full animate-pulse' />
                <span className='text-[9px] text-slate-400 font-bold uppercase tracking-widest'>Live</span>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-8'>
            {/* Displaying current template name as read-only label instead of button */}
            <span className='text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase'>
              Layout: {resumeData.template}
            </span>

            <button onClick={saveResume} className='text-[10px] font-bold text-slate-400 hover:text-amber-600 tracking-[0.2em] uppercase transition-colors'>Save</button>
            <button
              onClick={downloadResume}
              className='px-6 py-1.5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-amber-600 transition-all'
            >
              Export
            </button>
          </div>
        </div>
      </nav>

      <div className='max-w-[1800px] mx-auto px-10 mt-12'>
        <div className='grid lg:grid-cols-12 gap-16'>

          <div className='lg:col-span-1'>
            <div className='flex flex-col gap-10 sticky top-32 items-center'>
              {sections.map((sec, index) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionIndex(index)}
                  className={`relative group transition-all ${activeSectionIndex === index ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500'}`}
                >
                  <sec.icon size={20} strokeWidth={activeSectionIndex === index ? 2.5 : 1.5} />
                  {activeSectionIndex === index && (
                    <div className='absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-1 bg-amber-500 rounded-full' />
                  )}
                  <span className='absolute left-12 scale-0 group-hover:scale-100 transition-transform origin-left text-[9px] font-black uppercase tracking-[0.2em] bg-white border border-slate-100 px-3 py-1.5 rounded shadow-sm z-10 whitespace-nowrap'>
                    {sec.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className='lg:col-span-5'>
            <div className='space-y-12'>
              <header className='flex items-end justify-between border-b border-slate-100 pb-6'>
                <div>
                  <h1 className='text-4xl font-extralight text-slate-900 tracking-tighter'>
                    {activeSection.name}<span className='font-bold text-amber-500'>.</span>
                  </h1>
                  <p className='text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2'>Information Architecture / {activeSection.id}</p>
                </div>
                <div className='text-right'>
                  <span className='text-3xl font-light text-slate-200'>0{activeSectionIndex + 1}</span>
                </div>
              </header>

              <div className='min-h-[55vh]'>
                <div className='animate-in fade-in duration-700 slide-in-from-bottom-2'>
                  {activeSection.id === 'personal' && <PersonalInfoForm data={resumeData.personal_info} onChange={(d) => setResumeData(prev => ({ ...prev, personal_info: d }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />}
                  {activeSection.id === 'summary' && <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(d) => setResumeData(prev => ({ ...prev, professional_summary: d }))} setResumeData={setResumeData} />}
                  {activeSection.id === 'experience' && <ExperienceForm data={resumeData.experience} onChange={(d) => setResumeData(prev => ({ ...prev, experience: d }))} />}
                  {activeSection.id === 'education' && <EducationForm data={resumeData.education} onChange={(d) => setResumeData(prev => ({ ...prev, education: d }))} />}
                  {activeSection.id === 'projects' && <ProjectForm data={resumeData.project} onChange={(d) => setResumeData(prev => ({ ...prev, project: d }))} />}
                  {activeSection.id === 'skills' && <SkillsForm data={resumeData.skills} onChange={(d) => setResumeData(prev => ({ ...prev, skills: d }))} />}
                </div>
              </div>

              <div className='pt-10 flex items-center justify-between border-t border-slate-50'>
                <button
                  onClick={() => setActiveSectionIndex(prev => prev - 1)}
                  disabled={activeSectionIndex === 0}
                  className='group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all'
                >
                  <ChevronLeft size={14} className='group-hover:-translate-x-1 transition-transform' /> Prev
                </button>

                <div className='flex items-center gap-6'>
                  <div className='flex items-center gap-2'>
                    {/* TEMPLATE SELECTOR REMOVED HERE */}
                    <ColorPicker selectedColor={resumeData.accent_color} onChange={(c) => setResumeData(prev => ({ ...prev, accent_color: c }))} />
                  </div>
                  <button onClick={handleFillSampleData} className='text-slate-400 hover:text-amber-500 transition-colors'>
                    <Sparkles size={16} />
                  </button>
                </div>

                <button
                  onClick={() => setActiveSectionIndex(prev => prev + 1)}
                  disabled={activeSectionIndex === sections.length - 1}
                  className='group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-800 disabled:opacity-0 transition-all'
                >
                  Next <ChevronRight size={14} className='group-hover:translate-x-1 transition-transform' />
                </button>
              </div>
            </div>
          </div>

          <div className='lg:col-span-6'>
            <div className='sticky top-32'>
              <div className='relative group'>
                {resumeData.template && (
                  <div key={resumeData.updatedAt} className='bg-white ...'>
                    {/* Adding a key tied to updatedAt forces the preview to re-render when the server saves */}
                    <ResumePreview
                      data={resumeData}
                      template={resumeData.template}
                      accentColor={resumeData.accent_color}
                    />
                  </div>
                )}
                <div className='absolute -bottom-10 -right-10 size-40 bg-amber-100/20 blur-[100px] -z-10' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder