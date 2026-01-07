import React from 'react';
import { MapPin, Phone, Mail, Globe, Linkedin, Github } from 'lucide-react';

const ViennaTemplate = ({ data, accentColor }) => {
    // Default to the Mint Green from the image if no accent color is passed
    const headerColor = accentColor || "#4ade80"; 

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-[1056px] flex font-sans text-slate-800">
            
            {/* --- LEFT COLUMN (Sidebar) --- */}
            <aside className="w-[30%] bg-white pl-8 pr-6 py-8 flex flex-col gap-10">
                
                {/* Photo Area - Matches image position */}
                <div className="w-full aspect-square mb-4">
                    {data.personal_info?.image ? (
                        <img 
                            src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                            alt="Profile" 
                            className="w-full h-full object-cover shadow-sm"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 text-xs text-center p-2">
                            No Photo
                        </div>
                    )}
                </div>

                {/* Skills Section */}
                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h3 className="font-bold text-lg mb-4 uppercase tracking-wide">Skills</h3>
                        <div className="space-y-4">
                            {data.skills.map((skill, index) => (
                                <div key={index}>
                                    <p className="text-sm font-medium mb-1">{skill}</p>
                                    {/* Decorative Bar to match image aesthetic */}
                                    <div className="h-1.5 w-full bg-slate-200 rounded-sm overflow-hidden">
                                        <div className="h-full bg-slate-800 w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Section (e.g. Languages) - Using the image's bar style */}
                {data.custom_section?.items?.length > 0 && (
                    <section>
                        <h3 className="font-bold text-lg mb-4 uppercase tracking-wide">
                            {data.custom_section.title || "Languages"}
                        </h3>
                        <div className="space-y-4">
                            {data.custom_section.items.map((item, index) => (
                                <div key={index}>
                                    <p className="text-sm font-medium mb-1">{item.name}</p>
                                    <p className="text-xs text-slate-500 mb-1">{item.description}</p>
                                    {/* Decorative Bar */}
                                    <div className="h-1.5 w-full bg-slate-200 rounded-sm overflow-hidden">
                                        <div className="h-full bg-slate-400 w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications (Moved to sidebar to balance layout) */}
                {data.certifications && data.certifications.length > 0 && (
                    <section>
                        <h3 className="font-bold text-lg mb-4 uppercase tracking-wide">Certifications</h3>
                        <ul className="space-y-4">
                            {data.certifications.map((cert, index) => (
                                <li key={index} className="text-sm">
                                    <p className="font-bold leading-tight">{cert.name}</p>
                                    <p className="text-xs text-slate-500 mt-1">{cert.issuer}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </aside>

            {/* --- RIGHT COLUMN (Main Content) --- */}
            <main className="w-[70%] flex flex-col">
                
                {/* Header Block - Matches image style (Color block with info) */}
                <header className="p-10 flex flex-col justify-center" style={{ backgroundColor: headerColor }}>
                    <h1 className="text-4xl font-bold text-slate-900 mb-1 tracking-tight">
                        {data.personal_info?.full_name || "Patricia Giordano"}
                    </h1>
                    <p className="text-xl text-slate-800 opacity-90 mb-6">
                        {data.personal_info?.profession || "Receptionist"}
                    </p>

                    <div className="text-sm text-slate-900 space-y-1 font-medium opacity-80">
                        <div className="flex flex-wrap gap-4">
                            {data.personal_info?.location && (
                                <span className='flex items-center gap-1.5'><MapPin size={14}/> {data.personal_info.location}</span>
                            )}
                            {data.personal_info?.phone && (
                                <span className='flex items-center gap-1.5'><Phone size={14}/> {data.personal_info.phone}</span>
                            )}
                            {data.personal_info?.email && (
                                <span className='flex items-center gap-1.5'><Mail size={14}/> {data.personal_info.email}</span>
                            )}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 pt-2">
                            {data.personal_info?.linkedin && (
                                <a href={data.personal_info.linkedin} className="flex items-center gap-1.5 hover:text-white transition-colors"><Linkedin size={14}/> LinkedIn</a>
                            )}
                            {data.personal_info?.website && (
                                <a href={data.personal_info.website} className="flex items-center gap-1.5 hover:text-white transition-colors"><Globe size={14}/> Portfolio</a>
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-10 pt-8 space-y-10">
                    
                    {/* Profile / Summary */}
                    {data.professional_summary && (
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">Profile</h2>
                            <p className="text-sm leading-relaxed text-slate-700 text-justify">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Employment History */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-5">Employment History</h2>
                            <div className="space-y-6">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-md text-slate-800">
                                                {exp.position}, {exp.company}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </p>
                                        
                                        {exp.description && (
                                            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line pl-1">
                                                {exp.description}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects (Formatted like Experience to match template style) */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-5">Projects</h2>
                            <div className="space-y-6">
                                {data.project.map((proj, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-md text-slate-800">
                                                {proj.name}
                                            </h3>
                                            {proj.type && <span className="text-xs font-bold text-slate-400 uppercase">{proj.type}</span>}
                                        </div>
                                        
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline mb-2 block">
                                                View Project
                                            </a>
                                        )}

                                        <p className="text-sm text-slate-700 leading-relaxed">
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
                            <h2 className="text-xl font-bold text-slate-900 mb-5">Education</h2>
                            <div className="space-y-5">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-md text-slate-800">
                                            {edu.degree} {edu.field ? `, ${edu.field}` : ''}, {edu.institution}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wide">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </main>
        </div>
    );
};

export default ViennaTemplate;