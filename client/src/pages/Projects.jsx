import { useEffect, useState, useRef, useMemo } from 'react'
import axios from 'axios'
import { gsap } from 'gsap'
import { FolderIcon } from '../components/Icons'

export default function Projects() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'https://portfolio-pankaj-gfzo.onrender.com'
  })
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const root = useRef(null)

  useEffect(() => {
    api.get('/api/projects')
      .then(res => setProjects(res.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-head', { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' })
      gsap.fromTo('.project-card', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return projects
    return projects.filter(p => {
      const title = (p.title || '').toLowerCase()
      const desc = (p.description || '').toLowerCase()
      return title.includes(q) || desc.includes(q)
    })
  }, [projects, query])

  return (
    <section ref={root} className="py-16 md:py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <header className="page-head flex items-center gap-2 text-slate-500 dark:text-slate-300 text-sm">
          <FolderIcon className="w-4 h-4 text-primary" />
          <span>Projects</span>
        </header>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">Projects</h1>
        <div className="mt-4 flex items-center gap-2">
          <div className="relative w-full max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 21l-4.35-4.35" /><circle cx="11" cy="11" r="7" /></svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        </div>
        {loading ? (
          <p className="mt-6 text-slate-500 dark:text-slate-400">Loading projects...</p>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <article key={p._id || p.title} className="project-card group rounded-xl border border-slate-200 overflow-hidden bg-white hover:shadow-md transition dark:border-slate-800 dark:bg-slate-900/60">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 group-hover:text-primary dark:text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
                  <div className="mt-3 flex items-center gap-3 text-sm">
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" className="text-primary hover:underline" rel="noreferrer">Live</a>}
                    {p.repoUrl && <a href={p.repoUrl} target="_blank" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" rel="noreferrer">GitHub</a>}
                  </div>
                </div>
              </article>
            ))}
            {!filtered.length && (
              <p className="text-slate-500 dark:text-slate-400">No matching projects.</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
