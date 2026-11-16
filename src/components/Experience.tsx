import { JOBS } from '../data'
import Split from './Split'
import Reveal from './Reveal'
import recognition from '../assets/work/recognition.webp'
import publication from '../assets/work/publication.webp'

/** Black-and-white photographs, one per role (same film-grain treatment as the Work page). */
const PHOTO = [
  { src: recognition, pos: '55% 68%', alt: 'Lecturer addressing a seminar room' },
  { src: publication, pos: '72% 30%', alt: 'Writing at a desk with books and a laptop' },
  { src: recognition, pos: '18% 82%', alt: 'Students listening in a lecture hall' },
]

export default function Experience() {
  return (
    <section id="experience" className="xp">
      <div className="wrap">
        <header className="xp-head">
          <Split as="h2">Experience</Split>
          <Reveal as="p" className="xp-lead">From a classroom in Thrissur to the English department at Al Bayan College, with editing and research along the way.</Reveal>
        </header>
        <ol className="xp-list">
          {JOBS.map((j, i) => (
            <li key={j.company}>
              <Reveal as="article" className="xp-row">
                <aside className="xp-side">
                  <div className="xp-yr">{j.year}</div>
                  <p className="xp-range">{j.range}</p>
                  {PHOTO[i] && <figure className="xp-ph"><img src={PHOTO[i].src} alt={PHOTO[i].alt} loading="lazy" style={{ objectPosition: PHOTO[i].pos }} /></figure>}
                </aside>
                <div className="xp-body">
                  <h3>{j.company}</h3>
                  <p className="xp-role">{j.role}</p>
                  {j.pill && <p className="xp-note">{j.pill}</p>}
                  <ul>{j.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
