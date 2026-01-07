import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import ResumePreview from './ResumePreview';
import { dummyResumeData } from '../assets/assets'; // Adjust path as needed

const TEMPLATE_LIST = [
    { id: "classic", name: "The Classic", desc: "Traditional and professional" },
    { id: "modern", name: "Modern Edge", desc: "Clean with strategic color" },
    { id: "minimal", name: "Minimal", desc: "Focus on white space" },
    { id: "minimal-image", name: "Minimal-image", desc: "Minimal with profile photo" },
    { id: "executive", name: "Executive Sidebar", desc: "High-end corporate layout" },
    { id: "creative", name: "Creative Grid", desc: "Bold magazine-style grid" },
    { id: "bold-minimal", name: "Bold Minimal", desc: "High-contrast authority" },
    { id: "technical", name: "Technical Pro", desc: "Skill and project focus" },
    { id: "vienna", name: "Vienna", desc: "modern corporate layout" },
    { id: "new-york", name: "New York", desc: "Sophisticated editorial layout with vertical timeline" },
    { id: "london", name: "London", desc: "Classic serif design with full-width section headers." },
    { id: "specialist", name: "specialist", desc: "Clean with strategic layout" },
    { id: "right-sidebar", name: "right-sidebar", desc: "High-end corporate layout" }
];

const TemplateGalleryModal = ({ isOpen, onClose, accentColor, onSelect, currentTemplate }) => {
    if (!isOpen) return null;

    // Use the first dummy resume (Alex Smith) to showcase the templates
    const showcaseData = dummyResumeData[0];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-10">
            <div className="bg-slate-50 w-full max-w-7xl h-full rounded-3xl shadow-2xl flex flex-col overflow-hidden">

                <div className="p-6 border-b bg-white flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Sparkles className="text-amber-500" size={24} />
                            Choose a Professional Layout
                        </h2>
                        <p className="text-sm text-slate-500">Previewing with sample data to show full potential.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={24} className="text-slate-400" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {TEMPLATE_LIST.map((temp) => (
                            <div
                                key={temp.id}
                                onClick={() => { onSelect(temp.id); onClose(); }}
                                className={`group relative flex flex-col bg-white rounded-2xl border-2 transition-all cursor-pointer hover:shadow-xl ${currentTemplate === temp.id ? 'border-amber-500' : 'border-gray-200'
                                    }`}
                            >
                                <div className="relative aspect-[1/1.4] overflow-hidden bg-slate-100 rounded-t-2xl border-b border-gray-100">
                                    {/* Scaled Preview using Showcase Data */}
                                    <div className="absolute inset-0 origin-top-left p-4 scale-[0.22] w-[454%] h-[454%] pointer-events-none">
                                        <ResumePreview
                                            data={showcaseData}
                                            template={temp.id}
                                            accentColor={accentColor}
                                            classes="shadow-none border-none"
                                        />
                                    </div>

                                    <div className={`absolute inset-0 flex items-center justify-center bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                        <span className="bg-white text-slate-900 px-5 py-2 rounded-full font-bold text-sm shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                            Apply Layout
                                        </span>
                                    </div>

                                    {currentTemplate === temp.id && (
                                        <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full shadow-lg text-[10px] font-bold uppercase tracking-widest">
                                            Current
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 bg-white rounded-b-2xl">
                                    <h3 className="font-bold text-slate-800">{temp.name}</h3>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">{temp.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateGalleryModal;