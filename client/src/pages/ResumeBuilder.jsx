import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight,
  FileText, FolderIcon, GraduationCap,
  Sparkles, User, Award, Layers,
  ZoomIn, ZoomOut, Save, Download, X
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
import CertificationForm from '../components/CertificationForm';
import CustomSectionForm from '../components/CustomSectionForm';

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
    certifications: [],
    custom_section: { title: "Activities", items: [] },
    template: "classic",
    accent_color: "#D97706",
    font_size: "14px",
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  // CHANGED: Initial zoom set to 50%
  const [zoom, setZoom] = useState(0.5)

  const sections = [
    { id: "personal", name: "Profile", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Work", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "certifications", name: "Awards", icon: Award },
    { id: "custom", name: "Custom", icon: Layers }
  ]

  const activeSection = sections[activeSectionIndex]

  // --- API & LOGIC ---
  const loadExistingResume = async () => {
    try {
      setIsFetching(true)
      const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData({
          ...data.resume,
          certifications: data.resume.certifications || [],
          custom_section: data.resume.custom_section || { title: "Activities", items: [] }
        })
        document.title = data.resume.title || "Editor";
      }
    } catch (error) {
      console.error(error);
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
    const loadingToast = toast.loading("Saving...");
    try {
      let dataToSend = JSON.parse(JSON.stringify(resumeData));
      const imageFile = resumeData.personal_info?.image;
      if (imageFile instanceof File) dataToSend.personal_info.image = "";

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append('resumeData', JSON.stringify(dataToSend));
      if (removeBackground) formData.append("removeBackground", "yes");
      if (imageFile instanceof File) formData.append("image", imageFile);

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token }
      });

      if (data.resume) {
        setResumeData({
          ...data.resume,
          certifications: data.resume.certifications || [],
          custom_section: data.resume.custom_section || { title: "Activities", items: [] }
        });
        toast.dismiss(loadingToast);
        toast.success("Saved");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Sync failed");
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
      certifications: sample.certifications || [],
      custom_section: sample.custom_section || { title: "Activities", items: [] }
    });
    toast.success("Sample data applied");
  }

  const handleDragEnd = (result, sectionKey) => {
    if (!result.destination) return;
    const items = Array.from(resumeData[sectionKey]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setResumeData(prev => ({ ...prev, [sectionKey]: items }));
  };

  const downloadResume = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;
    const loadingToast = toast.loading("Exporting...");

    try {
      const originalTransform = element.style.transform;
      element.style.transform = "scale(1)"; // Reset scale for capture

      const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 2, backgroundColor: '#ffffff' });

      element.style.transform = originalTransform; // Restore scale

      const img = new Image();
      img.src = dataUrl;
      await img.decode();
      const pdfWidth = 210;
      const pdfHeight = (img.height * pdfWidth) / img.width;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.title || 'resume'}.pdf`);

      toast.dismiss(loadingToast);
      toast.success("Exported");
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("Failed");
    }
  };

  if (isFetching) return (
    <div className='h-screen flex items-center justify-center bg-white'>
      <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-slate-800'></div>
    </div>
  )

  return (
    <div className='h-screen flex flex-col bg-white text-slate-900 font-sans overflow-hidden'>

      {/* --- TOP NAVBAR --- */}
      <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4 z-40 shrink-0">
        <div className='flex items-center gap-3'>
          <Link to={'/app'} className='w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-500 transition-colors'>
            <ArrowLeftIcon size={18} />
          </Link>
          <div className='h-4 w-px bg-slate-200 mx-1'></div>
          <input
            type="text"
            value={resumeData.title || ""}
            onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
            className="text-sm font-semibold text-slate-800 bg-transparent border-none focus:ring-0 p-0 placeholder:text-slate-400 w-48 truncate"
            placeholder="Untitled Resume"
          />
        </div>

        <div className='flex items-center gap-3'>
          <div className='hidden lg:flex items-center gap-4 mr-4'>
            <div className='flex items-center gap-2'>
              <select
                value={resumeData.font_size}
                onChange={(e) => setResumeData(prev => ({ ...prev, font_size: e.target.value }))}
                className='bg-transparent border-none text-xs font-medium text-slate-600 focus:ring-0 cursor-pointer py-1'
              >
                <option value="12px">Small Text</option>
                <option value="14px">Normal Text</option>
                <option value="16px">Large Text</option>
              </select>
            </div>
            <div className='w-px h-4 bg-slate-200'></div>
            <ColorPicker selectedColor={resumeData.accent_color} onChange={(c) => setResumeData(prev => ({ ...prev, accent_color: c }))} />
          </div>

          <button onClick={saveResume} className='text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-1.5 transition-colors'>
            Save
          </button>
          <button onClick={downloadResume} className='flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-all'>
            <Download size={14} /> Export
          </button>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className='flex-1 flex overflow-hidden'>

        {/* 1. LEFT PANEL: EDITOR (NARROWER: 33%) */}
        <div className='w-full lg:w-[38%] 2xl:w-[40%] flex flex-col bg-white border-r border-slate-200 z-20'>

          <div className='flex-1 flex overflow-hidden'>

            {/* A. Sidebar Navigation (Slimmer: w-16) */}
            <nav className='w-16 bg-slate-50 border-r border-slate-100 flex flex-col items-center py-4 gap-3 overflow-y-auto hide-scrollbar shrink-0'>
              {sections.map((sec, index) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionIndex(index)}
                  className={`relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 group ${activeSectionIndex === index
                      ? 'bg-white text-amber-600 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-400 hover:bg-white hover:text-slate-600'
                    }`}
                  title={sec.name}
                >
                  <sec.icon size={18} strokeWidth={activeSectionIndex === index ? 2 : 1.5} />
                </button>
              ))}
            </nav>

            {/* B. Form Area (Reduced padding: p-6) */}
            <div className='flex-1 overflow-y-auto bg-white relative'>
              <div className='w-full max-w-full p-6 pb-24 min-h-full flex flex-col'>

                {/* Header */}
                <div className='mb-6'>
                  <h2 className='text-lg font-bold text-slate-900'>
                    {activeSection.name}
                  </h2>
                  <p className='text-xs text-slate-400 mt-1'>Fill in your details.</p>
                </div>

                {/* Dynamic Form */}
                <div className='flex-1 space-y-6'>
                  {activeSection.id === 'personal' && <PersonalInfoForm data={resumeData.personal_info} onChange={(d) => setResumeData(prev => ({ ...prev, personal_info: d }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />}
                  {activeSection.id === 'summary' && <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(d) => setResumeData(prev => ({ ...prev, professional_summary: d }))} setResumeData={setResumeData} />}
                  {activeSection.id === 'experience' && <ExperienceForm data={resumeData.experience} onChange={(d) => setResumeData(prev => ({ ...prev, experience: d }))} />}
                  {activeSection.id === 'education' && <EducationForm data={resumeData.education} onChange={(d) => setResumeData(prev => ({ ...prev, education: d }))} />}
                  {activeSection.id === 'projects' && <ProjectForm data={resumeData.project} onChange={(d) => setResumeData(prev => ({ ...prev, project: d }))} onDragEnd={(result) => handleDragEnd(result, 'project')} />}
                  {activeSection.id === 'skills' && <SkillsForm data={resumeData.skills} onChange={(d) => setResumeData(prev => ({ ...prev, skills: d }))} />}
                  {activeSection.id === 'certifications' && <CertificationForm data={resumeData.certifications || []} onChange={(d) => setResumeData(prev => ({ ...prev, certifications: d }))} />}
                  {activeSection.id === 'custom' && <CustomSectionForm data={resumeData.custom_section || { title: "Activities", items: [] }} onChange={(d) => setResumeData(prev => ({ ...prev, custom_section: d }))} />}
                </div>

                {/* Bottom Nav */}
                <div className='flex items-center justify-between mt-10 pt-4 border-t border-slate-50'>
                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                    disabled={activeSectionIndex === 0}
                    className='text-xs font-semibold text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-colors'
                  >
                    Back
                  </button>
                  <button onClick={handleFillSampleData} className='text-slate-300 hover:text-amber-500 transition-colors' title="Auto Fill">
                    <Sparkles size={14} />
                  </button>
                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.min(sections.length - 1, prev + 1))}
                    disabled={activeSectionIndex === sections.length - 1}
                    className='flex items-center gap-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-30 transition-all px-4 py-2 rounded-md'
                  >
                    Next <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. RIGHT PANEL: PREVIEW (WIDER: 67%) */}
        <div className='hidden lg:block flex-1 bg-slate-50/50 overflow-y-auto relative scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent pb-16'>

          <div className='max-h-[100vh] w-full flex flex-col items-center justify-start relative z-10 p-16'>
             <div className="inset-0 pointer-events-none opacity-[0.8] absolute"
            style={{
              backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}>
          </div>

            {/* Scale Wrapper */}
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              <div id="resume-preview" className='shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)]'>
                {resumeData.template && (
                  <ResumePreview
                    data={resumeData}
                    template={resumeData.template}
                    accentColor={resumeData.accent_color}
                    fontSize={resumeData.font_size}
                  />
                )}
              </div>
            </div>
          </div>


          {/* Floating Zoom Controls */}
          <div className='fixed bottom-6 right-8 z-50 flex items-center gap-1 bg-white p-1 rounded-full border border-slate-200 shadow-lg'>
            <button onClick={() => setZoom(prev => Math.max(0.3, prev - 0.1))} className='w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-full text-slate-500 transition-colors'><ZoomOut size={14} /></button>
            <span className='text-[10px] font-bold text-slate-700 w-8 text-center select-none'>{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))} className='w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-full text-slate-500 transition-colors'><ZoomIn size={14} /></button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ResumeBuilder