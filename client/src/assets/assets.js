import dummy_profile from './dummy_profile.png'

export const dummyResumeData = [
    {
        // ----------------------------------------------------- Resume 1 (Alex) ------------------------------------------------------
        personal_info: {
            full_name: "Alex Smith",
            email: "alex@example.com",
            phone: "0 123456789",
            location: "NY, USA",
            linkedin: "https://www.linkedin.com/in/alexsmith",
            website: "https://www.alexsmith.dev",
            profession: "Full Stack Developer",
            image: dummy_profile
        },
        title: "Alex's Resume",
        public: true,
        professional_summary: "Highly analytical Data Analyst with 6 years of experience transforming complex datasets into actionable insights using SQL, Python, and advanced visualization tools.",
        skills: ["JavaScript", "React JS", "Full Stack Development", "Git", "GitHub", "NextJS", "Express", "NodeJS", "TypeScript"],
        
        certifications: [
            {
                name: "AWS Certified Developer - Associate",
                issuer: "Amazon Web Services",
                date: "2023-08-15",
                link: "https://aws.amazon.com/certification/"
            },
            {
                name: "Meta Front-End Developer Professional Certificate",
                issuer: "Coursera",
                date: "2022-11-20",
                link: "https://www.coursera.org/"
            }
        ],

        custom_section: {
            title: "Languages",
            items: [
                { name: "English", description: "Native / Bilingual Proficiency" },
                { name: "Spanish", description: "Professional Working Proficiency" }
            ]
        },

        experience: [
            {
                company: "Example Technologies.",
                position: "Senior Full Stack Developer",
                start_date: "2023-06",
                end_date: "Present",
                description: "Architected, developed, and deployed innovative full-stack applications at Example Technologies.\ncreating robust back-end systems and intuitive front- end interfaces to deliver meaningful digital experiences ",
                is_current: true
            },
            {
                company: "Example Technologies.",
                position: "Full Stack Developer",
                start_date: "2019-08",
                end_date: "2023-05",
                description: "Engineered and deployed scalable full-stack web applications for Example Technologies, translating complex requirements into robust front-end interfaces and efficient back-end services.",
                is_current: false
            }
        ],
        education: [
            {
                institution: "Example Institute of Technology",
                degree: "B.TECH",
                field: "CSE",
                graduation_date: "2023-05",
                gpa: "8.7"
            },
            {
                institution: "Example Public School",
                degree: "HIGHER SECONDARY",
                field: "PCM",
                graduation_date: "2019-03",
                gpa: ""
            },
            {
                institution: "Example Academy",
                degree: "SECONDARY SCHOOL",
                field: "",
                graduation_date: "2017-03",
                gpa: ""
            }
        ],
        template: "minimal-image",
        accent_color: "#14B8A6",
        project: [
            {
                name: "Team Task Management System",
                type: "Web Application",
                description: "TaskTrackr is a collaborative task management system designed for teams to create, assign, track, and manage tasks in real time.",
                link: "https://github.com/alex/tasktrackr"
            },
            {
                name: "EduHub - Online Learning Platform",
                type: "EdTech Platform",
                description: "EduHub is an online learning platform where instructors can create courses with video lessons, quizzes, and downloadable resources.",
                link: "https://eduhub.example.com"
            }
        ]
    },
    {
        // ----------------------------------------------------- Resume 2 (Jordan) ------------------------------------------------------
        personal_info: {
            full_name: "Jordan Lee",
            email: "jordan.lee@example.com",
            phone: "0 987654321",
            location: "San Francisco, CA, USA",
            linkedin: "https://www.linkedin.com/in/jordanlee",
            website: "https://www.jordanlee.dev",
            profession: "Frontend Engineer",
            image: dummy_profile
        },
        title: "Jordan's Resume",
        public: true,
        professional_summary: "Creative and detail-oriented Frontend Engineer with 5+ years of experience crafting responsive, user-centric web applications using React, Vue, and modern CSS frameworks.",
        skills: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "SASS", "Tailwind CSS", "Figma", "Web Accessibility", "REST APIs"],
        
        certifications: [
            {
                name: "Google UX Design Professional Certificate",
                issuer: "Coursera",
                date: "2021-05-10",
                link: "https://coursera.org/"
            }
        ],

        custom_section: {
            title: "Awards",
            items: [
                { name: "Employee of the Month", description: "TechSpark Inc. - March 2023" },
                { name: "Best UI Design", description: "Global Hackathon 2020" }
            ]
        },

        experience: [
            {
                company: "TechSpark Inc.",
                position: "Lead Frontend Engineer",
                start_date: "2022-02",
                end_date: "Present",
                description: "Leading a team of frontend developers to build accessible and scalable user interfaces. Collaborated with UX teams to implement design systems and improve frontend performance.",
                is_current: true
            },
            {
                company: "PixelForge Labs",
                position: "Frontend Developer",
                start_date: "2018-09",
                end_date: "2022-01",
                description: "Developed reusable UI components using React and Vue.js. Worked closely with backend teams to integrate REST APIs and optimize SPA performance.",
                is_current: false
            }
        ],
        education: [
            {
                institution: "University of Digital Arts",
                degree: "B.Sc.",
                field: "Computer Science",
                graduation_date: "2018-06",
                gpa: "3.8"
            }
        ],
        template: "minimal-image",
        accent_color: "#6366F1",
        project: [
            {
                name: "FitTrack - Fitness Dashboard",
                type: "Health & Fitness",
                description: "FitTrack is a fitness analytics dashboard that allows users to log workouts, track progress, and visualize performance through interactive charts.",
                link: "https://fittrack.demo.com"
            },
            {
                name: "ShopEase - E-commerce UI Kit",
                type: "Frontend UI Kit",
                description: "ShopEase is a modular e-commerce frontend template with ready-to-use components for product listing, cart management, and responsive navigation.",
                link: "https://shopease.ui"
            }
        ]
    }
]