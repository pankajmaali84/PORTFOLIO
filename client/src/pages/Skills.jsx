import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SparklesIcon } from '../components/Icons'

export default function Skills() {
  const root = useRef(null)
  const [mounted, setMounted] = useState(false)
  const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 88 },
    { name: 'React', level: 86 },
    { name: 'Tailwind', level: 82 },
    { name: 'Node', level: 75 },
    { name: 'Express', level: 72 },
    { name: 'MongoDB', level: 70 },
    { name: 'Git', level: 78 },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-head', { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' })
      gsap.fromTo('.skill-item', { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06, delay: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // trigger bar fill after mount for smooth animation
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <section ref={root} className="py-16 md:py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <header className="page-head flex items-center gap-2 text-slate-500 dark:text-slate-300 text-sm">
          <SparklesIcon className="w-4 h-4 text-primary" />
          <span>Skills</span>
        </header>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">Skills</h1>
        <div className="mt-6 grid md:grid-cols-2 gap-5">
          {skills.map(s => (
            <div key={s.name} className="skill-item">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium text-slate-700 dark:text-slate-200">{s.name}</span>
                <span className="text-slate-500 dark:text-slate-400">{s.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-500"
                  style={{ width: mounted ? `${s.level}%` : '0%', transition: 'width 900ms cubic-bezier(0.22, 1, 0.36, 1)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
