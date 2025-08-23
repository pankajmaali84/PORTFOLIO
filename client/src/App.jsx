import { Routes, Route, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Home from './pages/Home'
import Landing from './pages/Landing'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import { SparklesIcon, GithubIcon, LinkedinIcon, HomeIcon, UserIcon, FolderIcon, MailIcon } from './components/Icons'
import ScrollProgress from './components/ScrollProgress'
import CommandPalette from './components/CommandPalette'

function Navbar({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200 dark:bg-slate-900/70 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>
            <SparklesIcon className="w-5 h-5 text-primary" />
            <span>Pankaj Mali</span>
          </NavLink>
          <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
                  aria-label="Toggle menu" onClick={() => setIsOpen(v => !v)}>
            <span className="sr-only">Menu</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {isOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <NavLink to="/" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white" onClick={() => setIsOpen(false)}>
              <HomeIcon className="w-4 h-4" /> Home
            </NavLink>
            <NavLink to="/about" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white" onClick={() => setIsOpen(false)}>
              <UserIcon className="w-4 h-4" /> About
            </NavLink>
            <NavLink to="/skills" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white" onClick={() => setIsOpen(false)}>
              <SparklesIcon className="w-4 h-4" /> Skills
            </NavLink>
            <NavLink to="/projects" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white" onClick={() => setIsOpen(false)}>
              <FolderIcon className="w-4 h-4" /> Projects
            </NavLink>
            <NavLink to="/contact" className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white" onClick={() => setIsOpen(false)}>
              <MailIcon className="w-4 h-4" /> Contact
            </NavLink>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" title="GitHub">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" title="LinkedIn">
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href="/pankaj_mali_resume.pdf" download="pankaj_mali_resume.pdf" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" title="Download Resume">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v12m0 0l-4-4m4 4l4-4"/><path d="M4 21h16"/></svg>
              <span className="hidden lg:inline">Resume</span>
            </a>
            <NavLink to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-4 py-2 font-semibold hover:bg-primary-dark" onClick={() => setIsOpen(false)}>
              Hire Me
            </NavLink>
            <span className="ml-2 hidden xl:inline-flex items-center gap-1 rounded-full border border-emerald-300/60 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-500" /> Open to Remote · IST
            </span>
            <button
              onClick={onToggleTheme}
              className="ml-2 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
              title="Toggle light/dark"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364 6.364-1.414-1.414M8.05 8.05 6.636 6.636m10.728 0-1.414 1.414M8.05 15.95l-1.414 1.414" />
                </svg>
              )}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden py-3 flex flex-col gap-2 text-sm font-medium">
            <NavLink to="/" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsOpen(false)}>
              <HomeIcon className="w-4 h-4" /> Home
            </NavLink>
            <NavLink to="/about" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsOpen(false)}>
              <UserIcon className="w-4 h-4" /> About
            </NavLink>
            <NavLink to="/skills" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsOpen(false)}>
              <SparklesIcon className="w-4 h-4" /> Skills
            </NavLink>
            <NavLink to="/projects" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsOpen(false)}>
              <FolderIcon className="w-4 h-4" /> Projects
            </NavLink>
            <NavLink to="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsOpen(false)}>
              <MailIcon className="w-4 h-4" /> Contact
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
        <p className="text-center">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white" title="GitHub">
            <GithubIcon className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white" title="LinkedIn">
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

function PageTransition({ children }) {
  const el = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(el.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [])
  return <div ref={el}>{children}</div>
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') return stored
    } catch {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  const [cmdOpen, setCmdOpen] = useState(false)
  useEffect(() => {
    const onKey = (e) => {
      const isK = e.key?.toLowerCase() === 'k'
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault()
        setCmdOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="bg-white text-slate-900 min-h-screen dark:bg-slate-900 dark:text-slate-100">
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
          <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </main>
      <Footer />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onToggleTheme={toggleTheme} />
    </div>
  )
}
