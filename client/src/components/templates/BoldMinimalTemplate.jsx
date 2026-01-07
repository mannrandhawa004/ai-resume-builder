import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Github, ExternalLink } from "lucide-react";

const BoldMinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-12 text-slate-900 min-h-[1056px] shadow-xl">
            {/* Header */}
            <header className="border-b-4 border-slate-900 pb-8 mb-12">
                <div className="flex justify-between items-end mb-8">
                    <div className="max-w-[75%]">
                        <h1 className="text-6xl font-serif font-black tracking-tighter mb-2 leading-none">
                            {data.personal_info?.full_name || "Name"}
                        </h1>
                        <p className="text-xl font-bold uppercase tracking-widest text-slate-500" style={{ color: accentColor }}>
                            {data.personal_info?.profession}
                        </p>
                    </div>
                    
                    {/* Optional Image */}
                    {data.personal_info?.image && (
                        <img 
                            src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                            alt="Profile" 
                            className="w-28 h-28 object-cover rounded-full border-4 border-slate-900"
                        />
                    )}
                </div>

                <div className="flex flex-wrap justify-between items-end text-sm font-bold uppercase tracking-wider text-slate-600">
                    <div className="flex flex-col gap-1.5">
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
                    </div>

                    <div className="flex gap-6">
                        {data.personal_info?.linkedin && (
                            <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                                <Linkedin size={16} />
                                <span className="hidden sm:inline">LinkedIn</span>
                            </a>
                        )}
                        {data.personal_info?.github && (
                            <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                                <Github size={16} />
                                <span className="hidden sm:inline">GitHub</span>
                            </a>
                        )}
                        {data.personal_info?.website && (
                            <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                                <Globe size={16} />
                                <span className="hidden sm:inline">Portfolio</span>
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-12">
                {/* Left side: Main Content (8 cols) */}
                <div className="col-span-8 space-y-12">
                    {/* Summary */}
                    {data.professional_summary && (
                        <section>
                            <h2 className="text-sm font-black uppercase mb-4 py-1 border-b-2 border-slate-200" style={{ borderColor: accentColor }}>Profile</h2>
                            <p className="text-slate-700 leading-7 text-justify font-medium text-base">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase mb-6 py-1 border-b-2 border-slate-200" style={{ borderColor: accentColor }}>Experience</h2>
                            <div className="space-y-8">
                                {data.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-xl text-slate-900">{exp.position}</h3>
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="font-bold text-sm mb-3" style={{ color: accentColor }}>{exp.company}</p>
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

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase mb-6 py-1 border-b-2 border-slate-200" style={{ borderColor: accentColor }}>Projects</h2>
                            <div className="space-y-8">
                                {data.project.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg text-slate-900">{proj.name}</h3>
                                                {proj.link && (
                                                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-800 transition-colors">
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        {/* Project Type - Clean Small Text */}
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{proj.type}</p>
                                        
                                        <p className="text-sm text-slate-600 leading-relaxed">
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
                            <h2 className="text-sm font-black uppercase mb-6 py-1 border-b-2 border-slate-200" style={{ borderColor: accentColor }}>
                                {data.custom_section.title || "Additional Info"}
                            </h2>
                            <div className="space-y-4">
                                {data.custom_section.items.map((item, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                                        <p className="text-sm text-slate-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right side: Sidebar (4 cols) */}
                <div className="col-span-4 space-y-12">
                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase mb-4 py-1 border-b-2 border-slate-200" style={{ borderColor: accentColor }}>Education</h2>
                            <div className="space-y-6">
                                {data.education.map((edu, i) => (
                                    <div key={i}>
                                        <p className="font-bold text-slate-900 text-base leading-tight">{edu.degree}</p>
                                        <p className="text-slate-600 font-medium mt-1 text-sm">{edu.institution}</p>
                                        <p className="text-slate-400 font-bold text-xs mt-1 uppercase tracking-wide">{formatDate(edu.graduation_date)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills - ATS Friendly Bullet Points */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase mb-4 py-1 border-b-2 border-slate-200" style={{ borderColor: accentColor }}>Skills</h2>
                            <ul className="list-disc list-outside ml-4 space-y-2 text-sm font-medium text-slate-700">
                                {data.skills.map((skill, i) => (
                                    <li key={i} className="pl-1">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certifications - Added Section */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase mb-4 py-1 border-b-2 border-slate-200" style={{ borderColor: accentColor }}>Certifications</h2>
                            <div className="space-y-4">
                                {data.certifications.map((cert, i) => (
                                    <div key={i}>
                                        <p className="font-bold text-slate-900 text-sm leading-snug">{cert.name}</p>
                                        <p className="text-slate-500 text-xs mt-1">{cert.issuer}</p>
                                        <p className="text-slate-400 font-mono text-[10px] mt-0.5">{cert.date}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoldMinimalTemplate;