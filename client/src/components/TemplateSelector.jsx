import { Check, Layout } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const templates = [
        { id: "classic", name: "Classic", preview: "A traditional resume format with professional typography" },
        { id: "modern", name: "Modern", preview: "Sleek design with strategic use of color" },
        { id: "minimal-image", name: "Minimal Image", preview: "Minimal design with a single image" },
        { id: "minimal", name: "Minimal", preview: "Ultra-clean design that puts content front and center" },
        { id: "executive", name: "Executive sidebar", preview: "Premium two-column layout for senior roles" },
        { id: "creative", name: "Creative Grid", preview: "Bold, modern grid layout for technical professionals" },
        { id: "bold-minimal", name: "Bold Minimal", preview: "High-contrast typography for a powerful professional impression." },
        { id: "technical", name: "Technical Progress", preview: "Focuses on skill mastery and clear professional timelines." }
    ]

    return (
        <div className='relative'>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'
            >
                <Layout size={14} /> <span className='max-sm:hidden'>Template</span>
            </button>

            {isOpen && (
                <>
                    {/* Background overlay to close dropdown when clicking outside */}
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>

                    {/* Dropdown Menu */}
                    <div className='absolute top-full left-0 w-64 p-3 mt-2 space-y-3 z-20 bg-white rounded-xl border border-gray-200 shadow-xl max-h-[400px] overflow-y-auto scrollbar-hide'>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Select Layout</p>
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                onClick={() => { onChange(template.id); setIsOpen(false) }}
                                className={`relative p-3 border rounded-lg cursor-pointer transition-all ${selectedTemplate === template.id ?
                                    "border-blue-400 bg-blue-50" : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                {selectedTemplate === template.id && (
                                    <div className="absolute top-2 right-2">
                                        <div className='size-4 bg-blue-500 rounded-full flex items-center justify-center'>
                                            <Check className="w-2.5 h-2.5 text-white" />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <h4 className={`text-sm font-bold ${selectedTemplate === template.id ? 'text-blue-700' : 'text-gray-700'}`}>
                                        {template.name}
                                    </h4>
                                    <p className='text-[10px] text-gray-400 leading-tight'>{template.preview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default TemplateSelector