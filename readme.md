📄 Professional AI Resume BuilderA high-performance, interactive web application that allows users to create, customize, and export professional resumes in real-time. Featuring a live A4 preview engine, a library of 8 distinct templates, and an intuitive step-by-step editing interface.🚀 Key Features8 Professional Templates: Choose from a variety of layouts including Executive, Creative Grid, Technical, and Minimalist designs.Live A4 Preview: A custom-built rendering engine that simulates a real A4 page, ensuring what you see is exactly what you get.Template Gallery: High-fidelity modal gallery that previews your actual data across all available layouts before you switch.Intelligent Export: Optimized Print-to-PDF engine with CSS media queries that force perfect A4 dimensions and color accuracy.Auto-Fill Functionality: Instant onboarding by filling the form with professional sample data.Smart Dashboard: Manage multiple resumes, edit titles, and track "Public" vs. "Draft" status.Custom Accent Colors: Brand your resume with a dynamic color picker that updates themes globally.🛠️ Technical StackFrontend: React.js, Tailwind CSSState Management: Redux ToolkitIcons: Lucide ReactAPI/Backend: Axios (Connecting to a Node.js/Express REST API)Notifications: React Hot ToastStyling: Styled-components (for print media queries) and Tailwind utility classes.

📂 Project StructurePlaintext
src/
├── components/
│   ├── templates/            # 8 Unique Resume Layouts
│   ├── ResumePreview.jsx     # Live A4 Rendering Engine
│   ├── TemplateGalleryModal.jsx # Visual Layout Discovery
│   └── ...                   # Modular Form Components (Education, Experience, etc.)
├── pages/
│   ├── ResumeBuilder.jsx     # Main Workspace & State Coordinator
│   └── Dashboard.jsx         # User Resume Management
├── assets/
│   └── assets.js             # Dummy Profiles & Sample Data
└── configs/
    └── api.js                # Axios Instance Configuration
🎨 Available TemplatesTemplateFocusBest ForThe ClassicTraditionalAcademic, Gov, Entry-levelExecutive SidebarTwo-column, High-endSenior Management, Tech LeadsCreative GridBold, Magazine-styleDesigners, Marketing, TechTechnical ProSkill/Progress barsSoftware Engineers, IT SpecialistsBold MinimalAuthoritative, High-contrastLaw, Banking, FinanceModern EdgeBalanced, CleanSales, Mid-level Professional📥 Installation & SetupClone the repositoryBashgit clone https://github.com/mannrandhawa004/ai-resume-builder
cd resume-builder
Install dependenciesBashnpm install
Configure APICreate a .env file or update src/configs/api.js with your backend URL.Start the development serverBashnpm run dev
🖨️ PDF Export InstructionsTo get the best result when exporting:Click the Export or Download PDF button.In the Print Dialog, set Destination to "Save as PDF".Under More Settings, ensure Margins are set to "None".Ensure Background Graphics is checked to display your accent colors and sidebars.🤝 ContributionContributions are welcome! If you have a new template design or a feature request, feel free to fork the repo and open a Pull Request.Would you like me to add a "License" section or a "Screenshots" placeholder section to this file?