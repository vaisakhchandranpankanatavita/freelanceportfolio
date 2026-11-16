import { useState } from 'react'
import { EMAIL, PHONE, SOCIALS } from '../data'
import SectionHead from './SectionHead'
import Reveal from './Reveal'

const RESUME = `${import.meta.env.BASE_URL}resume.pdf`

function SocialIcon({ label }: { label: string }) {
  const common = { viewBox: '0 0 24 24', 'aria-hidden': true as const, focusable: false as const }
  if (label === 'LinkedIn') return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" /><path d="M8 10v7M8 7.4v.1M12 17v-7m0 3.1c0-1.2.8-2.1 2-2.1s2 .8 2 2.1V17" fill="none" stroke="var(--bg)" strokeWidth="1.8" strokeLinecap="round" /></svg>
  if (label === 'Google Scholar') return <svg {...common}><path d="m2.5 9 9.5-6 9.5 6-9.5 6-9.5-6Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6.5 11.7v4.1c3.3 2.7 7.7 2.7 11 0v-4.1M21.5 9v6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  if (label === 'ORCID') return <svg {...common}><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" /><text x="12" y="15.2" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="700">iD</text></svg>
  if (label === 'Web of Science') return <svg {...common}><circle cx="12" cy="5" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="5.5" cy="17" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="18.5" cy="17" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="m11 7-4.5 8m6.5-8 4.5 8M7.5 17h9" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
  return <svg {...common}><path d="M4 5.5c3.2-.9 5.8-.3 8 1.4 2.2-1.7 4.8-2.3 8-1.4v13c-3.2-.9-5.8-.3-8 1.4-2.2-1.7-4.8-2.3-8-1.4v-13Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M12 7v12" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
}

export default function Contact() {
  const [label, setLabel] = useState('Copy email')
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setLabel('Copied ✓') } catch { setLabel(EMAIL) }
    setTimeout(() => setLabel('Copy email'), 2200)
  }
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <SectionHead flush watermark="Hello" title={<>Let’s <em>Connect.</em></>} />
        <div className="cgrid">
          <Reveal>
            <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className="ph">{PHONE} · Muscat, Oman</p>
            <div className="cta">
              <button className="btn solid" type="button" onClick={copy}>{label}</button>
              <a className="btn" href={RESUME} download="Divya-Hariharan-Resume.pdf">Download Resume ↓</a>
            </div>
          </Reveal>
          <Reveal className="soc">
            {SOCIALS.map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"><span className="soc-icon"><SocialIcon label={s.label} /></span><span className="soc-label">{s.label}</span><span className="soc-go" aria-hidden="true">↗</span></a>)}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
