import { useState } from 'react'
import { EMAIL, PHONE, SOCIALS } from '../data'
import SectionHead from './SectionHead'
import Reveal from './Reveal'

const RESUME = `${import.meta.env.BASE_URL}resume.pdf`

export default function Contact() {
  const [label, setLabel] = useState('Copy email')
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setLabel('Copied ✓') } catch { setLabel(EMAIL) }
    setTimeout(() => setLabel('Copy email'), 2200)
  }
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <SectionHead flush watermark="Hello" eyebrow="04 / Contact" title={<>Let’s <em>Connect.</em></>} />
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
            {SOCIALS.map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} <span>↗</span></a>)}
          </Reveal>
        </div>
        <div className="foot"><span>© 2026 Divya Hariharan</span><span>Scopus Author ID 59172134400</span><a href="#/">Back home ↑</a></div>
      </div>
    </section>
  )
}
