# 📄 Professional AI Resume Builder

A **high-performance, interactive web application** that allows users to create, customize, and export professional resumes in real-time. The platform features a **live A4 preview engine**, a library of **8 professionally designed templates**, and an intuitive **step-by-step resume editing workflow**.

---

## 🚀 Key Features

* **8 Professional Resume Templates**
  Includes Executive, Creative Grid, Technical, Minimalist, and more — tailored for different career paths.

* **Live A4 Preview Engine**
  Custom-built renderer that perfectly simulates a real A4 page. What you see is exactly what you export.

* **Template Gallery Modal**
  Preview your *actual resume data* across all templates before switching layouts.

* **Intelligent PDF Export**
  Optimized Print-to-PDF system using CSS print media queries for pixel-perfect A4 dimensions and color accuracy.

* **Auto-Fill with Sample Data**
  Instantly populate the builder with professional dummy data for quick onboarding.

* **Smart Resume Dashboard**
  Manage multiple resumes, rename titles.

* **Custom Accent Colors**
  Global theme color picker to brand your resume dynamically.

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **Tailwind CSS**
* **Redux Toolkit** (State Management)
* **Lucide React** (Icons)
* **Axios** (API Communication)
* **React Hot Toast** (Notifications)
* **Styled-components** (Print & PDF styling)

### Backend

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose**
* **JWT Authentication**
* **ImageKit** (Profile image uploads)
* **MVC Architecture**

### AI Integration

* **Google Gemini API (OpenAI-compatible endpoint)**
  Used for resume content suggestions and AI-assisted enhancements.

---

## 🎨 Available Resume Templates

| Template Name     | Focus / Style                | Best For                       |
| ----------------- | ---------------------------- | ------------------------------ |
| The Classic       | Traditional, clean           | Academic, Govt, Entry-level    |
| Executive Sidebar | Two-column, premium          | Senior Management, Tech Leads  |
| Creative Grid     | Bold, magazine-style         | Designers, Marketing           |
| Technical Pro     | Skill bars, structured       | Software Engineers, IT         |
| Bold Minimal      | High-contrast, authoritative | Law, Banking, Finance          |
| Modern Edge       | Balanced, modern             | Sales, Mid-level Professionals |
| (More…)           | Custom layouts               | Various industries             |

The backend follows a **clean MVC (Model–View–Controller)** architecture for scalability and maintainability.


## 🖼️ Image Uploads

* Profile images are uploaded using **ImageKit**
* Secure upload handled via backend service layer
* Optimized delivery with CDN support

---

## 🔐 Environment Variables (Example)

Create a `.env` file in your backend root directory:

```env
# Server
PORT=5000

# Database
MONGODB_URI=mongodb://127.0.0.1:27017/resume_builder

# Authentication
JWT_SECRET=your_jwt_secret_here

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# AI (Gemini / OpenAI-compatible)
OPENAI_API_KEY=your_api_key_here
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPENAI_MODEL=gemini-2.5-flash
```

⚠️ **Never commit real secrets to GitHub.** Use placeholders only.

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mannrandhawa004/ai-resume-builder
cd resume-builder
```

### 2️⃣ Install Dependencies

```bash
cd client 
npm install

cd server
npm innstall
```

### 3️⃣ Configure API

* Update `src/configs/api.js` with your backend base URL
* Create a `.env` file for backend configuration

### 4️⃣ Run Development Server

```bash
npm run dev
```

---

## 🖨️ PDF Export Instructions

For best export quality:

1. Click **Export / Download PDF**
2. Destination → **Save as PDF**
3. Margins → **None**
4. Enable **Background Graphics**

This ensures perfect A4 layout and accent color rendering.

---

## 🤝 Contribution

Contributions are welcome 🎉

* Add new resume templates
* Improve UI/UX
* Enhance AI suggestions

Fork the repository and open a **Pull Request**.

---

## 📜 License

MIT License © 2026 Manpreet Singh

---