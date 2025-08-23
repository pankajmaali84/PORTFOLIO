import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { UserIcon } from '../components/Icons'

export default function About() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-head', { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' })
      gsap.fromTo('.about-lead', { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, delay: 0.1, ease: 'power3.out' })
      gsap.fromTo('.about-card', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, delay: 0.2, ease: 'power3.out', stagger: 0.08 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <header className="page-head flex items-center gap-2 text-slate-500 dark:text-slate-300 text-sm">
          <UserIcon className="w-4 h-4 text-primary" />
          <span>About</span>
        </header>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">About Me</h1>
        <p className="about-lead mt-4 text-slate-600 dark:text-slate-300 max-w-3xl">
          I am a passionate developer focused on building clean UI, optimized performance, and delightful user experiences.
          I enjoy translating ideas into real products with modern stacks like React, Node, and Tailwind.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="about-card rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="font-semibold">Experience</h3>
            <ul className="mt-3 space-y-1 text-slate-600 dark:text-slate-300">
              <li>• Frontend development</li>
              <li>• Responsive & accessible UI</li>
              <li>• Performance optimization</li>
            </ul>
          </div>
          <div className="about-card rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="font-semibold">Focus Areas</h3>
            <ul className="mt-3 space-y-1 text-slate-600 dark:text-slate-300">
              <li>• Design systems & components</li>
              <li>• Developer experience (DX)</li>
              <li>• Animations and micro-interactions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
