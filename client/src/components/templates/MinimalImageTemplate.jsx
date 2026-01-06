import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor, fontSize = "14px" }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    // Helper to ensure the template uses the inherited or passed font size
    const containerStyle = {
        fontSize: fontSize,
        lineHeight: '1.5'
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800" style={containerStyle}>
            <div className="grid grid-cols-3">

                <div className="col-span-1 py-10">
                    {/* Image */}
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <div className="mb-6">
                            <img src={data.personal_info.image} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" style={{ border: `4px solid ${accentColor}30` }} />
                        </div>
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <div className="mb-6">
                                <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" />
                            </div>
                        ) : null
                    )}
                </div>

                {/* Name + Title */}
                <div className="col-span-2 flex flex-col justify-center py-10 px-8">
                    <h1 className="text-[2.5em] font-bold text-zinc-700 tracking-widest leading-none">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="uppercase text-zinc-600 font-medium text-[1em] tracking-[0.2em] mt-2">
                        {data?.personal_info?.profession || "Profession"}
                    </p>
                </div>

                {/* Left Sidebar */}
                <aside className="col-span-1 border-r border-zinc-400 p-6 pt-0">

                    {/* Contact */}
                    <section className="mb-8">
                        <h2 className="text-[0.8em] font-semibold tracking-widest text-zinc-600 mb-3 border-b border-zinc-200 pb-1">
                            CONTACT
                        </h2>
                        <div className="space-y-3 text-[0.9em]">
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={14} style={{ color: accentColor }} />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-2">
                                    <Mail size={14} style={{ color: accentColor }} />
                                    <span className="break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} style={{ color: accentColor }} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}

                            {/* NEW: LinkedIn Field */}
                            {data.personal_info?.linkedin && (
                                <div className="flex items-center gap-2">
                                    <Linkedin size={14} style={{ color: accentColor }} />
                                    <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="hover:underline truncate">LinkedIn</a>
                                </div>
                            )}

                            {/* NEW: GitHub Field */}
                            {data.personal_info?.github && (
                                <div className="flex items-center gap-2">
                                    <Github size={14} style={{ color: accentColor }} />
                                    <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="hover:underline truncate">GitHub</a>
                                </div>
                            )}

                            {/* NEW: Portfolio Field */}
                            {data.personal_info?.portfolio && (
                                <div className="flex items-center gap-2">
                                    <Globe size={14} style={{ color: accentColor }} />
                                    <a href={data.personal_info.portfolio} target="_blank" rel="noreferrer" className="hover:underline truncate">Portfolio</a>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-[0.8em] font-semibold tracking-widest text-zinc-600 mb-3 border-b border-zinc-200 pb-1">
                                EDUCATION
                            </h2>
                            <div className="space-y-4 text-[0.9em]">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-semibold uppercase leading-tight">{edu.degree}</p>
                                        <p className="text-zinc-600 italic">{edu.institution}</p>
                                        <p className="text-[0.85em] text-zinc-500">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-[0.8em] font-semibold tracking-widest text-zinc-600 mb-3 border-b border-zinc-200 pb-1">
                                SKILLS
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="text-[0.85em] bg-zinc-100 px-2 py-0.5 rounded text-zinc-700">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Content */}
                <main className="col-span-2 p-8 pt-0">

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-8">
                            <h2 className="text-[0.8em] font-bold tracking-widest mb-3" style={{ color: accentColor }} >
                                SUMMARY
                            </h2>
                            <p className="text-[1em] text-zinc-700 leading-relaxed text-justify">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-[0.8em] font-bold tracking-widest mb-4" style={{ color: accentColor }} >
                                EXPERIENCE
                            </h2>
                            <div className="space-y-6">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: accentColor + '20' }}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-zinc-900 text-[1.1em]">
                                                {exp.position}
                                            </h3>
                                            <span className="text-[0.8em] font-medium text-zinc-500 whitespace-nowrap bg-zinc-50 px-2 py-1 rounded">
                                                {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-[1em] font-semibold mb-2" style={{ color: accentColor }} >
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <ul className="list-disc list-outside ml-4 text-[0.95em] text-zinc-700 space-y-1.5">
                                                {exp.description.split("\n").filter(line => line.trim()).map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <h2 className="text-[0.8em] font-bold uppercase tracking-widest" style={{ color: accentColor }}>
                                PROJECTS
                            </h2>
                            <div className="space-y-5 mt-4">
                                {data.project.map((project, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-[1.05em] font-bold text-zinc-800">{project.name}</h3>
                                            <span className="text-[0.8em] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-medium">
                                                {project.type}
                                            </span>
                                        </div>
                                        {project.description && (
                                            <ul className="list-disc list-outside ml-4 text-[0.9em] text-zinc-700 mt-2 space-y-1">
                                                {project.description.split("\n").filter(line => line.trim()).map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
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