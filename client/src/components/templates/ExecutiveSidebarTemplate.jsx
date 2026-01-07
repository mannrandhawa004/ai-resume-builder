import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github } from "lucide-react";

const ExecutiveSidebarTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white flex min-h-[1000px] shadow-2xl">
            {/* Sidebar (Left) */}
            <aside className="w-1/3 text-white p-8 flex flex-col gap-8" style={{ backgroundColor: accentColor }}>
                
                {/* Profile Header */}
                <div className="text-center">
                    {data.personal_info?.image && (
                        <div className="mb-5">
                            <img 
                                src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                                alt="Profile" 
                                className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-white/20 shadow-lg" 
                            />
                        </div>
                    )}
                    <h1 className="text-2xl font-bold leading-tight mb-2">{data.personal_info?.full_name}</h1>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 bg-black/10 py-1 px-2 rounded inline-block">
                        {data.personal_info?.profession}
                    </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 text-sm opacity-90">
                    <h3 className="font-bold border-b border-white/20 pb-2 uppercase tracking-wider text-xs opacity-70 mb-3">Contact</h3>
                    
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-3">
                            <Mail size={14} className="shrink-0"/>
                            <span className="break-all text-xs">{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-3">
                            <Phone size={14} className="shrink-0"/>
                            <span className="text-xs">{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-3">
                            <MapPin size={14} className="shrink-0"/>
                            <span className="text-xs">{data.personal_info.location}</span>
                        </div>
                    )}
                    
                    {/* Social Links */}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-3">
                            <Linkedin size={14} className="shrink-0"/>
                            <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="hover:underline truncate text-xs">LinkedIn</a>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-3">
                            <Globe size={14} className="shrink-0"/>
                            <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="hover:underline truncate text-xs">Portfolio</a>
                        </div>
                    )}
                    {data.personal_info?.github && (
                        <div className="flex items-center gap-3">
                            <Github size={14} className="shrink-0"/>
                            <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="hover:underline truncate text-xs">GitHub</a>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <div>
                        <h3 className="font-bold border-b border-white/20 pb-2 uppercase tracking-wider text-xs opacity-70 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="bg-white/20 px-2 py-1 rounded text-[10px] font-medium leading-none">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications - Added to Sidebar */}
                {data.certifications?.length > 0 && (
                    <div>
                        <h3 className="font-bold border-b border-white/20 pb-2 uppercase tracking-wider text-xs opacity-70 mb-3">Certifications</h3>
                        <div className="space-y-3">
                            {data.certifications.map((cert, i) => (
                                <div key={i}>
                                    <p className="font-bold text-xs leading-tight">{cert.name}</p>
                                    <p className="text-[10px] opacity-80">{cert.issuer} • {cert.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Custom Section (e.g. Languages) - Added to Sidebar */}
                {data.custom_section?.items?.length > 0 && (
                    <div>
                        <h3 className="font-bold border-b border-white/20 pb-2 uppercase tracking-wider text-xs opacity-70 mb-3">
                            {data.custom_section.title || "Additional"}
                        </h3>
                        <div className="space-y-2">
                            {data.custom_section.items.map((item, i) => (
                                <div key={i}>
                                    <p className="font-bold text-xs">{item.name}</p>
                                    <p className="text-[10px] opacity-80">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content (Right) */}
            <main className="w-2/3 p-12 text-gray-800 bg-white">
                
                {/* Summary */}
                {data.professional_summary && (
                    <section className="mb-10">
                        <h2 className="text-lg font-bold uppercase mb-3 flex items-center gap-2" style={{ color: accentColor }}>
                            Profile
                        </h2>
                        <div className="w-full h-0.5 bg-gray-100 mb-3"></div>
                        <p className="text-sm leading-7 text-gray-600 text-justify">{data.professional_summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-lg font-bold uppercase mb-3 flex items-center gap-2" style={{ color: accentColor }}>
                            Experience
                        </h2>
                        <div className="w-full h-0.5 bg-gray-100 mb-5"></div>
                        
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-4 border-l-2" style={{ borderColor: `${accentColor}30` }}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-gray-800">{exp.position}</h3>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold mb-2" style={{ color: accentColor }}>{exp.company}</p>
                                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects - Clean & Simple */}
                {data.project?.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-lg font-bold uppercase mb-3 flex items-center gap-2" style={{ color: accentColor }}>
                            Projects
                        </h2>
                        <div className="w-full h-0.5 bg-gray-100 mb-5"></div>

                        <div className="grid gap-6">
                            {data.project.map((proj, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-800">{proj.name}</h3>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Small Project Type Text */}
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                                        {proj.type}
                                    </p>

                                    <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase mb-3 flex items-center gap-2" style={{ color: accentColor }}>
                            Education
                        </h2>
                        <div className="w-full h-0.5 bg-gray-100 mb-5"></div>

                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-gray-900">{edu.degree}</p>
                                        <p className="text-sm text-gray-500">{edu.field}</p>
                                        <p className="font-medium text-sm mt-1" style={{ color: accentColor }}>{edu.institution}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded">{formatDate(edu.graduation_date)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default ExecutiveSidebarTemplate;