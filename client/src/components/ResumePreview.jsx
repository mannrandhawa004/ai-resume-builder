import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ExecutiveSidebarTemplate from './templates/ExecutiveSidebarTemplate'
import CreativeGridTemplate from './templates/CreativeGridTemplate'
import BoldMinimalTemplate from './templates/BoldMinimalTemplate'
import TechnicalTemplate from './templates/TechnicalTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {

  const renderTemplate = () => {
    const props = { data, accentColor };
    switch (template) {
      case "modern": return <ModernTemplate {...props} />;
      case "minimal": return <MinimalTemplate {...props} />;
      case "minimal-image": return <MinimalImageTemplate {...props} />;
      case "executive": return <ExecutiveSidebarTemplate {...props} />;
      case "creative": return <CreativeGridTemplate {...props} />;
      case "bold-minimal": return <BoldMinimalTemplate {...props} />;
      case "technical": return <TechnicalTemplate {...props} />;
      default: return <ClassicTemplate {...props} />;
    }
  }

  return (
    <div className='w-full bg-slate-100 flex justify-center py-10 print:hidden overflow-hidden'>
      {/* IMPORTANT: We remove "print:hidden" from the inner div 
          but we use a specific ID for html2canvas to target 
      */}
      <div
        id="resume-preview"
        className={`bg-white shadow-2xl overflow-hidden ${classes}`}
        style={{
          width: '210mm',
          height: '297mm', // Fixed height prevents blank pages
          position: 'relative',
          backgroundColor: 'white'
        }}
      >
        {renderTemplate()}
      </div>

      <style>{`
        /* This prevents the browser from trying to print the web page 
           when the user accidentally presses Cmd+P */
        @media print {
          body { visibility: hidden; }
          #resume-preview { visibility: visible; position: absolute; left: 0; top: 0; }
        }
        
        /* Ensure fonts and colors are captured correctly */
        #resume-preview {
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
      `}</style>
    </div>
  )
}

export default ResumePreview