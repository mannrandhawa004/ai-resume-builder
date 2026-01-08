import {
  PlusIcon, Trash2, FileText, X, ChevronRight, LayoutTemplate
} from 'lucide-react'
import React, { useEffect, useState, useMemo, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import TemplateGalleryModal from '../components/TemplateGalleryModal'

const templateGlobs = import.meta.glob('../components/templates/*Template.jsx');

const templateCache = {};

const loadTemplate = (name) => {
  const formattedName = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  const filePath = `../components/templates/${formattedName}Template.jsx`;

  if (!templateCache[formattedName]) {
    const importer = templateGlobs[filePath];

    if (importer) {
      templateCache[formattedName] = lazy(importer);
    } else {
      console.error(`Template not found: ${formattedName}`);
      templateCache[formattedName] = lazy(() =>
        import('../components/templates/MinimalTemplate.jsx') // Ensure this path is correct too
      );
    }
  }

  return templateCache[formattedName];
};


const ResumeCard = React.memo(({ resume, idx, navigate, setResumeToDelete }) => {
  const DynamicTemplate = useMemo(() => loadTemplate(resume.template || 'minimal'), [resume.template]);

  return (
    <div
      className='group flex flex-col gap-2 sm:gap-3 animate-in fade-in zoom-in-95 duration-500'
      style={{ animationDelay: `${idx * 50}ms` }}
    >
   
      <div
        onClick={() => navigate(`/app/builder/${resume._id}`)}
        className='relative w-full aspect-[1/1.4142] bg-slate-50 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:border-amber-400 border border-slate-200 transition-all duration-300'
      >
        <Suspense fallback={<div className="absolute inset-0 bg-slate-100 animate-pulse" />}>


          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[210mm] origin-top transform scale-[0.2] xs:scale-[0.24] sm:scale-[0.28] md:scale-[0.32] lg:scale-[0.26] xl:scale-[0.3] 2xl:scale-[0.35]'>


            <div className='bg-white shadow-sm min-h-[297mm]'>
              <DynamicTemplate
                data={resume}
                accentColor={resume.accent_color}
              />
            </div>
          </div>
        </Suspense>

        {/* Hover Overlay */}
        <div className='absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center z-10'>
          <button className='hidden sm:flex opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all bg-white text-slate-900 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg items-center gap-2'>
            Open <ChevronRight size={12} />
          </button>
        </div>

        {/* Delete Button */}
        <button
          onClick={(e) => { e.stopPropagation(); setResumeToDelete(resume._id) }}
          className='absolute top-2 right-2 p-1.5 sm:p-2 bg-white/90 backdrop-blur text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full sm:opacity-0 group-hover:opacity-100 transition-all shadow-sm z-20 border border-slate-100'
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Info Footer */}
      <div className='px-1'>
        <h3 className='text-xs sm:text-sm font-bold text-slate-800 truncate leading-tight group-hover:text-amber-600 transition-colors'>
          {resume.title}
        </h3>
        <div className='flex items-center gap-1.5 mt-1'>
          <LayoutTemplate size={10} className="text-slate-400" />
          <span className='text-[9px] sm:text-[10px] font-medium text-slate-400 uppercase tracking-wider truncate'>
            {resume.template || "Minimal"}
          </span>
        </div>
      </div>
    </div>
  );
});

