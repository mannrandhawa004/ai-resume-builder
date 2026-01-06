import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ExecutiveSidebarTemplate from './templates/ExecutiveSidebarTemplate'
import CreativeGridTemplate from './templates/CreativeGridTemplate'
import BoldMinimalTemplate from './templates/BoldMinimalTemplate'
import TechnicalTemplate from './templates/TechnicalTemplate'

const ResumePreview = ({ data, template, accentColor, fontSize = "14px", classes = "" }) => {

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
      <div
        id="resume-preview"
        className={`bg-white shadow-2xl overflow-hidden ${classes}`}
        style={{
          width: '210mm',
          minHeight: '297mm', // Changed from height to minHeight
          height: 'auto',      // Allows container to grow with content
          position: 'relative',
          backgroundColor: 'white',
          fontSize: fontSize,
        }}
      >
        {/* We wrap the template in a div that applies the font size to all standard elements */}
        <div style={{ fontSize: 'inherit' }} className="h-full w-full">
          {renderTemplate()}
        </div>
      </div>

      <style>{`
        @media print {
          body { visibility: hidden; }
          #resume-preview { visibility: visible; position: absolute; left: 0; top: 0; }
        }
        
        #resume-preview {
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          line-height: 1.5;
        }

        /* This ensures that templates using 'em' or 'inherit' will scale with the base font size */
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