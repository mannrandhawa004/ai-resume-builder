import React, { Suspense, useMemo, lazy } from 'react'

// A simple spinner for when the specific template is loading
const LoadingSpinner = () => (
  <div className="w-full h-[297mm] flex items-center justify-center bg-white shadow-lg text-slate-400">
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xs font-medium uppercase tracking-widest">Loading Template...</p>
    </div>
  </div>
);

// Helper to lazy load templates based on name
// Note: We map specific file paths to ensure Webpack/Vite can bundle them correctly
const getTemplateComponent = (templateName) => {
  switch (templateName) {
    case "modern": return lazy(() => import('./templates/ModernTemplate'));
    case "minimal": return lazy(() => import('./templates/MinimalTemplate'));
    case "minimal-image": return lazy(() => import('./templates/MinimalImageTemplate'));
    case "executive": return lazy(() => import('./templates/ExecutiveTemplate'));
    case "creative": return lazy(() => import('./templates/CreativeTemplate'));
    case "bold-minimal": return lazy(() => import('./templates/BoldMinimalTemplate'));
    case "technical": return lazy(() => import('./templates/TechnicalTemplate'));
    case "vienna": return lazy(() => import('./templates/ViennaTemplate'));
    case 'new-york': return lazy(() => import('./templates/NewYorkTemplate'));
    case 'london': return lazy(() => import('./templates/LondonTemplate'));
    case "specialist": return lazy(() => import('./templates/SpecialistTemplate'));
    case "right-sidebar": return lazy(() => import('./templates/RightSidebarTemplate'));
    default: return lazy(() => import('./templates/ClassicTemplate'));
  }
};

const ResumePreview = ({ data, template, accentColor, fontSize = "14px", classes = "" }) => {

  // 1. Optimization: Memoize the loaded component so it doesn't re-import on every keystroke
  const SelectedTemplate = useMemo(() => getTemplateComponent(template), [template]);

  return (
    <div className='w-full bg-slate-100/50 flex justify-center py-8 sm:py-16 print:p-0 overflow-hidden'>
      
      {/* 2. RESPONSIVENESS STRATEGY: 
         We wrap the A4 container in a scaling div. 
         - On mobile (default): Scale 0.45 (fits ~380px screens)
         - On Tablet (sm): Scale 0.6
         - On Laptop (md/lg): Scale 0.8 to 1.0
         - transform-origin-top: Ensures it scales from the top center
      */}
      <div 
        className="transform scale-[0.45] xs:scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-[1] origin-top transition-transform duration-300 print:transform-none print:scale-100"
      >
        <div
          id="resume-preview"
          className={`bg-white shadow-2xl print:shadow-none ${classes}`}
          style={{
            width: '210mm',        // Fixed A4 Width
            minHeight: '297mm',    // Fixed A4 Height logic
            height: 'auto',
            position: 'relative',
            fontSize: fontSize,
          }}
        >
          <Suspense fallback={<LoadingSpinner />}>
             {/* Pass props to the lazy loaded component */}
             <SelectedTemplate data={data} accentColor={accentColor} />
          </Suspense>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body { 
            visibility: hidden; 
            background: white;
          }
          /* Hide everything else */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Show only the resume */
          #resume-preview { 
            visibility: visible; 
            position: fixed; 
            left: 0; 
            top: 0; 
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            box-shadow: none;
            z-index: 9999;
          }
          /* Reset transforms for print so it's actual size */
          .transform {
             transform: none !important;
          }
        }
        
        #resume-preview {
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          line-height: 1.5;
        }

        #resume-preview p, 
        #resume-preview li, 
        #resume-preview span {
           font-size: 1em; 
        }
      `}</style>
    </div>
  )
}

export default ResumePreview