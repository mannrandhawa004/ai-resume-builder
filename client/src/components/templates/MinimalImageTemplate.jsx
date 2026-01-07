import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, ExternalLink } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor, fontSize = "14px" }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const containerStyle = {
        fontSize: fontSize,
        lineHeight: '1.6'
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800 shadow-xl min-h-[1100px]" style={containerStyle}>
            <div className="grid grid-cols-3 min-h-full">

                {/* --- LEFT COLUMN (SIDEBAR) --- */}
                <aside className="col-span-1 bg-zinc-50 border-r border-zinc-200 p-8 flex flex-col gap-10">
                    
                    {/* Profile Image */}
                    <div className="w-full flex justify-center">
                         {data.personal_info?.image && (
                            <div className="relative">
                                <img 
                                    src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                                    alt="Profile" 
                                    className="w-32 h-32 object-cover rounded-full shadow-md"
                                    style={{ border: `4px solid ${accentColor}` }} 
                                />
                            </div>
                        )}
                    </div>

                    {/* Contact Info */}
                    <section>
                        <h2 className="text-[0.75em] font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase border-b border-zinc-200 pb-2">
                            Contact
                        </h2>
                        <ul className="space-y-3 text-[0.85em] font-medium text-zinc-600">
                            {data.personal_info?.phone && (
                                <li className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-full bg-white shadow-sm text-zinc-400"><Phone size={12} /></div>
                                    <span>{data.personal_info.phone}</span>
                                </li>
                            )}
                            {data.personal_info?.email && (
                                <li className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-full bg-white shadow-sm text-zinc-400"><Mail size={12} /></div>
                                    <span className="break-all">{data.personal_info.email}</span>
                                </li>
                            )}
                            {data.personal_info?.location && (
                                <li className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-full bg-white shadow-sm text-zinc-400"><MapPin size={12} /></div>
                                    <span>{data.personal_info.location}</span>
                                </li>
                            )}
                            {data.personal_info?.linkedin && (
                                <li className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-full bg-white shadow-sm text-zinc-400"><Linkedin size={12} /></div>
                                    <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-900 truncate">LinkedIn</a>
                                </li>
                            )}
                            {data.personal_info?.github && (
                                <li className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-full bg-white shadow-sm text-zinc-400"><Github size={12} /></div>
                                    <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="hover:text-zinc-900 truncate">GitHub</a>
                                </li>
                            )}
                            {data.personal_info?.portfolio && (
                                <li className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-full bg-white shadow-sm text-zinc-400"><Globe size={12} /></div>
                                    <a href={data.personal_info.portfolio} target="_blank" rel="noreferrer" className="hover:text-zinc-900 truncate">Portfolio</a>
                                </li>
                            )}
                        </ul>
                    </section>

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-[0.75em] font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase border-b border-zinc-200 pb-2">
                                Education
                            </h2>
                            <ul className="space-y-5 text-[0.9em]">
                                {data.education.map((edu, index) => (
                                    <li key={index}>
                                        <p className="font-bold text-zinc-800 leading-tight">{edu.degree}</p>
                                        <p className="text-zinc-500 text-[0.9em] mt-0.5">{edu.institution}</p>
                                        <p className="text-[0.8em] text-zinc-400 mt-1 font-mono">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-[0.75em] font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase border-b border-zinc-200 pb-2">
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="text-[0.8em] bg-white border border-zinc-200 px-2 py-1 rounded text-zinc-600 font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications (Added) */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[0.75em] font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase border-b border-zinc-200 pb-2">
                                Certifications
                            </h2>
                            <ul className="space-y-4">
                                {data.certifications.map((cert, index) => (
                                    <li key={index}>
                                        <p className="font-bold text-zinc-800 text-[0.9em] leading-tight">{cert.name}</p>
                                        <p className="text-[0.8em] text-zinc-500 mt-0.5">{cert.issuer}</p>
                                        <p className="text-[0.75em] text-zinc-400 font-mono">{cert.date}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Custom Section (Added) */}
                    {data.custom_section?.items?.length > 0 && (
                        <section>
                            <h2 className="text-[0.75em] font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase border-b border-zinc-200 pb-2">
                                {data.custom_section.title || "Additional"}
                            </h2>
                            <ul className="space-y-4">
                                {data.custom_section.items.map((item, index) => (
                                    <li key={index}>
                                        <p className="font-bold text-zinc-800 text-[0.9em] leading-tight">{item.name}</p>
                                        <p className="text-[0.8em] text-zinc-500 mt-0.5">{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>


                {/* --- RIGHT COLUMN (MAIN CONTENT) --- */}
                <main className="col-span-2 p-12">
                    
                    {/* Header Name/Title */}
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold text-zinc-800 tracking-tight leading-none mb-2">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <p className="text-lg font-medium tracking-widest uppercase" style={{ color: accentColor }}>
                            {data?.personal_info?.profession || "Profession"}
                        </p>
                    </div>

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-12">
                            <h2 className="text-[0.8em] font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase flex items-center gap-3">
                                <span className="w-6 h-0.5 bg-zinc-200"></span>
                                Profile
                            </h2>
                            <p className="text-zinc-600 leading-relaxed text-justify">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-12">
                             <h2 className="text-[0.8em] font-black tracking-[0.2em] text-zinc-400 mb-8 uppercase flex items-center gap-3">
                                <span className="w-6 h-0.5 bg-zinc-200"></span>
                                Experience
                            </h2>
                            <div className="space-y-10">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="relative pl-6 border-l-2" style={{ borderColor: `${accentColor}40` }}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-zinc-800 text-lg">
                                                {exp.position}
                                            </h3>
                                            <span className="text-[0.75em] font-bold text-zinc-400 uppercase tracking-wider">
                                                {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="font-semibold text-[0.95em] mb-3" style={{ color: accentColor }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <div className="text-zinc-600 text-[0.95em] leading-relaxed whitespace-pre-line">
                                                {exp.description}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                             <h2 className="text-[0.8em] font-black tracking-[0.2em] text-zinc-400 mb-8 uppercase flex items-center gap-3">
                                <span className="w-6 h-0.5 bg-zinc-200"></span>
                                Projects
                            </h2>
                            <div className="grid gap-8">
                                {data.project.map((project, index) => (
                                    <div key={index} className="bg-zinc-50 p-6 rounded-lg border border-zinc-100">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-zinc-800 text-[1.1em]">{project.name}</h3>
                                                {project.link && (
                                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                            </div>
                                            <span className="text-[0.7em] px-2 py-0.5 rounded bg-white border border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider">
                                                {project.type}
                                            </span>
                                        </div>
                                        {project.description && (
                                            <p className="text-zinc-600 text-[0.9em] leading-relaxed">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

export default MinimalImageTemplate;