const Dashboard = () => {
  const { token, user } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const [allResumes, setAllResumes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showNameModal, setShowNameModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [resumeToDelete, setResumeToDelete] = useState(null)
  const [title, setTitle] = useState('')

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error("Cloud library unreachable")
    }
  }

  const proceedToTemplateSelection = (e) => {
    e.preventDefault()
    if (!title.trim()) return toast.error("Please provide a project name")
    setShowNameModal(false)
    setTimeout(() => setShowGalleryModal(true), 150)
  }

  const handleFinalCreate = async (templateId) => {
    if (isLoading) return
    setIsLoading(true)
    const loadingToast = toast.loading("Building your workspace...")
    try {
      const { data } = await api.post('/api/resumes/create',
        { title, template: templateId },
        { headers: { Authorization: token } }
      )
      toast.success("Identity blueprint initialized", { id: loadingToast })
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      setIsLoading(false)
      toast.error("Initialization failed", { id: loadingToast })
    }
  }

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/resumes/delete/${resumeToDelete}`, { headers: { Authorization: token } })
      setAllResumes(allResumes.filter(r => r._id !== resumeToDelete))
      setResumeToDelete(null)
      toast.success("Document purged")
    } catch (error) {
      toast.error("Purge failed")
    }
  }

  useEffect(() => { loadAllResumes() }, [])

  return (
    <div className='min-h-screen bg-slate-50/50 pb-20 font-sans text-slate-900'>
      <div className='max-w-[1600px] mx-auto px-4 sm:px-10 pt-10 sm:pt-16'>

        {/* --- HEADER SECTION --- */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 sm:mb-16'>
          <div className='space-y-1 sm:space-y-2'>
            <div className='flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest'>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              {user?.name || 'Workspace'}
            </div>
            <h1 className='text-3xl sm:text-5xl font-bold tracking-tight text-slate-900'>
              My <span className='text-slate-400 font-serif italic'>Resumes</span>
            </h1>
          </div>

          <button
            onClick={() => { setTitle(''); setShowNameModal(true) }}
            className='w-full sm:w-auto group flex items-center justify-center gap-3 px-6 py-3.5 bg-slate-900 text-white rounded-2xl sm:rounded-full hover:bg-slate-800 transition-all shadow-lg active:scale-95'
          >
            <PlusIcon size={18} className='text-amber-400 group-hover:rotate-90 transition-transform duration-300' />
            <span className='text-xs font-bold uppercase tracking-widest'>Create New</span>
          </button>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-8">
          {/* Create New Card */}
          <div
            onClick={() => { setTitle(''); setShowNameModal(true) }}
            className='group aspect-[1/1.4142] border border-dashed border-slate-300 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-4 cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-300'
          >
            <div className='size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:text-amber-500 transition-all'>
              <PlusIcon size={20} />
            </div>
            <span className='text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-amber-600'>New Resume</span>
          </div>

          {allResumes.map((resume, idx) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              idx={idx}
              navigate={navigate}
              setResumeToDelete={setResumeToDelete}
            />
          ))}
        </div>

        {/* --- MODALS --- */}
        {showNameModal && (
          <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200'>
            <div className='bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-10 w-full max-w-lg relative shadow-2xl animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300'>
              <button onClick={() => setShowNameModal(false)} className='absolute top-6 right-6 text-slate-400'><X size={20} /></button>
              <div className='text-center mb-6 sm:mb-8'>
                <div className='size-12 sm:size-14 bg-amber-100 text-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4'><FileText size={24} /></div>
                <h2 className='text-xl sm:text-2xl font-bold text-slate-900'>Name your Project</h2>
              </div>
              <form onSubmit={proceedToTemplateSelection} className='space-y-4 sm:space-y-6'>
                <input autoFocus className='w-full py-3 sm:py-4 px-4 text-base sm:text-lg text-center bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-500 transition-all' placeholder="e.g. Senior Developer" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit" className='w-full py-3.5 sm:py-4 bg-slate-900 text-white rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2'>Continue <ChevronRight size={14} /></button>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {resumeToDelete && (
          <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] flex items-center justify-center p-6 animate-in fade-in duration-200'>
            <div className='bg-white p-6 sm:p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl'>
              <div className='size-14 sm:size-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6'><Trash2 size={24} /></div>
              <h2 className='font-bold text-lg sm:text-xl text-slate-900'>Delete Resume?</h2>
              <div className='grid grid-cols-2 gap-3 mt-6 sm:mt-8'>
                <button onClick={() => setResumeToDelete(null)} className='py-3 text-slate-600 bg-slate-50 rounded-xl text-[10px] font-bold uppercase'>Cancel</button>
                <button onClick={confirmDelete} className='py-3 bg-red-500 text-white rounded-xl text-[10px] font-bold uppercase shadow-md'>Delete</button>
              </div>
            </div>
          </div>
        )}

        <TemplateGalleryModal
          isOpen={showGalleryModal}
          onClose={() => setShowGalleryModal(false)}
          onSelect={handleFinalCreate}
          accentColor="#D97706"
        />

      </div>
    </div>
  )
}

export default Dashboard