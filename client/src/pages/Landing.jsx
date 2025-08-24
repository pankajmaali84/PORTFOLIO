import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Landing() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-badge', { y: -10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' })
      gsap.fromTo('.hero-title span', { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.08, delay: 0.05 })
      gsap.fromTo('.hero-sub', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.hero-cta > *', { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', delay: 0.3, stagger: 0.08 })
      gsap.to('.floating', { y: -8, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7 lg:col-span-6">
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
            <span className="inline-block size-1.5 rounded-full bg-primary" />
            Available for freelance projects
          </div>

          <h1 className="hero-title mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="block overflow-hidden"><span className="inline-block">Crafting</span></span>
            <span className="block overflow-hidden"><span className="inline-block">Beautiful</span></span>
            <span className="block overflow-hidden"><span className="inline-block text-primary">Web Experiences</span></span>
          </h1>

          <p className="hero-sub mt-4 max-w-xl text-slate-600 dark:text-slate-300">
            I’m a frontend developer who blends performance, accessibility, and motion to build delightful experiences.
          </p>

          <div className="hero-cta mt-8 flex flex-wrap items-center gap-3">
            <a href="/projects" className="inline-flex items-center px-5 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition">View Projects</a>
            <a href="/contact" className="inline-flex items-center px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">Contact Me</a>
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-6 flex items-center justify-center md:justify-end">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/25 to-indigo-500/20 border border-primary/40" />
            <div className="floating absolute -top-6 -left-6 size-14 rounded-xl bg-primary/25 border border-primary/40" />
            <div className="floating absolute -bottom-6 -right-6 size-16 rounded-xl bg-indigo-500/25 border border-indigo-400/40" style={{ animationDelay: '0.4s' }} />
            {/* Profile photo from public folder: place your image at client/public/pankaj.jpg */}
            <img
              src="/pankaj.jpg"
              alt="Pankaj Mali portrait"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
