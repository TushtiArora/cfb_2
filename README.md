# Deployment link - https://cfb-2.onrender.com/

# 🚀 OpenPR - Open Source Community Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green.svg)](https://supabase.com/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [Deployment](#-deployment)
- [License](#-license)
- [Support](#-support)

---

## 🌟 Overview

**OpenPR** is a revolutionary platform that transforms open source contribution from intimidating to inspiring. We combine AI-powered project matching, real-time mentorship, and community-driven collaboration tools to make open source accessible for everyone.

### 🎯 Mission
To bridge the gap between aspiring contributors and open source projects by providing intelligent matching, mentorship, and a supportive community ecosystem.

---

## ✨ Features

### 🤖 **AI-Powered Project Matching**
- Personalized project recommendations based on skills and interests
- Smart difficulty assessment and contributor matching
- Intelligent issue filtering and categorization

### 👥 **Real-Time Mentorship**
- Connect with experienced contributors and maintainers
- Live chat support and guidance
- Code review assistance and pair programming sessions

### 🏆 **Gamified Experience**
- Achievement system with badges and progress tracking
- Contribution leaderboards and statistics
- Milestone celebrations and community recognition

### 📊 **Comprehensive Dashboard**
- Personal profile management
- Notes and project bookmarking
- Activity tracking and contribution history
- Quick navigation to key features

### 💬 **Interactive Chatbot**
- AI-powered project recommendations
- Real-time assistance and guidance
- Context-aware responses based on user preferences

### 🎉 **Community Features**
- Fun rating corner for user feedback
- Social interactions and networking
- Mentor-contributor matching system

---

## 🛠 Tech Stack

### **Frontend**
- **React 18.3.1** - Modern UI library with hooks and context
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful, customizable icons
- **Recharts** - Responsive chart library

### **Backend & Database**
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Robust relational database
- **Row Level Security (RLS)** - Fine-grained access control
- **Edge Functions** - Serverless backend logic

### **State Management & Data Fetching**
- **TanStack React Query** - Powerful data synchronization
- **React Context API** - Global state management
- **Custom Hooks** - Reusable stateful logic

### **Development Tools**
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control system

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/openpr.git

# Navigate to project directory
cd openpr

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📦 Installation

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/openpr.git
cd openpr
```

### 2. **Install Dependencies**
```bash
# Using npm
npm install

# Using yarn
yarn install
```

---

## ⚙️ Environment Setup

### 1. **Create Environment File**
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Additional API Keys
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 2. **Supabase Configuration**
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Update the environment variables accordingly

---

## 🗄️ Database Setup

### **Schema Overview**
The application uses the following main tables:

- **`profiles`** - User profile information
- **`projects`** - Open source project listings
- **`contributions`** - User contribution tracking
- **`activities`** - User activity feed
- **`bookmarks`** - Saved projects
- **`badges`** - Achievement system
- **`user_badges`** - User-earned badges
- **`user_roles`** - Role-based access control

### **Row Level Security (RLS)**
All tables implement RLS policies to ensure:
- Users can only access their own data
- Public data is accessible to all authenticated users
- Admin operations are properly restricted

---

## 🏃‍♂️ Running the Application

### **Development Mode**
```bash
npm run dev
```
Opens the application at `http://localhost:5173`

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

### **Linting**
```bash
npm run lint
```

---

## 📁 Project Structure

```
openpr/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── dashboards/    # Dashboard-specific components
│   │   └── ...
│   ├── contexts/          # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── integrations/      # External service integrations
│   │   └── supabase/      # Supabase client and types
│   ├── lib/               # Utility functions
│   ├── pages/             # Route components
│   └── main.tsx           # Application entry point
├── supabase/              # Supabase configuration
│   ├── config.toml        # Project configuration
│   └── migrations/        # Database migrations
└── ...config files
```

### **Key Directories Explained**

- **`components/`** - Modular, reusable React components
- **`contexts/`** - Global state management with React Context
- **`hooks/`** - Custom hooks for data fetching and state logic
- **`integrations/`** - External API integrations and configurations
- **`pages/`** - Top-level route components
- **`supabase/`** - Backend configuration and database migrations

---

## 📚 API Documentation

### **Authentication**
```typescript
// Sign up new user
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})

// Sign in existing user
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})
```

### **Profile Management**
```typescript
// Get user profile
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()

// Update profile
const { data, error } = await supabase
  .from('profiles')
  .update({ full_name: 'New Name' })
  .eq('id', userId)
```

### **Project Operations**
```typescript
// Fetch projects
const { data: projects } = await supabase
  .from('projects')
  .select('*')
  .eq('status', 'active')

// Bookmark project
const { error } = await supabase
  .from('bookmarks')
  .insert({ project_id: projectId, user_id: userId })
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### **Contribution Guidelines**
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### **Code Style**
- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Implement proper error handling
- Write self-documenting code with clear variable names

---

## 🚀 Deployment

### **Supabase Integration**
The application is designed to work seamlessly with Supabase:

1. **Database**: Automatically managed PostgreSQL with RLS
2. **Authentication**: Built-in user management
3. **Storage**: File upload and management
4. **Edge Functions**: Serverless backend logic

### **Hosting Options**
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Custom server deployment**

### **Environment Variables for Production**
Ensure all environment variables are properly set in your hosting platform:
```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 OpenPR

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🆘 Support

### **Getting Help**
- 📖 **Documentation**: [docs.openpr.dev](https://docs.openpr.dev)
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/openpr)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/openpr/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/openpr/discussions)

### **Frequently Asked Questions**

**Q: How do I reset my password?**
A: Use the "Forgot Password" link on the login page or contact support.

**Q: How can I become a mentor?**
A: Visit the Mentors page and fill out the mentor application form.

**Q: Can I contribute to private repositories?**
A: Currently, OpenPR focuses on public open source projects.

---

## 🎯 Roadmap

### **Coming Soon**
- [ ] Mobile application
- [ ] Advanced AI project matching
- [ ] Integration with more version control systems
- [ ] Enhanced mentorship features
- [ ] Real-time collaboration tools

### **Future Enhancements**
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Custom project templates
- [ ] Automated contribution tracking
- [ ] Enterprise features

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Supabase Team** - For the incredible backend platform
- **shadcn** - For the beautiful UI component library
- **Tailwind CSS Team** - For the utility-first CSS framework
- **Open Source Community** - For inspiration and collaboration

---

</div>
