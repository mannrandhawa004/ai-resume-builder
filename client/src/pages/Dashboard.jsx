import { 
  PlusIcon, Trash2, FileText, Sparkles, AlertCircle, 
  Layers, Clock, X, ChevronRight, FilePlus2
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import TemplateGalleryModal from '../components/TemplateGalleryModal'

const Dashboard = () => {
  const { token, user } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const [allResumes, setAllResumes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  // Modal States
  const [showNameModal, setShowNameModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [resumeToDelete, setResumeToDelete] = useState(null)

  // Form States
  const [title, setTitle] = useState('')

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error("Cloud library unreachable")
      console.error(error)
    }
  }

  // Phase 1: Validating Title
  const proceedToTemplateSelection = (e) => {
    e.preventDefault()
    if (!title.trim()) return toast.error("Please provide a project name")
    
    setShowNameModal(false)
    // Small timeout ensures smooth transition between modals
    setTimeout(() => setShowGalleryModal(true), 150)
  }

  // Phase 2: Final Creation
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
      toast.success("Document purged from library")
    } catch (error) {
      toast.error("Purge failed")
    }
  }

  useEffect(() => { loadAllResumes() }, [])

  return (
    <div className='min-h-screen bg-[#F9F9F8] pb-20 font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900'>
      <div className='max-w-[1700px] mx-auto px-6 sm:px-12 pt-20'>

        {/* --- HEADER SECTION --- */}
        <div className='mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10'>
          <div className='animate-in fade-in slide-in-from-left-4 duration-700'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-[0.2em] rounded-md'>
                Active Workspace
              </div>
              <div className='h-1 w-1 bg-slate-300 rounded-full' />
              <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                {user?.name || 'Authorized Member'}
              </span>
            </div>
            <h1 className='text-6xl sm:text-7xl font-extralight tracking-tighter text-slate-900'>
              The <span className='font-bold text-amber-600 italic'>Library.</span>
            </h1>
            <p className='text-slate-400 text-sm mt-5 max-w-md leading-relaxed'>
              Select a blueprint to begin editing or initialize a new professional identity.
            </p>
          </div>

          <button
            onClick={() => { setTitle(''); setShowNameModal(true) }}
            className='group flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-[2rem] hover:bg-black transition-all shadow-2xl shadow-slate-200 active:scale-95 animate-in fade-in zoom-in duration-700'
          >
            <PlusIcon size={20} className='group-hover:rotate-90 transition-transform duration-500' />
            <span className='text-[11px] font-black uppercase tracking-[0.2em]'>New Project</span>
          </button>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12">
          
          {/* Bento-style Empty Action Card */}
          <div 
            onClick={() => { setTitle(''); setShowNameModal(true) }}
            className='aspect-[3/4.2] border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-amber-400 hover:bg-amber-50/40 transition-all group'
          >
            <div className='size-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-all duration-500'>
              <FilePlus2 size={28} />
            </div>
            <div className='text-center'>
              <span className='block text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-amber-600'>Initialize</span>
              <span className='block text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1'>New Blueprint</span>
            </div>
          </div>

          {allResumes.map((resume, idx) => (
            <div 
              key={resume._id} 
              className='group relative flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700'
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className='relative aspect-[3/4.2] bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden cursor-pointer transition-all duration-1000 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] group-hover:-translate-y-4 group-hover:border-amber-200'
              >
                {/* Visual Content Placeholder */}
                <div className='absolute inset-0 p-10 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700'>
                  <div className='h-4 w-2/3 bg-slate-900 rounded-full mb-8' />
                  <div className='space-y-4'>
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className={`h-2 w-full bg-slate-900 rounded-full ${i % 4 === 0 ? 'w-3/4' : ''}`} />
                    ))}
                  </div>
                </div>

                {/* Glass Hover Pill */}
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                   <div className='bg-white/90 backdrop-blur-md px-8 py-3.5 rounded-full shadow-2xl flex items-center gap-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700'>
                      <Layers size={16} className='text-amber-600' />
                      <span className='text-[11px] font-black uppercase tracking-widest text-slate-900'>Open Blueprint</span>
                   </div>
                </div>
              </div>

              <div className='mt-8 px-4 flex justify-between items-start'>
                <div className='overflow-hidden'>
                  <h3 className='text-base font-bold text-slate-800 tracking-tight group-hover:text-amber-600 transition-colors truncate'>{resume.title}</h3>
                  <div className='flex items-center gap-3 mt-2'>
                    <div className='size-1.5 bg-amber-500 rounded-full' />
                    <span className='text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]'>{resume.template}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setResumeToDelete(resume._id) }} 
                  className='p-2.5 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all'
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- MODAL: NAME IDENTITY --- */}
        {showNameModal && (
          <div className='fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500'>
            <div className='bg-white rounded-[3.5rem] p-16 w-full max-w-2xl relative shadow-2xl border border-white/20 animate-in zoom-in-95 duration-500'>
              <button 
                onClick={() => setShowNameModal(false)}
                className='absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors'
              >
                <X size={24} />
              </button>

              <div className='text-center mb-14'>
                <div className='size-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-8'>
                  <FileText size={40} />
                </div>
                <h2 className='text-4xl font-light tracking-tight text-slate-900'>Project <span className='font-bold italic'>Identity.</span></h2>
                <p className='text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-4'>Establish a unique name for this blueprint</p>
              </div>

              <form onSubmit={proceedToTemplateSelection} className='space-y-12'>
                <div className='relative'>
                    <input
                    autoFocus
                    className='w-full py-6 text-4xl text-center border-b-2 border-slate-100 outline-none focus:border-amber-500 transition-all placeholder:text-slate-100 font-light'
                    placeholder="e.g. Creative Director 2026"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='flex flex-col sm:flex-row gap-6'>
                  <button 
                    type="button" 
                    onClick={() => setShowNameModal(false)} 
                    className='flex-1 py-5 text-slate-400 uppercase text-[11px] font-black tracking-widest hover:text-slate-900 transition-colors'
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className='flex-1 py-5 bg-slate-900 text-white rounded-[1.5rem] uppercase text-[11px] font-black tracking-widest shadow-2xl shadow-slate-200 hover:bg-black transition-all flex items-center justify-center gap-3'
                  >
                    Select Layout <ChevronRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL: DESTRUCTIVE ACTION --- */}
        {resumeToDelete && (
          <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[110] flex items-center justify-center p-6 animate-in fade-in duration-300'>
            <div className='bg-white p-14 rounded-[3.5rem] max-w-md w-full text-center shadow-2xl border border-slate-50 animate-in zoom-in-95 duration-500'>
              <div className='size-24 bg-red-50 text-red-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10'>
                <AlertCircle size={48} />
              </div>
              <h2 className='font-bold text-3xl tracking-tight text-slate-900'>Delete Permanently?</h2>
              <p className='text-slate-400 text-sm mt-5 leading-relaxed'>
                You are about to purge this blueprint from the Library. <span className='text-red-500 font-semibold'>This action is irreversible</span> and will erase all data.
              </p>
              <div className='flex flex-col gap-4 mt-12'>
                <button 
                  onClick={confirmDelete} 
                  className='w-full py-5 bg-red-500 text-white rounded-2xl uppercase text-[11px] font-black tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-100'
                >
                  Confirm Deletion
                </button>
                <button 
                  onClick={() => setResumeToDelete(null)} 
                  className='w-full py-5 text-slate-400 uppercase text-[11px] font-black tracking-widest hover:text-slate-900'
                >
                  Keep Document
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TEMPLATE GALLERY MODAL */}
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