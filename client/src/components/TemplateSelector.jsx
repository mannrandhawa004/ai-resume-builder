import { Check, Layout, ChevronDown } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { TEMPLATE_LIST } from '../configs/templates'; // Import shared list

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = TEMPLATE_LIST.find(t => t.id === selectedTemplate)?.name || "Select";

    return (
        <div className='relative' ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-all border ${
                    isOpen 
                    ? 'bg-blue-50 border-blue-200 text-blue-700' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
            >
                <Layout size={14} className={isOpen ? "text-blue-500" : "text-slate-400"} />
                <span className='hidden sm:inline'>{selectedLabel}</span>
                <span className='sm:hidden'>Layout</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop for Mobile (Darkens background) */}
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 sm:hidden" onClick={() => setIsOpen(false)} />

                    {/* Dropdown / Bottom Sheet Container */}
                    <div className={`
                        z-50 bg-white shadow-xl border border-slate-200 overflow-hidden flex flex-col
                        
                        /* Desktop Styles (Dropdown) */
                        sm:absolute sm:top-full sm:right-0 sm:mt-2 sm:w-72 sm:rounded-xl sm:max-h-[400px]
                        
                        /* Mobile Styles (Bottom Sheet) */
                        max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:w-full max-sm:rounded-t-2xl max-sm:max-h-[60vh] max-sm:border-t
                        
                        animate-in fade-in slide-in-from-top-2 sm:slide-in-from-top-2 slide-in-from-bottom-10
                    `}>
                        
                        {/* Mobile Handle Bar */}
                        <div className="sm:hidden flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 bg-slate-200 rounded-full" />
                        </div>

                        <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Layout</p>
                        </div>

                        <div className="overflow-y-auto p-2 space-y-1 sm:space-y-2">
                            {TEMPLATE_LIST.map((template) => (
                                <div
                                    key={template.id}
                                    onClick={() => { onChange(template.id); setIsOpen(false) }}
                                    className={`relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                                        selectedTemplate === template.id 
                                        ? "bg-blue-50 ring-1 ring-blue-200" 
                                        : "hover:bg-slate-50"
                                    }`}
                                >
                                    {/* Small visual indicator of layout style could go here */}
                                    <div className={`size-8 rounded border flex items-center justify-center shrink-0 ${
                                        selectedTemplate === template.id ? "bg-white border-blue-200" : "bg-slate-50 border-slate-200"
                                    }`}>
                                        <Layout size={14} className={selectedTemplate === template.id ? "text-blue-500" : "text-slate-300"} />
                                    </div>

                                    <div className="flex-1">
                                        <h4 className={`text-xs font-bold ${selectedTemplate === template.id ? 'text-blue-700' : 'text-slate-700'}`}>
                                            {template.name}
                                        </h4>
                                        <p className='text-[10px] text-slate-400 leading-tight line-clamp-1'>{template.desc}</p>
                                    </div>

                                    {selectedTemplate === template.id && (
                                        <Check className="w-4 h-4 text-blue-500" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default TemplateSelector