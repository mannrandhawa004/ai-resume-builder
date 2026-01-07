import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, ExternalLink } from "lucide-react";

const CreativeGridTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-slate-800 shadow-xl min-h-[1056px] border-t-[16px]" style={{ borderColor: accentColor }}>
            <div className="p-12">
                {/* Header Section */}
                <header className="flex justify-between items-start mb-14 border-b border-slate-100 pb-10">
                    <div className="flex gap-8 items-center max-w-[75%]">
                        {/* Profile Image */}
                        {data.personal_info?.image && (
                            <img 
                                src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                                alt="Profile" 
                                className="w-24 h-24 object-cover rounded-lg shadow-sm"
                            />
                        )}
                        
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-none mb-2">
                                {data.personal_info?.full_name?.toUpperCase() || "YOUR NAME"}
                            </h1>
                            <p className="text-xl font-bold tracking-widest uppercase" style={{ color: accentColor }}>
                                {data.personal_info?.profession || "Profession"}
                            </p>
                        </div>
                    </div>

                    <div className="text-right space-y-2 text-sm font-medium text-slate-500">
                        {data.personal_info?.email && (
                            <div className="flex items-center justify-end gap-2">
                                <span>{data.personal_info.email}</span>
                                <Mail size={14} />
                            </div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center justify-end gap-2">
                                <span>{data.personal_info.phone}</span>
                                <Phone size={14} />
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center justify-end gap-2">
                                <span>{data.personal_info.location}</span>
                                <MapPin size={14} />
                            </div>
                        )}
                        
                        {/* Social Links */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            {data.personal_info?.linkedin && (
                                <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-800 transition-colors">
                                    <Linkedin size={16} />
                                </a>
                            )}
                            {data.personal_info?.github && (
                                <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-800 transition-colors">
                                    <Github size={16} />
                                </a>
                            )}
                            {data.personal_info?.website && (
                                <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-800 transition-colors">
                                    <Globe size={16} />
                                </a>
                            )}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-12">
                    {/* Main Column (Left - 8 Cols) */}
                    <div className="col-span-8 space-y-12">
                        {/* Summary */}
                        {data.professional_summary && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-4 flex items-center gap-2">
                                    <span className="w-8 h-1" style={{ backgroundColor: accentColor }}></span>
                                    About Me
                                </h2>
                                <p className="text-slate-700 leading-relaxed text-lg font-light">
                                    {data.professional_summary}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-8 flex items-center gap-2">
                                    <span className="w-8 h-1" style={{ backgroundColor: accentColor }}></span>
                                    Experience
                                </h2>
                                <div className="space-y-10">
                                    {data.experience.map((exp, i) => (
                                        <div key={i} className="relative group">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">{exp.position}</h3>
                                                <span className="text-xs font-bold text-slate-400 whitespace-nowrap ml-4">
                                                    {formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
                                                </span>
                                            </div>
                                            <p className="font-bold mb-3 text-sm uppercase tracking-wide" style={{ color: accentColor }}>{exp.company}</p>
                                            {exp.description && (
                                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                                    {exp.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects - Clean & Simple */}
                        {data.project && data.project.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-8 flex items-center gap-2">
                                    <span className="w-8 h-1" style={{ backgroundColor: accentColor }}></span>
                                    Projects
                                </h2>
                                <div className="space-y-8">
                                    {data.project.map((proj, i) => (
                                        <div key={i} className="group">
                                            <div className="flex justify-between items-baseline mb-2">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-bold text-slate-900">{proj.name}</h3>
                                                    {proj.link && (
                                                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors">
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    )}
                                                </div>
                                                {/* Small text for Project Type */}
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                    {proj.type}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 leading-relaxed border-l-2 pl-4 border-slate-100">
                                                {proj.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Custom Section */}
                        {data.custom_section?.items?.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-6 flex items-center gap-2">
                                    <span className="w-8 h-1" style={{ backgroundColor: accentColor }}></span>
                                    {data.custom_section.title || "Additional Info"}
                                </h2>
                                <div className="grid grid-cols-2 gap-6">
                                    {data.custom_section.items.map((item, index) => (
                                        <div key={index}>
                                            <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                                            <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Column (Right - 4 Cols) */}
                    <div className="col-span-4 space-y-12">
                        {/* Skills - ATS Friendly List */}
                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-6 border-b border-slate-100 pb-2">Core Skills</h2>
                                <ul className="list-disc list-outside ml-4 space-y-2 text-sm font-bold text-slate-700">
                                    {data.skills.map((skill, i) => (
                                        <li key={i} className="pl-1">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-6 border-b border-slate-100 pb-2">Education</h2>
                                <div className="space-y-6">
                                    {data.education.map((edu, i) => (
                                        <div key={i}>
                                            <p className="text-sm font-black text-slate-900 uppercase leading-tight">{edu.degree}</p>
                                            <p className="text-xs font-bold text-slate-500 mt-1">{edu.institution}</p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-1 font-mono">{formatDate(edu.graduation_date)}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications - Added Section */}
                        {data.certifications && data.certifications.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-6 border-b border-slate-100 pb-2">Certifications</h2>
                                <div className="space-y-4">
                                    {data.certifications.map((cert, i) => (
                                        <div key={i}>
                                            <p className="text-sm font-bold text-slate-900 leading-tight">{cert.name}</p>
                                            <p className="text-xs text-slate-500 mt-1">{cert.issuer}</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">{cert.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeGridTemplate;