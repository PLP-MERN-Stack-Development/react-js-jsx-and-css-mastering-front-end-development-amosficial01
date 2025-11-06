# TaskFlow - React Task Manager & Blog Viewer

A modern, fully responsive React application built with Vite, TypeScript, and Tailwind CSS. Features a complete task management system with localStorage persistence and a blog viewer with API integration.

## 🚀 Features

### ✅ Task Manager
- **CRUD Operations**: Create, read, update, and delete tasks
- **Task Status**: Mark tasks as complete/incomplete
- **Smart Filtering**: View all tasks, active only, or completed only
- **Persistent Storage**: Tasks saved to localStorage
- **Real-time Stats**: Track total, active, and completed tasks
- **Inline Editing**: Edit tasks directly in the list

### 📝 Blog Viewer
- **API Integration**: Fetches posts from JSONPlaceholder API
- **Search Functionality**: Filter posts by title in real-time
- **Pagination**: Navigate through posts with page controls
- **Loading States**: Smooth loading indicators and error handling
- **Responsive Cards**: Clean, card-based post layout

### 🎨 Design Features
- **Light/Dark Mode**: Toggle between themes with persistent preference
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Modern UI**: Clean, professional interface with smooth transitions
- **Accessible**: Keyboard navigation and ARIA labels
- **Beautiful Animations**: Subtle hover effects and transitions

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── Navbar.tsx      # Navigation with theme toggle
│   ├── Footer.tsx      # Footer component
│   ├── Layout.tsx      # Layout wrapper
│   └── TaskManager.tsx # Task management component
├── pages/              # Route pages
│   ├── Tasks.tsx       # Task manager page
│   ├── Blog.tsx        # Blog posts page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts  # localStorage persistence hook
├── context/            # React Context providers
│   └── ThemeContext.tsx    # Theme management
├── api/                # API integration
│   └── posts.ts        # JSONPlaceholder API calls
└── utils/              # Utility functions
    └── cn.ts           # Class name utility
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality UI components
- **React Router** - Client-side routing
- **Lucide Icons** - Beautiful icon set
- **Sonner** - Toast notifications

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd <project-directory>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:8080`

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## 🎯 Usage Guide

### Task Manager
1. **Add Task**: Type in the input field and click "Add" or press Enter
2. **Complete Task**: Click the checkbox next to any task
3. **Edit Task**: Click the edit icon, modify the text, and save
4. **Delete Task**: Click the trash icon to remove a task
5. **Filter Tasks**: Use the "All", "Active", or "Completed" buttons

### Blog Viewer
1. **Search Posts**: Type in the search bar to filter by title
2. **Navigate Pages**: Use the pagination controls at the bottom
3. **View Posts**: Each card shows the post title and preview

### Theme Toggle
- Click the sun/moon icon in the navbar to switch themes
- Preference is automatically saved

## 🌐 API Integration

The blog uses the [JSONPlaceholder](https://jsonplaceholder.typicode.com) API:
- **Endpoint**: `/posts`
- **Method**: GET
- **Response**: Array of 100 blog posts

## 🎨 Customization

### Colors
Edit `src/index.css` to customize the color scheme:
```css
:root {
  --primary: 217 91% 60%;  /* Blue accent */
  --success: 142 71% 45%;  /* Green */
  --warning: 38 92% 50%;   /* Orange */
  --destructive: 0 84% 60%; /* Red */
}
```

### Components
All components support variants via Tailwind CSS. Check `tailwind.config.ts` for configuration.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### GitHub Pages
```bash
npm run build
# Deploy dist folder to gh-pages branch
```

## 📸 Screenshots

*Add screenshots of your application here*

## 🔗 Live Demo

[View Live Demo](#) *(Add your deployment link here)*

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as part of the PLP MERN Stack Development assignment.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Lucide](https://lucide.dev/) for icons
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for API
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Happy Coding! 🎉**
