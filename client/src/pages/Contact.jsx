import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { gsap } from 'gsap'
import { MailIcon } from '../components/Icons'
import toast from 'react-hot-toast'

export default function Contact() {
  const apiBase =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_BASE ||
    'https://portfolio-server-v4v7.onrender.com'

  const api = axios.create({ baseURL: apiBase })
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' })
  const [status, setStatus] = useState({ loading: false, message: '', id: '' })
  const [copied, setCopied] = useState(false)
  const root = useRef(null)
  const ownerEmail = import.meta.env.VITE_OWNER_EMAIL || 'youremail@example.com'

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, message: '', id: '' })
    const t = toast.loading('Sending message...')
    try {
      const res = await api.post('/api/contact', form)
      const trackId = res?.data?.id || ''
      const shortId = trackId ? trackId.slice(-6) : ''
      toast.success('Message sent! ✅')
      setForm({ name: '', email: '', subject: '', body: '' })
      setStatus({ loading: false, message: 'Your message was submitted successfully.' + (shortId ? ` Tracking ID: ${shortId}` : ''), id: trackId })
    } catch (err) {
      const apiMsg = err?.response?.data?.error || err?.message || 'Failed to send.'
      toast.error(apiMsg)
      setStatus({ loading: false, message: '' , id: ''})
    } finally {
      toast.dismiss(t)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-head', { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' })
      gsap.fromTo('.contact-field', { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07, delay: 0.1 })
      gsap.fromTo('.contact-submit', { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, delay: 0.25, ease: 'power3.out' })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="py-16 md:py-20 bg-white dark:bg-slate-900">
      <div className="max-w-3xl mx-auto px-4">
        <header className="page-head flex items-center gap-2 text-slate-500 dark:text-slate-300 text-sm">
          <MailIcon className="w-4 h-4 text-primary" />
          <span>Contact</span>
        </header>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">Contact</h1>
        <div className="mt-3 flex items-center gap-3 text-sm">
          <a href={`mailto:${ownerEmail}`} className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16v12H4z"/><path d="m22 6-10 7L2 6"/></svg>
            {ownerEmail}
          </a>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(ownerEmail)
                setCopied(true)
                setTimeout(() => setCopied(false), 1200)
              } catch {}
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="9" y="9" width="13" height="13" rx="2"/><rect x="2" y="2" width="13" height="13" rx="2"/></svg>
            {copied ? 'Copied!' : 'Copy Email'}
          </button>
        </div>
        {status.message && (
          <div className="mt-6 rounded-lg border border-emerald-300/40 bg-emerald-50 text-emerald-900 px-4 py-3 dark:bg-emerald-900/30 dark:text-emerald-100 dark:border-emerald-700/50">
            <p className="font-medium">{status.message}</p>
            <p className="text-xs opacity-80 mt-1">A confirmation email will arrive shortly. If you don’t see it, please check Spam/Promotions.</p>
          </div>
        )}
        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <input className="contact-field px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100" placeholder="Name" name="name" value={form.name} onChange={onChange} required />
          <input className="contact-field px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100" placeholder="Email" type="email" name="email" value={form.email} onChange={onChange} required />
          <input className="contact-field px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100" placeholder="Subject" name="subject" value={form.subject} onChange={onChange} />
          <textarea className="contact-field px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[140px] dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100" placeholder="Message" name="body" value={form.body} onChange={onChange} required />
          <button disabled={status.loading} className="contact-submit inline-flex items-center justify-center px-5 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition disabled:opacity-60">
            {status.loading ? 'Sending...' : 'Send Message'}
          </button>
          {/* Toasts will show success/error messages */}
        </form>
      </div>
    </section>
  )
}
