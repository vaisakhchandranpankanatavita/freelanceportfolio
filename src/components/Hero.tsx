import { useEffect, useRef, useState } from 'react'
import photo from '../assets/photo.webp'
import { HIGHLIGHTS } from '../data'
import Split from './Split'
import Reveal from './Reveal'

/** Counts up once on load. Respects reduced motion. */
function Count({ value, delay }: { value: string; delay: number }) {
  const m = /^(\d+)(.*)$/.exec(value)!
  const target = +m[1], suffix = m[2]
  const [n, setN] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(target); return }
    const t0 = performance.now() + delay, dur = 1400
    const tick = (t: number) => {
      const k = Math.min(1, Math.max(0, (t - t0) / dur))
      setN(Math.round(target * (1 - Math.pow(1 - k, 4))))
      if (k < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, delay])
  return <b aria-label={value}><span aria-hidden="true">{n}{suffix}</span></b>
}

/** Local time in Muscat, refreshed every 30 seconds. */
function useMuscatTime() {
  const fmt = () => new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Muscat', hour: 'numeric', minute: '2-digit' }).toLowerCase()
  const [t, setT] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setT(fmt()), 30000); return () => clearInterval(id) }, [])
  return t
}

const Stat = ({ i, delay }: { i: number; delay: number }) => {
  const h = HIGHLIGHTS[i]
  return (
    <Reveal className={`hl hl${i + 1}`} delay={delay}>
      <Count value={h.value} delay={delay} /><span>{h.label}</span><small>{h.sub}</small>
    </Reveal>
  )
}

export default function Hero() {
  const time = useMuscatTime()
  return (
    <section className="hero" id="top">
      <Reveal className="eyebrow-c"><span className="eyebrow live">Open to collaborations</span></Reveal>

      <Split as="h1" className="name" immediate>
        <span className="ln" id="l1">Divya</span>
        <span className="ln l2" id="l2">Hariharan</span>
      </Split>

      <div className="cols">
        <div className="col lc">
          <Reveal className="side l">
            <p className="role">English literature lecturer, researcher and author</p>
            <p className="vp">Seven-plus years teaching English language and literature, turning classroom practice into published research.</p>
          </Reveal>
          <div className="grp"><Stat i={0} delay={500} /><Stat i={1} delay={620} /></div>
        </div>

        <div className="fig">
          <img id="pimg" src={photo} alt="Portrait of Divya Hariharan smiling in a beige blazer" width={800} height={944} />
        </div>

        <div className="col rc">
          <Reveal className="hl cur" delay={400}>
            <small>Currently teaching at</small><span>Al Bayan College</span>
            <em>Muscat, Oman</em><em className="clock">{time} local time</em>
          </Reveal>
          <div className="grp"><Stat i={2} delay={740} /><Stat i={3} delay={860} /></div>
        </div>
      </div>

      <Reveal className="cta-c" delay={1000}>
        <a className="btn solid" href="#/work">See the work</a>
        <a className="btn" href="#/contact">Get in touch</a>
      </Reveal>
    </section>
  )
}
