import React from 'react';
import { MapPin, Phone, Mail, User, Briefcase, GraduationCap, Link as LinkIcon, Megaphone, Globe, Linkedin } from 'lucide-react';

const NewYorkTemplate = ({ data, accentColor }) => {
    // Default to a professional Slate-700 if no accent provided
    const themeColor = accentColor || "#374151";

    // Helper for date formatting
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        const date = new Date(year, month - 1);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white min-h-[1056px] flex font-sans text-slate-800 shadow-2xl relative">
            
            {/* --- LEFT SIDEBAR (30%) --- */}
            <aside className="w-[30%] bg-slate-50 pt-12 pb-10 px-6 flex flex-col gap-10 border-r border-slate-200">
                
                {/* Photo Area */}
                <div className="flex justify-center mb-2">
                    <div className="size-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                        {data.personal_info?.image ? (
                             <img 
                                src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                <User size={32} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Details (ATS Friendly List) */}
                <section aria-label="Contact Information">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-2 mb-4 text-center">
                        Contact
                    </h3>
                    <ul className="text-sm text-slate-600 space-y-3">
                        {data.personal_info?.phone && (
                            <li className="flex flex-col items-center text-center gap-1">
                                <span className="p-1.5 bg-white rounded-full shadow-sm text-slate-900">
                                    <Phone size={12} />
                                </span>
                                <span>{data.personal_info.phone}</span>
                            </li>
                        )}
                        {data.personal_info?.email && (
                            <li className="flex flex-col items-center text-center gap-1">
                                <span className="p-1.5 bg-white rounded-full shadow-sm text-slate-900">
                                    <Mail size={12} />
                                </span>
                                <a href={`mailto:${data.personal_info.email}`} className="hover:text-blue-600 break-all">
                                    {data.personal_info.email}
                                </a>
                            </li>
                        )}
                        {data.personal_info?.location && (
                            <li className="flex flex-col items-center text-center gap-1">
                                <span className="p-1.5 bg-white rounded-full shadow-sm text-slate-900">
                                    <MapPin size={12} />
                                </span>
                                <span>{data.personal_info.location}</span>
                            </li>
                        )}
                        {/* Social Links */}
                        {data.personal_info?.linkedin && (
                            <li className="flex flex-col items-center text-center gap-1 pt-2">
                                <a href={data.personal_info.linkedin} className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline">
                                    <Linkedin size={12} /> LinkedIn
                                </a>
                            </li>
                        )}
                         {data.personal_info?.website && (
                            <li className="flex flex-col items-center text-center gap-1">
                                <a href={data.personal_info.website} className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline">
                                    <Globe size={12} /> Portfolio
                                </a>
                            </li>
                        )}
                    </ul>
                </section>

                {/* Skills Section (Bulleted List for ATS) */}
                {data.skills && data.skills.length > 0 && (
                    <section aria-label="Skills">
                         <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-2 mb-4 text-center">
                            Skills
                        </h3>
                        {/* Semantic Unordered List */}
                        <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 marker:text-slate-400">
                            {data.skills.map((skill, index) => (
                                <li key={index} className="leading-snug">
                                    <span className="-ml-1">{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Languages / Custom */}
                {data.custom_section?.items?.length > 0 && (
                    <section aria-label="Languages">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-2 mb-4 text-center">
                            {data.custom_section.title || "Languages"}
                        </h3>
                        <ul className="space-y-3">
                            {data.custom_section.items.map((item, index) => (
                                <li key={index} className="flex flex-col items-center text-center">
                                    <span className="font-bold text-sm text-slate-800">{item.name}</span>
                                    <span className="text-xs text-slate-500">{item.description}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </aside>

            {/* --- RIGHT CONTENT (70%) --- */}
            <main className="w-[70%] pt-12 pb-10 pl-8 pr-12 relative">
                
                {/* Header Info */}
                <header className="mb-10 border-b-2 border-slate-100 pb-8">
                    <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900 mb-2">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-lg font-medium tracking-wide text-slate-500 uppercase" style={{ color: themeColor }}>
                        {data.personal_info?.profession || "Professional Title"}
                    </p>
                </header>

                {/* Vertical Timeline Line */}
                <div className="absolute left-[31px] top-[180px] bottom-10 w-px bg-slate-200"></div>

                <div className="space-y-10">

                    {/* Summary */}
                    {data.professional_summary && (
                        <section>
                            <div className="flex items-center gap-4 mb-3 relative">
                                <div className="z-10 bg-white p-1 rounded-full border border-slate-100 shadow-sm">
                                    <User size={18} style={{ color: themeColor }} />
                                </div>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">Professional Profile</h2>
                            </div>
                            <div className="pl-10">
                                <p className="text-sm leading-relaxed text-slate-600 text-justify">
                                    {data.professional_summary}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Employment History */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-6 relative">
                                <div className="z-10 bg-white p-1 rounded-full border border-slate-100 shadow-sm">
                                    <Briefcase size={18} style={{ color: themeColor }} />
                                </div>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">Employment History</h2>
                            </div>

                            <div className="pl-10 space-y-8">
                                {data.experience.map((exp, index) => (
                                    <article key={index} className="relative group">
                                        {/* Timeline Dot */}
                                        <div className="absolute -left-[45px] top-1.5 size-2.5 rounded-full bg-slate-300 ring-4 ring-white group-hover:bg-slate-500 transition-colors"></div>

                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                            <h3 className="font-bold text-slate-900 text-base">{exp.position}</h3>
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                                {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        
                                        <div className="text-sm font-medium text-slate-500 mb-2 italic">
                                            {exp.company}
                                        </div>

                                        {/* ATS Friendly Description List */}
                                        {exp.description && (
                                            <ul className="list-disc pl-4 space-y-1.5 text-sm text-slate-600 marker:text-slate-400">
                                                {exp.description.split('\n').map((line, i) => (
                                                    line.trim() && (
                                                        <li key={i} className="pl-1">
                                                            {line.replace(/^[•-]\s*/, '')}
                                                        </li>
                                                    )
                                                ))}
                                            </ul>
                                        )}
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                             <div className="flex items-center gap-4 mb-6 relative">
                                <div className="z-10 bg-white p-1 rounded-full border border-slate-100 shadow-sm">
                                    <Megaphone size={18} style={{ color: themeColor }} />
                                </div>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">Projects</h2>
                            </div>

                            <div className="pl-10 space-y-6">
                                {data.project.map((proj, index) => (
                                    <article key={index} className="relative group">
                                         <div className="absolute -left-[45px] top-1.5 size-2.5 rounded-full bg-slate-300 ring-4 ring-white group-hover:bg-slate-500 transition-colors"></div>
                                        
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-slate-900">{proj.name}</h3>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                                    <LinkIcon size={10} /> View Project
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {proj.description}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-6 relative">
                                <div className="z-10 bg-white p-1 rounded-full border border-slate-100 shadow-sm">
                                    <GraduationCap size={18} style={{ color: themeColor }} />
                                </div>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">Education</h2>
                            </div>

                            <div className="pl-10 space-y-5">
                                {data.education.map((edu, index) => (
                                    <article key={index} className="relative group">
                                        <div className="absolute -left-[45px] top-1.5 size-2.5 rounded-full bg-slate-300 ring-4 ring-white group-hover:bg-slate-500 transition-colors"></div>
                                        
                                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                        {edu.field && <div className="text-sm font-medium text-slate-700">{edu.field}</div>}
                                        
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-sm text-slate-500">{edu.institution}</span>
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                                                {formatDate(edu.graduation_date)}
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </main>
        </div>
    );
};

export default NewYorkTemplate;