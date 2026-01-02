import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

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
        <div className="max-w-4xl mx-auto bg-white flex min-h-[1000px] shadow-sm">
            {/* Sidebar */}
            <aside className="w-1/3 text-white p-8" style={{ backgroundColor: accentColor }}>
                <div className="mb-8 text-center">
                    {data.personal_info?.image && (
                         <img 
                            src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)} 
                            alt="Profile" 
                            className="w-32 h-32 object-cover rounded-xl mx-auto mb-4 border-2 border-white/20" 
                        />
                    )}
                    <h1 className="text-2xl font-bold leading-tight">{data.personal_info?.full_name}</h1>
                    <p className="text-sm opacity-90 mt-1 uppercase tracking-widest">{data.personal_info?.profession}</p>
                </div>

                <div className="space-y-4 text-sm">
                    <h3 className="font-bold border-b border-white/20 pb-1 uppercase tracking-wider">Contact</h3>
                    {data.personal_info?.email && <div className="flex items-center gap-2"><Mail size={14}/><span>{data.personal_info.email}</span></div>}
                    {data.personal_info?.phone && <div className="flex items-center gap-2"><Phone size={14}/><span>{data.personal_info.phone}</span></div>}
                    {data.personal_info?.location && <div className="flex items-center gap-2"><MapPin size={14}/><span>{data.personal_info.location}</span></div>}
                </div>

                {data.skills?.length > 0 && (
                    <div className="mt-8">
                        <h3 className="font-bold border-b border-white/20 pb-1 uppercase tracking-wider mb-3">Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="bg-white/10 px-2 py-1 rounded text-xs">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="w-2/3 p-10 text-gray-800">
                {data.professional_summary && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase mb-2" style={{ color: accentColor }}>Profile</h2>
                        <p className="text-sm leading-relaxed text-gray-600">{data.professional_summary}</p>
                    </section>
                )}

                {data.experience?.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase mb-4" style={{ color: accentColor }}>Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between font-bold text-gray-900">
                                        <span>{exp.position}</span>
                                        <span className="text-sm text-gray-500 font-normal">{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                    </div>
                                    <p className="text-sm italic mb-2" style={{ color: accentColor }}>{exp.company}</p>
                                    <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.education?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase mb-4" style={{ color: accentColor }}>Education</h2>
                        {data.education.map((edu, i) => (
                            <div key={i} className="mb-3">
                                <p className="font-bold text-sm">{edu.degree} in {edu.field}</p>
                                <p className="text-sm text-gray-600">{edu.institution} | {formatDate(edu.graduation_date)}</p>
                            </div>
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
};

export default ExecutiveSidebarTemplate;