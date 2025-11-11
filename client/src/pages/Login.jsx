import { Lock, Mail, User2Icon, Eye, EyeOff } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
  const dispatch = useDispatch()
  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
//   console.log('URL State:', urlState)
  const [state, setState] = React.useState(urlState || 'login')
  const [showPassword, setShowPassword] = React.useState(false)

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post(`/api/users/${state}`, formData)
      dispatch(login(data))
      localStorage.setItem('token', data.token)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google'
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          {/* Header */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
            {state === 'login' ? 'Welcome Back' : 'Join Us'}
          </h1>
          <p className="text-xs text-center text-gray-500 mb-5">
            {state === 'login' ? 'Sign in to continue' : 'Create your account'}
          </p>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition mb-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.501 12.453c0-.776-.07-1.553-.21-2.317H12v4.39h5.934a5.074 5.074 0 0 1-2.198 3.333v2.776h3.558c2.083-1.92 3.283-4.74 3.283-8.182z" fill="#4285F4"/>
              <path d="M12 23c2.974 0 5.47-1.008 7.297-2.73l-3.558-2.776c-.99.663-2.257 1.056-3.739 1.056-2.874 0-5.306-1.94-6.178-4.548H1.15v2.862C2.96 20.64 6.56 23 12 23z" fill="#34A853"/>
              <path d="M5.822 13.992c-.223-.663-.35-1.37-.35-2.1 0-.73.127-1.437.35-2.1V7.03H1.15A11.96 11.96 0 0 0 0 12c0 1.85.42 3.597 1.15 5.03l4.672-2.038z" fill="#FBBC05"/>
              <path d="M12 6.5c1.618 0 3.066.556 4.207 1.65l3.158-3.158C17.47 2.59 14.974 1.5 12 1.5c-5.44 0-9.04 3.36-10.85 7.97l4.672 3.762C6.694 10.44 9.126 6.5 12 6.5z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center mb-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-xs text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {state === 'register' && (
              <div className="relative">
                <User2Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            )}

            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Password with Eye Toggle */}
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {state === 'login' && (
              <div className="text-right">
                <button type="button" className="text-xs text-indigo-600 hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
            >
              {state === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center mt-4 text-xs text-gray-600">
            {state === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setState(state === 'login' ? 'register' : 'login')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              {state === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login