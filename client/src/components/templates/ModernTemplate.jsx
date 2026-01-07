import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 shadow-xl min-h-[1100px]">
            {/* Header */}
            <header className="p-10 text-white" style={{ backgroundColor: accentColor }}>
                <div className="flex justify-between items-start mb-8">
                    <div className="max-w-[80%]">
                        <h1 className="text-5xl font-light mb-2 tracking-tight">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <p className="text-xl opacity-90 tracking-wider font-medium uppercase">
                            {data.personal_info?.profession || "Professional Title"}
                        </p>
                    </div>
                    {/* Optional: Render Image if it exists */}
                    {data.personal_info?.image && (
                        <img
                            src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
                        />
                    )}
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90 font-medium">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={14} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <a target="_blank" rel="noreferrer" href={data.personal_info?.linkedin} className="flex items-center gap-2 hover:underline">
                            <Linkedin size={14} />
                            <span className="break-all text-xs">LinkedIn</span>
                        </a>
                    )}
                    {data.personal_info?.github && (
                        <a target="_blank" rel="noreferrer" href={data.personal_info?.github} className="flex items-center gap-2 hover:underline">
                            <Github size={14} />
                            <span className="break-all text-xs">GitHub</span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a target="_blank" rel="noreferrer" href={data.personal_info?.website} className="flex items-center gap-2 hover:underline">
                            <Globe size={14} />
                            <span className="break-all text-xs">Portfolio</span>
                        </a>
                    )}
                </div>
            </header>

            <div className="p-10">
                <div className="grid grid-cols-12 gap-10">
                    
                    {/* LEFT COLUMN (Main Content - 8 cols) */}
                    <div className="col-span-8 space-y-10">
                        
                        {/* Professional Summary */}
                        {data.professional_summary && (
                            <section>
                                <h2 className="text-lg font-bold mb-3 pb-1 border-b border-gray-200 uppercase tracking-widest" style={{ color: accentColor }}>
                                    Profile
                                </h2>
                                <p className="text-gray-700 leading-7 text-justify text-sm">
                                    {data.professional_summary}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-5 pb-1 border-b border-gray-200 uppercase tracking-widest" style={{ color: accentColor }}>
                                    Experience
                                </h2>

                                <div className="space-y-6">
                                    {data.experience.map((exp, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                </span>
                                            </div>
                                            <div className="text-sm font-semibold mb-2 text-gray-600">
                                                {exp.company}
                                            </div>
                                            {exp.description && (
                                                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                                    {exp.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects - Simplified & Row Aligned */}
                        {data.project && data.project.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-5 pb-1 border-b border-gray-200 uppercase tracking-widest" style={{ color: accentColor }}>
                                    Projects
                                </h2>

                                <div className="space-y-5">
                                    {data.project.map((p, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-bold text-gray-800">{p.name}</h3>
                                                    {p.link && (
                                                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    )}
                                                </div>
                                                {/* Project Type: Small, clean text aligned to the right in the same row */}
                                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                    {p.type}
                                                </span>
                                            </div>
                                            
                                            {p.description && (
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {p.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* RIGHT COLUMN (Sidebar - 4 cols) */}
                    <div className="col-span-4 space-y-10">
                        
                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-4 pb-1 border-b border-gray-200 uppercase tracking-widest" style={{ color: accentColor }}>
                                    Education
                                </h2>
                                <div className="space-y-5">
                                    {data.education.map((edu, index) => (
                                        <div key={index}>
                                            <h3 className="font-bold text-gray-800 text-base leading-tight">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">{edu.institution}</p>
                                            <p className="text-xs font-semibold mt-1 opacity-70">
                                                {formatDate(edu.graduation_date)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills - Simple List */}
                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-4 pb-1 border-b border-gray-200 uppercase tracking-widest" style={{ color: accentColor }}>
                                    Skills
                                </h2>
                                <ul className="space-y-2">
                                    {data.skills.map((skill, index) => (
                                        <li key={index} className="text-sm text-gray-700 font-medium border-l-2 pl-3" style={{ borderColor: `${accentColor}50` }}>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Certifications */}
                        {data.certifications && data.certifications.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-4 pb-1 border-b border-gray-200 uppercase tracking-widest" style={{ color: accentColor }}>
                                    Certifications
                                </h2>
                                <ul className="space-y-4">
                                    {data.certifications.map((cert, index) => (
                                        <li key={index} className="text-sm">
                                            <p className="font-bold text-gray-800 leading-tight">{cert.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{cert.issuer}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{cert.date}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Custom Section */}
                        {data.custom_section?.items?.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-4 pb-1 border-b border-gray-200 uppercase tracking-widest" style={{ color: accentColor }}>
                                    {data.custom_section.title || "Additional"}
                                </h2>
                                <ul className="space-y-3">
                                    {data.custom_section.items.map((item, index) => (
                                        <li key={index} className="text-sm">
                                            <span className="font-bold text-gray-800 block">{item.name}</span>
                                            {item.description && <span className="text-gray-500 text-xs">{item.description}</span>}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModernTemplate;