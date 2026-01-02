import { Mail, Phone, MapPin } from "lucide-react";

const CreativeGridTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-slate-800 shadow-lg min-h-[1056px] border-t-[16px]" style={{ borderColor: accentColor }}>
            <div className="p-12">
                {/* Header Section */}
                <header className="flex justify-between items-start mb-12">
                    <div className="max-w-[60%]">
                        <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-none">
                            {data.personal_info?.full_name?.toUpperCase() || "YOUR NAME"}
                        </h1>
                        <p className="text-xl font-bold mt-4 tracking-widest uppercase" style={{ color: accentColor }}>
                            {data.personal_info?.profession || "Profession"}
                        </p>
                    </div>
                    <div className="text-right space-y-1 text-sm font-medium text-slate-500">
                        {data.personal_info?.email && <p>{data.personal_info.email}</p>}
                        {data.personal_info?.phone && <p>{data.personal_info.phone}</p>}
                        {data.personal_info?.location && <p>{data.personal_info.location}</p>}
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-12">
                    {/* Main Column */}
                    <div className="col-span-8 space-y-10">
                        {data.professional_summary && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-4">About Me</h2>
                                <p className="text-slate-600 leading-relaxed text-lg font-light">
                                    {data.professional_summary}
                                </p>
                            </section>
                        )}

                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-6">Experience</h2>
                                <div className="space-y-8">
                                    {data.experience.map((exp, i) => (
                                        <div key={i} className="relative">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                                                <span className="text-xs font-bold text-slate-400">
                                                    {formatDate(exp.start_date)} — {exp.is_current ? "PRESENT" : formatDate(exp.end_date)}
                                                </span>
                                            </div>
                                            <p className="font-bold mb-3" style={{ color: accentColor }}>{exp.company}</p>
                                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <div className="col-span-4 space-y-10">
                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-4">Core Skills</h2>
                                <div className="flex flex-col gap-3">
                                    {data.skills.map((skill, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="h-1 w-4 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                            <span className="text-sm font-bold text-slate-700">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.education && data.education.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-4">Education</h2>
                                <div className="space-y-6">
                                    {data.education.map((edu, i) => (
                                        <div key={i}>
                                            <p className="text-sm font-black text-slate-900 uppercase leading-tight">{edu.degree}</p>
                                            <p className="text-xs font-bold text-slate-500 mt-1">{edu.institution}</p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-1">{formatDate(edu.graduation_date)}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeGridTemplate;