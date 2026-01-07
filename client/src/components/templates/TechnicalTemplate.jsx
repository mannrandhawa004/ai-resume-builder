import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Github, ExternalLink } from "lucide-react";

const TechnicalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white min-h-[1056px] flex shadow-2xl">
            {/* --- DARK SIDEBAR --- */}
            <aside className="w-80 bg-slate-900 text-slate-300 p-8 flex flex-col gap-8">
                
                {/* Profile Header (Moved to sidebar for this layout) */}
                <div className="text-center">
                    {data.personal_info?.image && (
                        <div className="mb-5 flex justify-center">
                            <img 
                                src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                                alt="Profile" 
                                className="w-32 h-32 object-cover rounded-full border-4 border-slate-700 shadow-xl"
                            />
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-white leading-tight mb-2">{data.personal_info?.full_name}</h1>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>
                        {data.personal_info?.profession}
                    </p>
                </div>

                {/* Contact Info */}
                <section>
                    <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4 border-b border-slate-800 pb-2">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        {data.personal_info?.email && (
                            <li className="flex items-center gap-3">
                                <Mail size={14} className="text-slate-500" />
                                <span className="break-all">{data.personal_info.email}</span>
                            </li>
                        )}
                        {data.personal_info?.phone && (
                            <li className="flex items-center gap-3">
                                <Phone size={14} className="text-slate-500" />
                                <span>{data.personal_info.phone}</span>
                            </li>
                        )}
                        {data.personal_info?.location && (
                            <li className="flex items-center gap-3">
                                <MapPin size={14} className="text-slate-500" />
                                <span>{data.personal_info.location}</span>
                            </li>
                        )}
                        {data.personal_info?.linkedin && (
                            <li className="flex items-center gap-3">
                                <Linkedin size={14} className="text-slate-500" />
                                <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors truncate">LinkedIn</a>
                            </li>
                        )}
                        {data.personal_info?.github && (
                            <li className="flex items-center gap-3">
                                <Github size={14} className="text-slate-500" />
                                <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors truncate">GitHub</a>
                            </li>
                        )}
                        {data.personal_info?.website && (
                            <li className="flex items-center gap-3">
                                <Globe size={14} className="text-slate-500" />
                                <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="hover:text-white transition-colors truncate">Portfolio</a>
                            </li>
                        )}
                    </ul>
                </section>

                {/* Skills (ATS Friendly List) */}
                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4 border-b border-slate-800 pb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications (Added) */}
                {data.certifications && data.certifications.length > 0 && (
                    <section>
                        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4 border-b border-slate-800 pb-2">Certifications</h3>
                        <ul className="space-y-3">
                            {data.certifications.map((cert, i) => (
                                <li key={i}>
                                    <p className="font-bold text-white text-xs">{cert.name}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">{cert.issuer}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Custom Section (Added) */}
                {data.custom_section?.items?.length > 0 && (
                    <section>
                        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4 border-b border-slate-800 pb-2">
                            {data.custom_section.title || "Additional"}
                        </h3>
                        <ul className="space-y-3">
                            {data.custom_section.items.map((item, i) => (
                                <li key={i}>
                                    <p className="font-bold text-white text-xs">{item.name}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </aside>

            {/* --- LIGHT MAIN CONTENT --- */}
            <main className="flex-1 p-10 bg-white text-slate-800">
                
                {/* Summary */}
                {data.professional_summary && (
                    <section className="mb-10">
                        <h2 className="text-lg font-bold border-l-4 pl-3 mb-4 uppercase tracking-wider" style={{ borderColor: accentColor }}>
                            Profile
                        </h2>
                        <p className="text-sm text-slate-600 leading-relaxed text-justify">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-lg font-bold border-l-4 pl-3 mb-6 uppercase tracking-wider" style={{ borderColor: accentColor }}>
                            Experience
                        </h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-lg font-bold text-slate-900">{exp.position}</h4>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold mb-2" style={{ color: accentColor }}>{exp.company}</p>
                                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects - Simplified & Row Aligned */}
                {data.project && data.project.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-lg font-bold border-l-4 pl-3 mb-6 uppercase tracking-wider" style={{ borderColor: accentColor }}>
                            Projects
                        </h2>
                        <div className="space-y-6">
                            {data.project.map((proj, i) => (
                                <div key={i} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900">{proj.name}</h4>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors">
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                        {/* Project Type: Small text on the right */}
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded">
                                            {proj.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {proj.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold border-l-4 pl-3 mb-6 uppercase tracking-wider" style={{ borderColor: accentColor }}>
                            Education
                        </h2>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{edu.degree}</p>
                                        <p className="text-sm text-slate-500">{edu.field}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-sm" style={{ color: accentColor }}>{edu.institution}</p>
                                        <p className="text-xs text-slate-400 font-mono mt-1">{formatDate(edu.graduation_date)}</p>
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

export default TechnicalTemplate;