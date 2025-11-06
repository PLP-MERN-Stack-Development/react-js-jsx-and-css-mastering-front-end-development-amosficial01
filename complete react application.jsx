import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';

// =========================================================================
// 1. CONTEXT (THEME)
// Manages light/dark mode persistence
// =========================================================================

// 1.1. Create the Context
const ThemeContext = createContext();

// 1.2. Custom Hook to use the theme context
const useTheme = () => useContext(ThemeContext);

// 1.3. Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Effect to apply the 'dark' class to the <html> tag
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle function
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const contextValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};


// =========================================================================
// 2. HOOKS
// =========================================================================

/**
 * Custom hook to manage state that persists in localStorage.
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key “' + key + '”:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage key “' + key + '”:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}


// =========================================================================
// 3. COMPONENTS
// =========================================================================

/**
 * Reusable Button Component with variant styling.
 */
const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseClasses = 'font-semibold py-2 px-4 rounded transition duration-200 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-center';

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800',
  };

  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      className={finalClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Reusable Card Component for consistent UI containers.
 */
const Card = ({ children, className = '' }) => {
  const cardClasses = 'bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 transition duration-300';

  return (
    <div className={`${cardClasses} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Theme Switcher Component (uses ThemeContext).
 */
const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-white bg-blue-700 dark:bg-gray-700 hover:bg-blue-800 dark:hover:bg-gray-600 transition duration-300 flex items-center space-x-2 shadow-lg"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Dynamic Icon/Emoji based on current theme */}
      {theme === 'light' ? (
        <span role="img" aria-label="Moon">🌙 Dark</span>
      ) : (
        <span role="img" aria-label="Sun">☀️ Light</span>
      )}
    </button>
  );
};

/**
 * Navigation Bar Component
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/tasks', label: 'Task Manager' },
    { to: '/api-data', label: 'API Data' },
  ];

  const linkClasses = 'hover:bg-blue-700 px-3 py-2 rounded-md transition duration-200';
  const activeLinkClasses = 'bg-blue-700 font-bold'; // Highlight active link

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 shadow-lg sticky top-0 z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="text-white text-2xl font-bold tracking-wider">
            React App 🚀
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-white hover:text-gray-100 ${linkClasses} ${location.pathname === link.to ? activeLinkClasses : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Controls (Theme Switcher) and Mobile Button */}
          <div className="flex items-center">
            <ThemeSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-3 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 transition duration-150 md:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {/* Icon logic */}
              {isOpen ? (
                // Close Icon (X)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                // Menu Icon (Hamburger)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-blue-500/50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`text-white block ${linkClasses} ${location.pathname === link.to ? activeLinkClasses : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

/**
 * Footer Component
 */
const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white text-center py-4 mt-12 shadow-inner transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} React, JSX, & Tailwind Application.
        </p>
        <div className="flex justify-center space-x-4 mt-2 text-xs">
          <a href="#" className="hover:text-blue-400">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};


// =========================================================================
// 4. PAGES
// =========================================================================

/**
 * Simple Home Page component to welcome the user and guide them.
 */
const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <Card className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
          Welcome to the React & Tailwind Demo
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          This application demonstrates fundamental frontend concepts using React Hooks, Context API for theming, and **persistent state management** for the Task Manager, all styled beautifully with Tailwind CSS.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link to="/tasks">
            <Button variant="primary" className="w-full sm:w-auto">
              Go to Task Manager 📋
            </Button>
          </Link>
          <Link to="/api-data">
            <Button variant="secondary" className="w-full sm:w-auto">
              View API Data 🌐
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

/**
 * Task Manager Page Component
 * Implements Add, Delete, Toggle, and Filter functionality using the useLocalStorage hook.
 */
const TaskManagerPage = () => {
  // useLocalStorage ensures the tasks array persists across browser sessions
  const [tasks, setTasks] = useLocalStorage('taskManagerTasks', []);

  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('All');

  const addTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Efficiently calculated filtered tasks
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'Active':
        return tasks.filter(task => !task.completed);
      case 'Completed':
        return tasks.filter(task => task.completed);
      case 'All':
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold text-center pt-4 text-blue-600 dark:text-blue-400">
        Task Manager 📋
      </h1>

      {/* 1. Task Input Card */}
      <Card className="p-4 shadow-xl">
        <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!newTaskText.trim()} // Disable button if input is empty
          >
            Add Task
          </Button>
        </form>
      </Card>

      {/* 2. Task Controls (Filter) Card */}
      <Card className="p-4 flex flex-wrap justify-between items-center gap-3">
        <p className="text-lg font-medium">
          {tasks.filter(task => !task.completed).length} active task(s) remaining.
        </p>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {['All', 'Active', 'Completed'].map((filterName) => (
            <Button
              key={filterName}
              variant={filter === filterName ? 'primary' : 'secondary'}
              onClick={() => setFilter(filterName)}
              className="px-3 py-1 text-sm shadow-none"
            >
              {filterName}
            </Button>
          ))}
        </div>
      </Card>

      {/* 3. Task List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              className="flex items-center justify-between p-4 transition duration-300 hover:shadow-2xl border-l-4"
              style={{ borderColor: task.completed ? '#10B981' : '#3B82F6' }}
            >
              <div
                className={`flex-grow cursor-pointer pr-4 text-lg ${task.completed ? 'line-through text-gray-500 dark:text-gray-400 italic' : 'font-medium'}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.text}
              </div>

              <div className="flex space-x-2">
                {/* Toggle Button */}
                <Button
                  variant={task.completed ? 'secondary' : 'primary'}
                  onClick={() => toggleTask(task.id)}
                  className="p-1 w-8 h-8 flex items-center justify-center text-xl"
                  title={task.completed ? 'Mark Active' : 'Mark Complete'}
                >
                  {task.completed ? '↩️' : '✅'}
                </Button>

                {/* Delete Button */}
                <Button
                  variant="danger"
                  onClick={() => deleteTask(task.id)}
                  className="p-1 w-8 h-8 flex items-center justify-center text-xl"
                  title="Delete Task"
                >
                  🗑️
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center p-10 text-xl italic text-gray-500 dark:text-gray-400 border border-dashed rounded-lg">
            {tasks.length === 0
                ? "🎉 You have no tasks yet! Add your first one above."
                : `No ${filter.toLowerCase()} tasks found. Change the filter to view others.`}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Placeholder Page for API Data Fetching
 */
const APIDataPage = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl font-extrabold text-center pt-4 text-green-600 dark:text-green-400">
        🌐 API Data Fetcher
      </h1>
      <Card className="p-6 text-center">
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
          This page is ready! You can add logic here to fetch and display data from an external API.
        </p>
        <p className="italic text-sm text-gray-500 dark:text-gray-400">
          (e.g., using `fetch` or `axios` inside a `useEffect` hook.)
        </p>
        <Button 
          variant="secondary" 
          onClick={() => setMessage("API fetch simulated! Data would appear here.")}
          className="mt-4"
        >
          Simulate Fetch
        </Button>
        {message && <p className="mt-4 text-sm text-blue-500 dark:text-blue-300 font-medium">{message}</p>}
      </Card>
    </div>
  );
};


// =========================================================================
// 5. LAYOUT
// =========================================================================

/**
 * Main Layout Component (Container for Navbar, Page Content, and Footer).
 */
const MainLayout = () => {
  return (
    // The main container background should be set here, using transition for smooth theme change
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <Navbar />

      {/* Main content area */}
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* CRITICAL: This renders the current page content (Home, Tasks, API Data) */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};


// =========================================================================
// 6. MAIN APPLICATION
// =========================================================================

/**
 * Main App Component (Sets up Router and Routes).
 */
function App() {
  return (
    // BrowserRouter is the root of the routing system
    <BrowserRouter>
      {/* Routes define the mappings from path to component */}
      <Routes>
        {/* The main route uses MainLayout to provide persistent Navbar and Footer */}
        <Route path="/" element={<MainLayout />}>

          {/* Default Route (index) maps to the Home Page */}
          <Route index element={<HomePage />} />

          {/* Task Manager Route */}
          <Route path="tasks" element={<TaskManagerPage />} />

          {/* API Data Placeholder Route */}
          <Route path="api-data" element={<APIDataPage />} />

          {/* Catch-all Route for 404 */}
          <Route path="*" element={
            <div className="text-center p-20">
              <h2 className="text-5xl font-bold text-red-500 mb-4">404</h2>
              <p className="text-xl">Page not found.</p>
              <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Go Home</Link>
            </div>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Since the application needs the ThemeProvider, we export a wrapper function
// that includes both the provider and the main App component.
export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);