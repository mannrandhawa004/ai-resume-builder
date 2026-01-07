import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, ExternalLink } from "lucide-react";

const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-10 bg-white text-gray-900 font-light shadow-lg min-h-[1100px]">
            {/* Header */}
            <header className="mb-12 border-b border-gray-100 pb-8 flex justify-between items-start">
                <div className="flex-1">
                    <h1 className="text-5xl font-thin mb-2 tracking-tight text-gray-900">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-xl text-gray-500 font-light tracking-wide mb-6">
                        {data.personal_info?.profession}
                    </p>

                    <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500">
                        {data.personal_info?.email && (
                            <div className="flex items-center gap-1.5">
                                <Mail size={14} />
                                <span>{data.personal_info.email}</span>
                            </div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-1.5">
                                <Phone size={14} />
                                <span>{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin size={14} />
                                <span>{data.personal_info.location}</span>
                            </div>
                        )}
                        {data.personal_info?.linkedin && (
                            <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
                                <Linkedin size={14} />
                                <span className="hidden sm:inline">LinkedIn</span>
                            </a>
                        )}
                        {data.personal_info?.github && (
                            <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
                                <Github size={14} />
                                <span className="hidden sm:inline">GitHub</span>
                            </a>
                        )}
                        {data.personal_info?.website && (
                            <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
                                <Globe size={14} />
                                <span className="hidden sm:inline">Portfolio</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Optional Image for Minimal Design */}
                {data.personal_info?.image && (
                    <div className="ml-8 shrink-0">
                        <img 
                            src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                            alt="Profile" 
                            className="w-24 h-24 object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500 border border-gray-100"
                        />
                    </div>
                )}
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-12">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                        Profile
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg font-light text-justify">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-gray-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                        Experience
                    </h2>

                    <div className="space-y-8">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="group">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-xl font-normal text-gray-900">
                                        {exp.position}
                                    </h3>
                                    <span className="text-sm text-gray-400 font-mono whitespace-nowrap ml-4">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-500 font-medium mb-3" style={{ color: accentColor }}>{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects - Updated with Link and Type */}
            {data.project && data.project.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-gray-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                        Projects
                    </h2>

                    <div className="grid gap-8">
                        {data.project.map((proj, index) => (
                            <div key={index} className="border-l-2 pl-6 transition-all hover:border-gray-300 border-transparent">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-medium text-gray-900">{proj.name}</h3>
                                        {proj.link && (
                                            <a 
                                                href={proj.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-gray-400 hover:text-gray-800 transition-colors"
                                            >
                                                <ExternalLink size={14} strokeWidth={1.5} />
                                            </a>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        {proj.type}
                                    </span>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid md:grid-cols-2 gap-12">
                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-gray-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                            Education
                        </h2>

                        <div className="space-y-6">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-medium text-gray-900 text-lg">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1 mb-2">{edu.institution}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-mono">{formatDate(edu.graduation_date)}</span>
                                        {edu.gpa && <span className="text-gray-400 text-xs">GPA: {edu.gpa}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Certifications Column */}
                <div className="space-y-12">
                    
                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-gray-400 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                                Skills
                            </h2>

                            <div className="text-gray-700 text-sm leading-7">
                                {/* Using comma separated for minimalism, simpler for ATS reading linearly */}
                                {data.skills.map((skill, index) => (
                                    <span key={index}>
                                        {skill}
                                        {index !== data.skills.length - 1 && <span className="text-gray-300 mx-2">•</span>}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications (Added) */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-gray-400 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                                Certifications
                            </h2>
                            <div className="space-y-3">
                                {data.certifications.map((cert, index) => (
                                    <div key={index}>
                                        <p className="font-medium text-gray-900 text-sm">{cert.name}</p>
                                        <p className="text-xs text-gray-500">{cert.issuer} <span className="text-gray-300">|</span> {cert.date}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Custom Section (Added) */}
                    {data.custom_section?.items?.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-gray-400 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                                {data.custom_section.title || "Additional"}
                            </h2>
                            <ul className="list-disc list-outside ml-4 space-y-2">
                                {data.custom_section.items.map((item, index) => (
                                    <li key={index} className="text-sm text-gray-700 pl-1">
                                        <span className="font-medium">{item.name}</span>
                                        {item.description && <span className="text-gray-500"> - {item.description}</span>}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MinimalTemplate;