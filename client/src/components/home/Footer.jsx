import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-gradient-to-r from-white via-amber-200/60 to-white mt-20 lg:mt-40 pt-16 pb-8 px-6 md:px-12 lg:px-20 xl:px-32 text-[13px] text-gray-500 font-poppins overflow-hidden border-t border-amber-100/50">
        
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20">
          
          {/* Left Section: Logo & Navigation Links */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 xl:gap-24 w-full lg:w-auto">
            
            {/* Logo */}
            <div className="shrink-0">
              <a href="#">
                <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
              </a>
            </div>

            {/* Links Grid - 2 Cols on Mobile, Flex on Desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-12 md:gap-x-16">
              
              {/* Product Column */}
              <div>
                <p className="text-slate-800 font-semibold mb-3">Product</p>
                <ul className="space-y-2.5">
                  <li><a href="/" className="hover:text-amber-600 transition-colors duration-200">Home</a></li>
                  <li><a href="/" className="hover:text-amber-600 transition-colors duration-200">Support</a></li>
                  <li><a href="/" className="hover:text-amber-600 transition-colors duration-200">Pricing</a></li>
                  <li><a href="/" className="hover:text-amber-600 transition-colors duration-200">Affiliate</a></li>
                </ul>
              </div>

              {/* Resources Column */}
              <div>
                <p className="text-slate-800 font-semibold mb-3">Resources</p>
                <ul className="space-y-2.5">
                  <li><a href="/" className="hover:text-amber-600 transition-colors duration-200">Company</a></li>
                  <li><a href="/" className="hover:text-amber-600 transition-colors duration-200">Blogs</a></li>
                  <li><a href="/" className="hover:text-amber-600 transition-colors duration-200">Community</a></li>
                  <li><a href="/" className="hover:text-amber-600 transition-colors duration-200">Careers</a></li>
                  <li><a href="/" className="hover:text-amber-600 transition-colors duration-200">About</a></li>
                </ul>
              </div>

              {/* Legal Column */}
              <div>
                <p className="text-slate-800 font-semibold mb-3">Legal</p>
                <ul className="space-y-2.5">
                  <li><a href="/" className="hover:text-amber-600 transition-colors duration-200">Privacy</a></li>
                  <li><a href="/" className="hover:text-amber-600 transition-colors duration-200">Terms</a></li>
                </ul>
              </div>

            </div>
          </div>

          {/* Right Section: Tagline & Socials */}
          <div className="flex flex-col lg:items-end gap-4 lg:text-right mt-6 lg:mt-0 border-t lg:border-none border-gray-200 pt-8 lg:pt-0">
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Making every customer feel valued—no matter the size of your audience.
            </p>
            
            <div className="flex items-center gap-4 mt-2">
              <a href="https://dribbble.com/" target="_blank" rel="noreferrer" className="group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-gray-400 group-hover:text-[#EA4C89] transition-colors">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                  <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                  <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-gray-400 group-hover:text-[#0A66C2] transition-colors">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://x.com/" target="_blank" rel="noreferrer" className="group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-gray-400 group-hover:text-black transition-colors">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-gray-400 group-hover:text-[#FF0000] transition-colors">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
              </a>
            </div>
            
            <p className="mt-4 text-xs text-slate-400">© 2025 Resume Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Recommended: Move this to your index.css file instead of keeping it here */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </>
  )
}

export default Footer