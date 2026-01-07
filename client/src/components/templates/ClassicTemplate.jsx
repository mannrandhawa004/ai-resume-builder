import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, ExternalLink } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-12 bg-white text-gray-800 leading-relaxed shadow-lg min-h-[1000px]">
            {/* Header */}
            <header className="text-center mb-10 border-b-2 pb-8" style={{ borderColor: accentColor }}>


                <h1 className="text-4xl font-bold mb-2 uppercase tracking-wide" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-xl text-gray-600 font-medium mb-4">{data.personal_info?.profession}</p>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
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
                        <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                            <Linkedin size={14} />
                            <span className="truncate max-w-[150px]">LinkedIn</span>
                        </a>
                    )}
                    {data.personal_info?.github && (
                        <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                            <Github size={14} />
                            <span className="truncate max-w-[150px]">GitHub</span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                            <Globe size={14} />
                            <span className="truncate max-w-[150px]">Portfolio</span>
                        </a>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold border-b-2 mb-3 pb-1 uppercase tracking-wider" style={{ borderColor: accentColor, color: accentColor }}>
                        Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-7 text-justify">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold border-b-2 mb-4 pb-1 uppercase tracking-wider" style={{ borderColor: accentColor, color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                                    <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <div className="text-base font-semibold mb-2" style={{ color: accentColor }}>
                                    {exp.company}
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects - CLEANED UP */}
            {data.project && data.project.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold border-b-2 mb-4 pb-1 uppercase tracking-wider" style={{ borderColor: accentColor, color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-5">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-900">{proj.name}</h3>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700">
                                                <ExternalLink size={14} />
                                            </a>
                                        )}
                                    </div>
                                    
                                    {/* SMALL TEXT FOR PROJECT TYPE */}
                                    {proj.type && (
                                        <span className="text-xs text-gray-500 font-medium italic">
                                            {proj.type}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold border-b-2 mb-4 pb-1 uppercase tracking-wider" style={{ borderColor: accentColor, color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-500">{formatDate(edu.graduation_date)}</p>
                                    {edu.gpa && <p className="text-xs text-gray-400 mt-0.5">GPA: {edu.gpa}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold border-b-2 mb-4 pb-1 uppercase tracking-wider" style={{ borderColor: accentColor, color: accentColor }}>
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
                        {data.skills.map((skill, index) => (
                            <span key={index} className="flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full mr-2 bg-gray-400"></span>
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications - Added for Completeness */}
            {data.certifications && data.certifications.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold border-b-2 mb-4 pb-1 uppercase tracking-wider" style={{ borderColor: accentColor, color: accentColor }}>
                        Certifications
                    </h2>
                    <div className="space-y-3">
                        {data.certifications.map((cert, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                                </div>
                                <span className="text-sm text-gray-500">{cert.date}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Custom Section */}
            {data.custom_section?.items?.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold border-b-2 mb-4 pb-1 uppercase tracking-wider" style={{ borderColor: accentColor, color: accentColor }}>
                        {data.custom_section.title || "Additional Info"}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {data.custom_section.items.map((item, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                                <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default ClassicTemplate;