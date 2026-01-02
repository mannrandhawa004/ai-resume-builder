import React from "react";

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
        <div className="max-w-4xl mx-auto bg-white p-12 text-slate-900 min-h-[1056px]">
            {/* Header */}
            <header className="border-b-4 border-slate-900 pb-6 mb-8">
                <h1 className="text-5xl font-serif font-bold tracking-tight mb-2">
                    {data.personal_info?.full_name || "Name"}
                </h1>
                <div className="flex flex-wrap justify-between items-center text-sm font-bold uppercase tracking-widest text-slate-600">
                    <span>{data.personal_info?.profession}</span>
                    <div className="flex gap-4">
                        <span>{data.personal_info?.email}</span>
                        <span>{data.personal_info?.phone}</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-10">
                {/* Left side: Content */}
                <div className="col-span-8 space-y-8">
                    <section>
                        <h2 className="text-sm font-black uppercase mb-4 py-1 border-b-2" style={{ borderColor: accentColor }}>Profile</h2>
                        <p className="text-slate-700 leading-relaxed">{data.professional_summary}</p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase mb-4 py-1 border-b-2" style={{ borderColor: accentColor }}>Experience</h2>
                        {data.experience?.map((exp, i) => (
                            <div key={i} className="mb-6">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-lg">{exp.position}</h3>
                                    <span className="text-sm font-medium italic">{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                </div>
                                <p className="font-bold text-slate-500 mb-2">{exp.company}</p>
                                <p className="text-sm text-slate-600 whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                </div>

                {/* Right side: Sidebar */}
                <div className="col-span-4 space-y-8">
                    <section>
                        <h2 className="text-sm font-black uppercase mb-4 py-1 border-b-2" style={{ borderColor: accentColor }}>Education</h2>
                        {data.education?.map((edu, i) => (
                            <div key={i} className="mb-4 text-sm">
                                <p className="font-bold">{edu.degree}</p>
                                <p>{edu.institution}</p>
                                <p className="text-slate-400 font-medium">{formatDate(edu.graduation_date)}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-sm font-black uppercase mb-4 py-1 border-b-2" style={{ borderColor: accentColor }}>Skills</h2>
                        <div className="flex flex-col gap-2">
                            {data.skills?.map((skill, i) => (
                                <span key={i} className="text-sm font-bold px-2 py-1 bg-slate-100 rounded text-slate-700">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BoldMinimalTemplate;