import React from 'react';
import { MapPin, Phone, Mail, Link as LinkIcon, Globe, Linkedin } from 'lucide-react';

const SpecialistTemplate = ({ data }) => {
    
    // Helper for date formatting
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        const date = new Date(year, month - 1);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
    };

    // Helper for diamond bullets
    const DiamondBullet = () => (
        <span className="inline-block w-1.5 h-1.5 bg-slate-800 rotate-45 mr-2 align-middle relative -top-0.5"></span>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white min-h-[1056px] p-12 text-slate-900 shadow-2xl">
            
            {/* --- HEADER --- */}
            <header className="flex justify-between items-start mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-bold font-sans tracking-tight text-slate-900">
                        {data.personal_info?.full_name || "Caleb Smith"}
                    </h1>
                    <p className="text-xl font-bold font-sans text-slate-800">
                        {data.personal_info?.profession || "Marketing Specialist"}
                    </p>
                </div>

                <div className="text-right text-sm font-serif leading-relaxed text-slate-700">
                    {data.personal_info?.location && (
                        <div className="flex items-center justify-end gap-2">
                             {data.personal_info.location} <MapPin size={12}/> 
                        </div>
                    )}
                    <div className="flex items-center justify-end gap-2">
                         {data.personal_info?.phone} {data.personal_info?.phone && <Phone size={12}/>}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                         <a href={`mailto:${data.personal_info?.email}`} className="hover:underline">
                            {data.personal_info?.email}
                         </a> {data.personal_info?.email && <Mail size={12}/>}
                    </div>
                    <div className="flex flex-col items-end gap-1 mt-1">
                        {data.personal_info?.linkedin && (
                            <a href={data.personal_info.linkedin} className="flex items-center gap-1 hover:text-blue-700">
                                LinkedIn <Linkedin size={12}/>
                            </a>
                        )}
                        {data.personal_info?.website && (
                            <a href={data.personal_info.website} className="flex items-center gap-1 hover:text-blue-700">
                                Portfolio <Globe size={12}/>
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {/* --- SUMMARY --- */}
            {data.professional_summary && (
                <section className="mb-10 font-serif text-sm leading-7 text-slate-800 text-justify">
                    <p>{data.professional_summary}</p>
                </section>
            )}

            {/* --- SKILLS (Technical Proficiencies) --- */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-lg font-bold font-sans uppercase tracking-wide text-slate-900 border-b-4 border-slate-900 pb-2 mb-4">
                        Technical Proficiencies
                    </h2>
                    <div className="font-serif text-sm text-slate-800">
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
                            {data.skills.map((skill, index) => (
                                <li key={index} className="flex items-center">
                                    <DiamondBullet />
                                    <span>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* --- EXPERIENCE --- */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-lg font-bold font-sans uppercase tracking-wide text-slate-900 border-b-4 border-slate-900 pb-2 mb-6">
                        Professional Experience
                    </h2>
                    <div className="space-y-8 font-serif">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                {/* Header Row */}
                                <div className="flex justify-between items-baseline text-slate-900 mb-1">
                                    <h3 className="font-bold text-base font-sans">
                                        {exp.company} {exp.location ? `, ${exp.location}` : ''}
                                    </h3>
                                    <span className="text-sm italic whitespace-nowrap">
                                        {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                
                                {/* Job Title */}
                                <div className="font-bold text-sm text-slate-800 mb-3 font-sans">
                                    {exp.position}
                                </div>

                                {/* Description */}
                                {exp.description && (
                                    <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
                                        {exp.description.split('\n').map((line, i) => (
                                            line.trim() && (
                                                <li key={i} className="flex items-start">
                                                    <span className="mt-1.5 mr-2.5 shrink-0"><DiamondBullet /></span>
                                                    <span>{line.replace(/^[•-]\s*/, '')}</span>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* --- PROJECTS --- */}
            {data.project && data.project.length > 0 && (
                 <section className="mb-10">
                    <h2 className="text-lg font-bold font-sans uppercase tracking-wide text-slate-900 border-b-4 border-slate-900 pb-2 mb-6">
                        Key Projects
                    </h2>
                    <div className="space-y-6 font-serif">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-base font-sans text-slate-900">
                                        {proj.name}
                                    </h3>
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-blue-700 hover:underline flex items-center gap-1 font-sans">
                                            <LinkIcon size={10} /> View Project
                                        </a>
                                    )}
                                </div>
                                <p className="text-sm leading-relaxed text-slate-700">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* --- EDUCATION --- */}
            {data.education && data.education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold font-sans uppercase tracking-wide text-slate-900 border-b-4 border-slate-900 pb-2 mb-6">
                        Education
                    </h2>
                    <div className="space-y-4 font-serif">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-base font-sans text-slate-900">
                                        {edu.institution}
                                    </h3>
                                    <p className="text-sm text-slate-800">
                                        {edu.degree} {edu.field ? `, ${edu.field}` : ''}
                                    </p>
                                </div>
                                <div className="text-sm italic text-slate-700 whitespace-nowrap">
                                    {formatDate(edu.graduation_date)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

             {/* --- CUSTOM SECTION --- */}
             {data.custom_section?.items?.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-lg font-bold font-sans uppercase tracking-wide text-slate-900 border-b-4 border-slate-900 pb-2 mb-4">
                        {data.custom_section.title || "Additional Information"}
                    </h2>
                    <div className="font-serif text-sm text-slate-800">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                            {data.custom_section.items.map((item, index) => (
                                <li key={index} className="flex flex-col mb-2">
                                    <span className="font-bold font-sans">{item.name}</span>
                                    <span className="text-slate-600">{item.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

        </div>
    );
};

export default SpecialistTemplate;