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

  const SelectedTemplate = useMemo(() => getTemplateComponent(template), [template]);

  return (
    <div >

      {/* This div handles the on-screen scaling. 
        In print mode, we disable scaling (transform: none) and margins 
      */}
      <div
        className="transform scale-[0.45] xs:scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-[1] origin-top transition-transform duration-300 print:transform-none print:scale-100 print:m-0 print:w-full print:h-full"
      >
        <div
          id="resume-preview"
          className={`bg-white shadow-2xl print:shadow-none ${classes}`}
          style={{
            width: '210mm',        // Strict A4 Width
            minHeight: '297mm',    // Strict A4 Height
            height: 'auto',        // Allow growth if content overflows
            position: 'relative',
            fontSize: fontSize,
            overflow: 'hidden'     // Ensure content doesn't bleed out and create a 2nd page
          }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <SelectedTemplate data={data} accentColor={accentColor} />
          </Suspense>
        </div>
      </div>

      <style>{`
        @media print {
          /* 1. Reset Page Margins to 0 */
          @page {
            size: A4;
            margin: 0mm !important;
          }

          /* 2. Hide everything in the body */
          body {
            visibility: hidden;
            margin: 0;
            padding: 0;
            overflow: hidden; /* Prevent scrolling during print */
            -webkit-print-color-adjust: exact; /* Ensure colors/backgrounds print exactly */
            print-color-adjust: exact;
          }

          /* 3. Make the resume visible and position it absolutely at 0,0 */
          #resume-preview {
            visibility: visible;
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            z-index: 9999;
          }
          
          /* 4. Ensure inner text renders sharply */
          #resume-preview * {
            visibility: visible;
             -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
          }

          /* 5. Force background graphics (vital for sidebars) */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        
        /* Screen-only styles for text rendering */
        #resume-preview {
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          line-height: 1.5;
        }
      `}</style>
    </div>
  )
}

export default ResumePreview