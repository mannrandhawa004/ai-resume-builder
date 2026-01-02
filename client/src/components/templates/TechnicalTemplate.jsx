import React from "react";

const TechnicalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    return (
        <div className="max-w-4xl mx-auto bg-slate-50 min-h-[1056px] flex">
            {/* Dark Sidebar */}
            <aside className="w-80 bg-slate-900 text-white p-8">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold leading-tight mb-2">{data.personal_info?.full_name}</h1>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ color: accentColor }}>{data.personal_info?.profession}</p>
                </div>

                <div className="space-y-6 text-sm">
                    <section>
                        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3">Contact</h3>
                        <p className="mb-1 text-slate-300">{data.personal_info?.email}</p>
                        <p className="text-slate-300">{data.personal_info?.phone}</p>
                    </section>

                    <section>
                        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3">Skills</h3>
                        <div className="space-y-3">
                            {data.skills?.map((skill, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-[11px] mb-1">
                                        <span>{skill}</span>
                                    </div>
                                    <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full" style={{ width: '85%', backgroundColor: accentColor }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </aside>

            {/* Light Main Content */}
            <main className="flex-1 p-10 bg-white">
                <section className="mb-10">
                    <h2 className="text-lg font-bold border-l-4 pl-3 mb-4" style={{ borderColor: accentColor }}>Experience</h2>
                    <div className="space-y-6">
                        {data.experience?.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between font-bold">
                                    <h4>{exp.position}</h4>
                                    <span className="text-xs text-slate-400">{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                </div>
                                <p className="text-sm font-medium text-slate-500 mb-2">{exp.company}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-lg font-bold border-l-4 pl-3 mb-4" style={{ borderColor: accentColor }}>Education</h2>
                    {data.education?.map((edu, i) => (
                        <div key={i} className="mb-4">
                            <p className="font-bold text-sm">{edu.degree}</p>
                            <p className="text-sm text-slate-500">{edu.institution} | {formatDate(edu.graduation_date)}</p>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default TechnicalTemplate;