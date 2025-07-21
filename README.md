# Task Wiser - Eisenhower Matrix App

A modern, responsive web application for managing tasks using the Eisenhower Matrix method. Built with Next.js, TypeScript, and React.

## About This App

### The Problem
In today's fast-paced world, we often find ourselves overwhelmed with countless tasks and responsibilities. The challenge isn't just about getting things done—it's about getting the *right* things done at the *right* time. Without a proper prioritization system, we tend to:
- Focus on urgent tasks that may not be important
- Neglect important tasks until they become urgent
- Waste time on tasks that neither matter nor are time-sensitive
- Feel constantly busy but rarely productive

### The Solution: Eisenhower Matrix
This app implements the Eisenhower Matrix, a powerful time management and prioritization framework developed by Dwight D. Eisenhower. The matrix helps you categorize tasks based on two key dimensions:

- **Importance**: Does this task contribute to your long-term goals?
- **Urgency**: Does this task require immediate attention?

By organizing tasks into four quadrants, you can make better decisions about what to do, when to do it, and what to eliminate.

## Features

### 🎯 **Eisenhower Matrix Organization**
- **Do First** (Urgent & Important): Tasks that need immediate attention
- **Schedule** (Not Urgent & Important): Important tasks to plan for later
- **Delegate** (Urgent & Not Important): Tasks that can be delegated
- **Eliminate** (Not Urgent & Not Important): Tasks to avoid or eliminate

### 🏷️ **Smart Tag System**
- **Custom Tags**: Create and manage your own tags for better organization
- **Automatic Cleanup**: Unused tags are automatically removed
- **Case-Insensitive**: All tags are normalized to prevent duplicates
- **Default Tags**: Pre-configured work, personal, and others tags

### 🔍 **Advanced Search & Filtering**
- **Text Search**: Find tasks by title and description
- **Tag Filtering**: Filter tasks by multiple tags
- **Smart Suggestions**: Get search suggestions based on your tasks
- **Real-time Results**: Instant search results as you type

### 📊 **Task Management**
- **Create & Edit**: Add new tasks with detailed information
- **Status Tracking**: Track task progress (Created, In Progress, WIP, Done)
- **Deadline Management**: Set and track task deadlines
- **Time Estimates**: Plan how long tasks will take
- **Bulk Operations**: Delete and manage multiple tasks efficiently

### 📱 **Responsive Design**
- **Mobile-First**: Works seamlessly on all devices
- **Modern UI**: Clean, intuitive interface
- **Accessibility**: Designed with accessibility in mind
- **Cross-Browser**: Compatible with all modern browsers

### 💾 **Data Persistence**
- **Local Storage**: All data is stored locally in your browser
- **Privacy-First**: No data is sent to external servers
- **Automatic Saving**: Changes are saved automatically
- **Offline Capable**: Works without internet connection

## Tech Details

### **Technology Stack**
- **Frontend Framework**: [Next.js 15.3.5](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe JavaScript
- **UI Library**: [React 19](https://react.dev/) - User interface library
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Development**: [ESLint](https://eslint.org/) - Code linting and formatting

### **Key Features**
- **Server-Side Rendering (SSR)**: Optimized for performance and SEO
- **Type Safety**: Full TypeScript implementation for better development experience
- **Component Architecture**: Atomic design pattern with reusable components
- **State Management**: React hooks for efficient state management
- **Local Storage**: Client-side data persistence with error handling

### **Architecture**
```
src/
├── components/
│   ├── atoms/          # Basic UI components (Button, Input, etc.)
│   ├── molecules/      # Compound components (TaskCard, SearchBar, etc.)
│   └── organisms/      # Complex components (MatrixBoard, Overview, etc.)
├── lib/                # Utility functions and business logic
├── pages/              # Next.js pages and routing
└── styles/             # Global styles and CSS
```

## Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/premkpavuluri/daily-checklist.git
   cd daily-checklist
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
```

## Production

### **Live Demo**
🌐 **Production URL**: [https://task-wiser.onrender.com/](https://task-wiser.onrender.com/)

### **Repository**
📦 **GitHub Repository**: [https://github.com/premkpavuluri/daily-checklist.git](https://github.com/premkpavuluri/daily-checklist.git)

### **Deployment**
The app is deployed on [Render](https://render.com/) and automatically updates when changes are pushed to the main branch.

## Browser Compatibility

- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

**Note**: The app requires localStorage support. Some older browsers or restricted environments may have limited functionality.

## Data Storage

All data is stored locally in your browser using localStorage:
- **Tasks**: `eisenhower-tasks`
- **Custom Tags**: `eisenhower-custom-tags`

Data is not synced to any external servers and remains private to your device.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [React Documentation](https://react.dev/) - learn about React
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - learn about TypeScript
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS

---

**Built with ❤️ using Next.js, React, and TypeScript**
