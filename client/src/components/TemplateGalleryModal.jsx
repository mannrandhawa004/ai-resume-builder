import React, { useMemo, Suspense } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import ResumePreview from './ResumePreview';
import { dummyResumeData } from '../assets/assets'; 
import { TEMPLATE_LIST } from '../configs/templates'; // Import the shared list

// Memoized Card to prevent re-renders when other cards are clicked
const TemplateCard = React.memo(({ temp, isSelected, onSelect, accentColor, showcaseData }) => {
    return (
        <div
            onClick={() => onSelect(temp.id)}
            // OPTIMIZATION: 'content-visibility-auto' improves rendering speed for long lists
            className={`group relative flex flex-col bg-white rounded-2xl border-2 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 content-visibility-auto ${
                isSelected ? 'border-amber-500 ring-4 ring-amber-500/10' : 'border-slate-200'
            }`}
        >
            <div className="relative aspect-[1/1.4] overflow-hidden bg-slate-100 rounded-t-xl border-b border-gray-100">
                {/* Scaled Preview */}
                <div className="absolute inset-0 origin-top-left scale-[0.22] w-[454%] h-[454%] pointer-events-none select-none">
                    <Suspense fallback={<div className="w-full h-full bg-slate-200 animate-pulse" />}>
                        <ResumePreview
                            data={showcaseData}
                            template={temp.id}
                            accentColor={accentColor}
                            classes="shadow-none border-none"
                        />
                    </Suspense>
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]`}>
                    <span className="bg-white text-slate-900 px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        Select
                    </span>
                </div>

                {/* Active Badge */}
                {isSelected && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full shadow-lg text-[10px] font-bold uppercase tracking-widest z-10">
                        Active
                    </div>
                )}
            </div>

            <div className="p-4 bg-white rounded-b-xl">
                <h3 className="font-bold text-slate-800 text-sm">{temp.name}</h3>
                <p className="text-[10px] text-slate-400 mt-1 font-medium leading-tight">{temp.desc}</p>
            </div>
        </div>
    );
});

const TemplateGalleryModal = ({ isOpen, onClose, accentColor, onSelect, currentTemplate }) => {
    if (!isOpen) return null;

    // Stable reference to data
    const showcaseData = useMemo(() => dummyResumeData[0], []);

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-6 animate-in fade-in duration-200">
            <div className="bg-slate-50 w-full max-w-7xl h-[90vh] sm:h-full sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">

                {/* Header */}
                <div className="p-5 sm:p-6 border-b bg-white flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                            <Sparkles className="text-amber-500" size={20} />
                            <span>Select Template</span>
                        </h2>
                        <p className="text-xs text-slate-500 mt-1 hidden sm:block">Choose a layout that best fits your career level.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={24} className="text-slate-400 hover:text-slate-800" />
                    </button>
                </div>

                {/* Grid Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50/50">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-20">
                        {TEMPLATE_LIST.map((temp) => (
                            <TemplateCard
                                key={temp.id}
                                temp={temp}
                                isSelected={currentTemplate === temp.id}
                                onSelect={(id) => { onSelect(id); onClose(); }}
                                accentColor={accentColor}
                                showcaseData={showcaseData}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateGalleryModal;