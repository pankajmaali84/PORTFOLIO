import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CommandPalette({ open, onClose, onToggleTheme }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const commands = useMemo(() => [
    { id: 'home', label: 'Go to Home', kbd: 'H', action: () => navigate('/') },
    { id: 'about', label: 'Go to About', kbd: 'A', action: () => navigate('/about') },
    { id: 'skills', label: 'Go to Skills', kbd: 'S', action: () => navigate('/skills') },
    { id: 'projects', label: 'Go to Projects', kbd: 'P', action: () => navigate('/projects') },
    { id: 'contact', label: 'Go to Contact', kbd: 'C', action: () => navigate('/contact') },
    { id: 'theme', label: 'Toggle Theme (Light/Dark)', kbd: 'T', action: () => onToggleTheme && onToggleTheme() },
    { id: 'github', label: 'Open GitHub', kbd: 'G', action: () => window.open('https://github.com/', '_blank') },
    { id: 'linkedin', label: 'Open LinkedIn', kbd: 'L', action: () => window.open('https://linkedin.com/', '_blank') },
  ], [navigate, onToggleTheme])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(c => c.label.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      // Delay to ensure element mounted
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose?.()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={onClose} />
      <div className="relative w-[90%] max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-700">
          <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 21l-4.35-4.35" />
            <circle cx="11" cy="11" r="7" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command... (e.g., Projects)"
            className="w-full bg-transparent outline-none px-1 py-2 text-slate-800 placeholder:text-slate-400 dark:text-slate-100"
          />
          <span className="text-[10px] text-slate-500 dark:text-slate-400 border px-1.5 py-0.5 rounded">Esc</span>
        </div>
        <ul className="max-h-72 overflow-auto py-1">
          {filtered.map(cmd => (
            <li key={cmd.id}>
              <button
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => { cmd.action(); onClose?.() }}
              >
                <span className="text-sm text-slate-700 dark:text-slate-200">{cmd.label}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 border px-1.5 py-0.5 rounded">{cmd.kbd}</span>
              </button>
            </li>
          ))}
          {!filtered.length && (
            <li className="px-3 py-4 text-sm text-slate-500 dark:text-slate-400">No results</li>
          )}
        </ul>
      </div>
    </div>
  )
}
