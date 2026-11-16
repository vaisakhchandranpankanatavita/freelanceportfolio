import { useEffect, useState } from 'react'
import { NAV } from '../data'

const RESUME = `${import.meta.env.BASE_URL}resume.pdf`

export default function Header({ route }: { route: string }) {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setStuck(scrollY > 20)
    addEventListener('scroll', on, { passive: true }); on()
    return () => removeEventListener('scroll', on)
  }, [route])
  // close the mobile menu when an anchor is chosen
  useEffect(() => {
    const close = (e: MouseEvent) => { if ((e.target as Element).closest('#links a')) setOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])
  return (
    <header className={`nav${stuck ? ' stuck' : ''}`}>
      <div className="wrap">
        <a href="#/" className="logo" aria-label="Divya Hariharan, home"><b>DH</b><span>Divya Hariharan</span></a>
        <nav className={`links${open ? ' open' : ''}`} id="links" aria-label="Primary">
          {NAV.map(n => <a key={n.href} href={n.href} className={route === n.route ? 'on' : ''} aria-current={route === n.route ? 'page' : undefined}>{n.label}</a>)}
        </nav>
        <a className="btn dl" href={RESUME} download="Divya-Hariharan-Resume.pdf">Download Resume ↓</a>
        <button className="menu" aria-expanded={open} aria-controls="links" onClick={() => setOpen(o => !o)}>Menu</button>
      </div>
    </header>
  )
}
