import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { HomeIcon } from '../components/Icons'

export default function Home() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-head', { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' })
      gsap.fromTo('.hero-title', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', delay: 0.05 })
      gsap.fromTo('.hero-sub', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.15, ease: 'power3.out' })
      gsap.fromTo('.hero-cta > *', { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, delay: 0.25, ease: 'power3.out', stagger: 0.07 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <header className="page-head flex items-center gap-2 text-slate-500 dark:text-slate-300 text-sm">
          <HomeIcon className="w-4 h-4 text-primary" />
          <span>Home</span>
        </header>
        <div className="mt-6 grid md:grid-cols-2 items-center gap-10">
          <div>
            <h1 className="hero-title text-4xl md:text-5xl font-extrabold leading-tight">Hi, I’m <span className="text-primary">Your Name</span><br/>Frontend Developer</h1>
            <p className="hero-sub mt-4 text-slate-600 dark:text-slate-300 max-w-xl">I build fast, accessible, and responsive web experiences using modern tools and best practices.</p>
            <div className="hero-cta mt-6 flex flex-wrap items-center gap-3">
              <a href="/projects" className="inline-flex items-center px-5 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition">View Projects</a>
              <a href="/contact" className="inline-flex items-center px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">Contact Me</a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl bg-gradient-to-tr from-primary/25 to-indigo-500/10 border border-primary/40 flex items-center justify-center">
              <span className="text-6xl">👩‍💻</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
