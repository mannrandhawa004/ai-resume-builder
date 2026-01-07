import React from 'react';
import { MapPin, Phone, Mail, Link as LinkIcon, Globe, Linkedin } from 'lucide-react';

const LondonTemplate = ({ data }) => {
    
    // Helper for date formatting
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        const date = new Date(year, month - 1);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    // A reusable, simple section header with thin lines
    const SectionHeader = ({ title }) => (
        <div className="flex items-center gap-4 mb-6 mt-8">
            <div className="h-px bg-slate-300 flex-grow"></div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-800 whitespace-nowrap">
                {title}
            </h2>
            <div className="h-px bg-slate-300 flex-grow"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white min-h-[1056px] p-12 font-serif text-slate-800 shadow-2xl">
            
            {/* --- HEADER --- */}
            <header className="flex flex-col items-center text-center mb-10">
                
                
                <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-wide uppercase">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                
                {data.personal_info?.profession && (
                    <p className="text-lg italic text-slate-600 mb-4 font-medium">
                        {data.personal_info.profession}
                    </p>
                )}

                {/* Contact Info - Centered Row with Icons */}
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm font-sans text-slate-600">
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={14} className="text-slate-400" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={14} className="text-slate-400" />
                            <a href={`mailto:${data.personal_info.email}`} className="hover:text-slate-900 transition-colors">
                                {data.personal_info.email}
                            </a>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-slate-400" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin} className="flex items-center gap-1.5 hover:text-blue-700 transition-colors">
                            <Linkedin size={14} className="text-slate-400" /> LinkedIn
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website} className="flex items-center gap-1.5 hover:text-blue-700 transition-colors">
                            <Globe size={14} className="text-slate-400" /> Portfolio
                        </a>
                    )}
                </div>
            </header>

            {/* --- PROFILE --- */}
            {data.professional_summary && (
                <section>
                    <SectionHeader title="Profile" />
                    <p className="text-sm leading-relaxed text-justify text-slate-700 font-sans">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* --- EMPLOYMENT HISTORY --- */}
            {data.experience && data.experience.length > 0 && (
                <section>
                    <SectionHeader title="Employment History" />
                    <div className="space-y-8">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                {/* Header Row: Position & Date */}
                                <div className="flex justify-between items-baseline mb-1 font-sans">
                                    <h3 className="font-bold text-slate-900 text-base">
                                        {exp.position}
                                    </h3>
                                    <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>

                                {/* Sub-header: Company */}
                                <div className="text-sm italic text-slate-700 mb-3 font-serif">
                                    {exp.company}
                                </div>
                                
                                {/* Description List */}
                                {exp.description && (
                                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 font-sans marker:text-slate-400">
                                        {exp.description.split('\n').map((line, i) => (
                                            line.trim() && <li key={i} className="pl-1">{line.replace(/^[•-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* --- PROJECTS (Adapted from New York logic) --- */}
            {data.project && data.project.length > 0 && (
                 <section>
                    <SectionHeader title="Projects" />
                    <div className="space-y-6">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1 font-sans">
                                    <h3 className="font-bold text-slate-900 text-base">
                                        {proj.name}
                                    </h3>
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                            <LinkIcon size={12} /> View
                                        </a>
                                    )}
                                </div>
                                <p className="text-sm text-slate-700 font-sans leading-relaxed">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* --- EDUCATION --- */}
            {data.education && data.education.length > 0 && (
                <section>
                    <SectionHeader title="Education" />
                    <div className="space-y-6">
                        {data.education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1 font-sans">
                                    <h3 className="font-bold text-slate-900 text-base">
                                        {edu.institution}
                                    </h3>
                                    <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
                                        {formatDate(edu.graduation_date)}
                                    </span>
                                </div>
                                <div className="text-sm italic text-slate-700 font-serif">
                                    {edu.degree} {edu.field ? `, ${edu.field}` : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* --- SKILLS --- */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <SectionHeader title="Skills" />
                    <div className="flex flex-wrap gap-x-8 gap-y-3 font-sans text-sm text-slate-700 justify-center">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="size-1.5 bg-slate-300 rounded-full"></span>
                                <span>{skill}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* --- CUSTOM SECTION (Languages, etc) --- */}
            {data.custom_section?.items?.length > 0 && (
                <section>
                    <SectionHeader title={data.custom_section.title || "Additional Info"} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-center">
                         {data.custom_section.items.map((item, index) => (
                            <div key={index}>
                                <span className="font-bold text-sm text-slate-900 block">{item.name}</span>
                                <span className="text-xs text-slate-500">{item.description}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

        

        </div>
    );
};

export default LondonTemplate;