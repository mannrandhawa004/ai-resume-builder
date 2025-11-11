import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Dashboard = () => {
  const colors = ['#4f46e5', '#7c3aed', '#dc2626', '#0891b2', '#16a34a', '#d97706'];


  //  states 
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState("")
  const [resume, setResume] = useState(null)
  const [editResume, setEditResume] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const createResume = () => {
    try {
      e.preventDefault()
      setShowCreateResume(false)
      navigate(`builder/:resumeId`)
    } catch (error) {
      toast.error(error?.response?.data?.messsage || error.message)

    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-2">
            Welcome back,{' '}
            <span className="text-indigo-600">
              Joe Doe
            </span>
          </h1>
          <p className="text-lg text-slate-600">Craft your perfect resume with elegance and precision.</p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          {/* Create New Resume */}
          <button onClick={() => setShowCreateResume(true)} className="group cursor-pointer">
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-10 flex flex-col items-center justify-center gap-5 transition-all duration-300 group-hover:border-indigo-500 group-hover:shadow-2xl group-hover:-translate-y-2">
              <div className="p-5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <PlusIcon className="w-10 h-10" />
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  Create New Resume
                </p>
                <p className="text-sm text-slate-500 mt-1">Start with a blank canvas</p>
              </div>
            </div>
          </button>

          {/* Upload Existing */}
          <button onClick={() => setShowUploadResume(true)} className="group cursor-pointer">
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-10 flex flex-col items-center justify-center gap-5 transition-all duration-300 group-hover:border-purple-500 group-hover:shadow-2xl group-hover:-translate-y-2">
              <div className="p-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                <UploadCloudIcon className="w-10 h-10" />
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                  Upload Existing
                </p>
                <p className="text-sm text-slate-500 mt-1">Import your PDF resume</p>
              </div>
            </div>
          </button>
        </div>

        <hr className="border-t border-slate-200 my-12" />
        {/* loop for all resumes */}

        {
          showCreateResume && (
            <form onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
              <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
                <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-indigo-600 ring-indigo-600' required />

                <button className='w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors'>Create Resume</button>
                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setShowCreateResume(false); setTitle('') }} />
              </div>
            </form>)
        }

        {showUploadResume && (
          <form onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-indigo-600 ring-indigo-600' required />
              <div>
                <label htmlFor="resume-input" className="block text-sm text-slate-700">
                  Select resume file
                  <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-indigo-500 hover:text-indigo-700 cursor-pointer transition-colors'>
                    {resume ? (
                      <p className='text-indigo-700'>{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className='size-14 stroke-1' />
                        <p>Upload resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])} />
              </div>
              <button disabled={loading} className='w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2'>
                {loading && <LoaderCircleIcon className='animate-spin size-4 text-white' />}
                {loading ? 'Uploading...' : 'Upload Resume'}

              </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setShowUploadResume(false); setTitle('') }} />
            </div>
          </form>
        )
        }
      </div>

    </div>
  );
};

export default Dashboard;