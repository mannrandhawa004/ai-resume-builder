import {
  PlusIcon, Trash2, FileText, Layers, X, ChevronRight, FilePlus2,
  Search, MoreHorizontal, LayoutTemplate
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import TemplateGalleryModal from '../components/TemplateGalleryModal'

import ModernTemplate from '../components/templates/ModernTemplate'
import MinimalTemplate from '../components/templates/MinimalTemplate'
import MinimalImageTemplate from '../components/templates/MinimalImageTemplate'
import TechnicalTemplate from '../components/templates/TechnicalTemplate'
import ExecutiveSidebarTemplate from '../components/templates/ExecutiveSidebarTemplate'
import ClassicTemplate from '../components/templates/ClassicTemplate'
import BoldMinimalTemplate from '../components/templates/BoldMinimalTemplate'
import CreativeGridTemplate from '../components/templates/CreativeGridTemplate'
import ViennaTemplate from '../components/templates/ViennaTemplate';
import NewYorkTemplate from '../components/templates/NewYorkTemplate';
import LondonTemplate from '../components/templates/LondonTemplate';
import SpecialistTemplate from '../components/templates/SpecialistTemplate'
import RightSidebarTemaplate from '../components/templates/RightSidebarTemplate'

const Dashboard = () => {
  const { token, user } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const [allResumes, setAllResumes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [showNameModal, setShowNameModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [resumeToDelete, setResumeToDelete] = useState(null)

  // Form States
  const [title, setTitle] = useState('')


  const TEMPLATE_MAP = {
    'modern': ModernTemplate,
    'minimal': MinimalTemplate,
    'minimal-image': MinimalImageTemplate,
    'technical': TechnicalTemplate,
    'executive': ExecutiveSidebarTemplate,
    'classic': ClassicTemplate,
    'bold-minimal': BoldMinimalTemplate,
    'creative': CreativeGridTemplate,
    'vienna': ViennaTemplate,
    'new-york': NewYorkTemplate,
    'london':LondonTemplate,
    'specialist':SpecialistTemplate,
    'right-sidebar':RightSidebarTemaplate,
    'default': MinimalTemplate
  }

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error("Cloud library unreachable")
      console.error(error)
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
      toast.success("Document purged from library")
    } catch (error) {
      toast.error("Purge failed")
    }
  }

  useEffect(() => { loadAllResumes() }, [])

  return (
    <div className='min-h-screen bg-slate-50/50 pb-20 font-sans text-slate-900'>
      <div className='max-w-[1600px] mx-auto px-6 sm:px-10 pt-16'>

        {/* --- HEADER SECTION --- */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest'>
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              {user?.name || 'Workspace'}
            </div>
            <h1 className='text-4xl sm:text-5xl font-bold tracking-tight text-slate-900'>
              My <span className='text-slate-400 font-serif italic'>Resumes</span>
            </h1>
          </div>

          <button
            onClick={() => { setTitle(''); setShowNameModal(true) }}
            className='group flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95'
          >
            <PlusIcon size={18} className='text-amber-400 group-hover:rotate-90 transition-transform duration-300' />
            <span className='text-xs font-bold uppercase tracking-widest'>Create New</span>
          </button>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 sm:gap-8">

          {/* Create New Card */}
          <div
            onClick={() => { setTitle(''); setShowNameModal(true) }}
            className='group aspect-[1/1.41] border border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-300'
          >
            <div className='size-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:text-amber-500 transition-all'>
              <PlusIcon size={24} />
            </div>
            <span className='text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-amber-600'>New Resume</span>
          </div>

          {/* Resume Cards */}
          {allResumes.map((resume, idx) => {
            // 3. SELECT THE CORRECT COMPONENT
            const TemplateComponent = TEMPLATE_MAP[resume.template] || TEMPLATE_MAP['default'];
            // console.log(TemplateComponent)

            return (
              <div
                key={resume._id}
                className='group flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-500'
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Card Container */}
                <div
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className='relative aspect-[1/1.6] bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:border-amber-200 transition-all duration-300'
                >

                  {/* --- 4. REAL TEMPLATE PREVIEW --- */}
                  {/* We scale the A4 resume down to fit the card */}
                  <div className='absolute top-0 left-0 w-[210mm] origin-top-left transform scale-[0.2] sm:scale-[0.25] md:scale-[0.3] lg:scale-[0.22] xl:scale-[0.26] 2xl:scale-[0.3] pointer-events-none select-none bg-white'>
                    <TemplateComponent
                      data={resume}
                      accentColor={resume.accent_color}
                    />
                  </div>

                  {/* Hover Overlay with Open Button */}
                  <div className='absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center z-10'>
                    <button className='opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all bg-white text-slate-900 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-2'>
                      Open <ChevronRight size={12} />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setResumeToDelete(resume._id) }}
                    className='absolute top-3 right-3 p-2 bg-white/90 backdrop-blur text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm z-20'
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Info Footer */}
                <div className='px-1'>
                  <h3 className='text-sm font-bold text-slate-800 truncate leading-tight group-hover:text-amber-600 transition-colors'>{resume.title}</h3>
                  <div className='flex items-center gap-2 mt-1'>
                    <LayoutTemplate size={10} className="text-slate-400" />
                    <span className='text-[10px] font-medium text-slate-400 uppercase tracking-wider truncate'>{resume.template || "Minimal"}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* --- MODALS (Same as before) --- */}
        {showNameModal && (
          <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200'>
            <div className='bg-white rounded-3xl p-8 sm:p-10 w-full max-w-lg relative shadow-2xl animate-in zoom-in-95 duration-300'>
              <button onClick={() => setShowNameModal(false)} className='absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors'><X size={20} /></button>
              <div className='text-center mb-8'>
                <div className='size-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm'><FileText size={24} /></div>
                <h2 className='text-2xl font-bold text-slate-900'>Name your Project</h2>
                <p className='text-sm text-slate-500 mt-2'>Give your resume a unique name.</p>
              </div>
              <form onSubmit={proceedToTemplateSelection} className='space-y-6'>
                <input autoFocus className='w-full py-4 px-4 text-lg text-center bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white transition-all placeholder:text-slate-300 font-medium' placeholder="e.g. Senior Developer 2026" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit" className='w-full py-4 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2'>Choose Template <ChevronRight size={14} /></button>
              </form>
            </div>
          </div>
        )}

        {resumeToDelete && (
          <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200'>
            <div className='bg-white p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-300'>
              <div className='size-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6'><Trash2 size={28} /></div>
              <h2 className='font-bold text-xl text-slate-900'>Delete Resume?</h2>
              <p className='text-xs text-slate-500 mt-2 leading-relaxed px-4'>Action is irreversible.</p>
              <div className='grid grid-cols-2 gap-3 mt-8'>
                <button onClick={() => setResumeToDelete(null)} className='py-3 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold uppercase tracking-wide transition-colors'>Cancel</button>
                <button onClick={confirmDelete} className='py-3 bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-red-600 shadow-md hover:shadow-red-200 transition-all'>Delete</button>
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