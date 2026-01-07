import React from 'react';
import { MapPin, Phone, Mail, Link as LinkIcon, Globe, Linkedin, User } from 'lucide-react';

const RightSidebarTemaplate = ({ data, accentColor }) => {
    
    // The sidebar background color. Default to the deep navy from the image.
    const sidebarColor = accentColor || "#0f172a"; // Slate-900

    // Helper for date formatting
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        const date = new Date(year, month - 1);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white min-h-[1056px] flex shadow-2xl font-sans">
            
            {/* --- LEFT COLUMN (Main Content) --- */}
            <main className="w-[68%] p-10 pr-12 text-slate-900 flex flex-col gap-10">
                
                {/* Header */}
                <header className="flex items-center gap-6 mb-2">
                    {/* Photo */}
                    <div className="size-24 rounded-full overflow-hidden shrink-0 border-2 border-slate-100 shadow-sm">
                        {data.personal_info?.image ? (
                             <img 
                                src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                <User size={32} />
                            </div>
                        )}
                    </div>

                    {/* Name & Title */}
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-none mb-2">
                            {data.personal_info?.full_name || "Gregory Walls"}
                        </h1>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                            {data.personal_info?.profession || "Carpenter"}
                        </p>
                    </div>
                </header>

                {/* Profile */}
                {data.professional_summary && (
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Profile</h2>
                        <p className="text-sm leading-relaxed text-slate-700 text-justify">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Employment History */}
                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Employment History</h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <h3 className="text-base font-bold text-slate-900">
                                        {exp.position}, {exp.company} {exp.location ? `, ${exp.location}` : ''}
                                    </h3>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3 mt-1">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </p>
                                    
                                    {exp.description && (
                                        <ul className="list-disc pl-4 space-y-1.5 text-sm text-slate-700 marker:text-slate-400">
                                            {exp.description.split('\n').map((line, i) => (
                                                line.trim() && <li key={i} className="pl-1">{line.replace(/^[•-]\s*/, '')}</li>
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
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Projects</h2>
                        <div className="space-y-6">
                            {data.project.map((proj, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-slate-900">{proj.name}</h3>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                                <LinkIcon size={12} /> View
                                            </a>
                                        )}
                                    </div>
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
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Education</h2>
                        <div className="space-y-6">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="text-base font-bold text-slate-900">
                                        {edu.degree} {edu.field ? `, ${edu.field}` : ''}
                                    </h3>
                                    <div className="text-sm text-slate-700 font-medium mb-1">
                                        {edu.institution}
                                    </div>
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                                        {formatDate(edu.graduation_date)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

    

            </main>

            {/* --- RIGHT SIDEBAR --- */}
            <aside 
                className="w-[32%] py-12 px-8 text-white flex flex-col gap-12"
                style={{ backgroundColor: sidebarColor }}
            >
                
                {/* Details */}
                <section>
                    <h3 className="text-lg font-bold mb-6 border-b border-white/20 pb-2">Details</h3>
                    <div className="text-sm space-y-4 opacity-90">
                        {data.personal_info?.location && (
                            <div className="flex flex-col gap-1">
                                <span className="text-xs opacity-70 uppercase tracking-wider">Address</span>
                                <span>{data.personal_info.location}</span>
                            </div>
                        )}
                         {data.personal_info?.phone && (
                            <div className="flex flex-col gap-1">
                                <span className="text-xs opacity-70 uppercase tracking-wider">Phone</span>
                                <span>{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.email && (
                            <div className="flex flex-col gap-1">
                                <span className="text-xs opacity-70 uppercase tracking-wider">Email</span>
                                <a href={`mailto:${data.personal_info.email}`} className="hover:underline break-all">
                                    {data.personal_info.email}
                                </a>
                            </div>
                        )}
                        
                        {/* Socials */}
                        {(data.personal_info?.linkedin || data.personal_info?.website) && (
                            <div className="flex flex-col gap-2 pt-2">
                                {data.personal_info?.linkedin && (
                                     <a href={data.personal_info.linkedin} className="flex items-center gap-2 hover:underline">
                                        <Linkedin size={14}/> LinkedIn
                                    </a>
                                )}
                                {data.personal_info?.website && (
                                     <a href={data.personal_info.website} className="flex items-center gap-2 hover:underline">
                                        <Globe size={14}/> Portfolio
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold mb-6 border-b border-white/20 pb-2">Skills</h3>
                        <div className="space-y-4">
                            {data.skills.map((skill, index) => (
                                <div key={index}>
                                    <p className="text-sm font-medium mb-1">{skill}</p>
                                    {/* Visual 'progress bar' aesthetic from image */}
                                    <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-full rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Custom Section (Languages, etc) */}
                {data.custom_section?.items?.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold mb-6 border-b border-white/20 pb-2">
                            {data.custom_section.title || "Languages"}
                        </h3>
                        <div className="space-y-4">
                            {data.custom_section.items.map((item, index) => (
                                <div key={index}>
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-xs opacity-70">{item.description}</p>
                                    <div className="h-0.5 w-12 bg-white/50 mt-2"></div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </aside>
        </div>
    );
};

export default RightSidebarTemaplate;