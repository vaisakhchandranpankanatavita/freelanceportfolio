import { useState } from 'react'
import { WORK } from '../data'
import Split from './Split'
import Reveal from './Reveal'
import patent from '../assets/work/patent.webp'
import publication from '../assets/work/publication.webp'
import award from '../assets/work/award.webp'
import recognition from '../assets/work/recognition.webp'

type Tag = 'Patent' | 'Publication' | 'Award' | 'Recognition'
const FILTERS: ('All' | Tag)[] = ['All', 'Patent', 'Publication', 'Award', 'Recognition']
const PLURAL: Record<string, string> = { All: 'All', Patent: 'Patents', Publication: 'Publications', Award: 'Award', Recognition: 'Recognition' }

/** One crop of the supplied photographs per piece, so no two plates look alike. */
const ART: Record<number, { src: string; pos: string; zoom: number }> = {
  0: { src: patent, pos: '38% 42%', zoom: 1.0 },
  1: { src: patent, pos: '80% 88%', zoom: 1.35 },
  2: { src: award, pos: '42% 55%', zoom: 1.0 },
  3: { src: publication, pos: '30% 88%', zoom: 1.2 },
  4: { src: publication, pos: '78% 22%', zoom: 1.1 },
  5: { src: recognition, pos: '55% 70%', zoom: 1.05 },
}

export default function Work() {
  const [f, setF] = useState<'All' | Tag>('All')
  const count = (t: string) => (t === 'All' ? WORK.length : WORK.filter(w => w.tag === t).length)
  return (
    <section id="work" className="wk">
      <div className="wrap">
        <header className="wk-head">
          <Split as="h2">Selected work</Split>
          <div className="wk-bar">
            <Reveal as="p" className="wk-lead">Patents, book chapters, conference papers and an award, all growing out of seven years of teaching English literature.</Reveal>
            <Reveal className="wk-filter" delay={120}>
              <div role="tablist" aria-label="Filter work">
                {FILTERS.map(x => (
                  <button key={x} role="tab" aria-selected={f === x} className={f === x ? 'on' : ''} onClick={() => setF(x)}>
                    {PLURAL[x]}<sup>{count(x)}</sup>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </header>

        <ul className="wk-grid">
          {WORK.map((w, i) => {
            const a = ART[i]
            const parts = w.cat.split('·').map(x => x.trim())
            const kind = w.tag === 'Patent' ? `Patent, ${parts[1]}` : w.tag === 'Publication' ? parts[0] : w.tag
            return (
              <li key={w.title} className={`wk-item${f === 'All' || f === w.tag ? '' : ' dim'}`}>
                <Reveal as="article" className="wk-card" delay={60 + (i % 2) * 100}>
                  <figure className="wk-art" tabIndex={0}>
                    <img src={a.src} alt="" loading="lazy" style={{ objectPosition: a.pos, ['--z' as string]: a.zoom }} />
                  </figure>
                  <div className="wk-cap">
                    <div className="wk-meta"><span>{kind}</span><time>{w.year}</time></div>
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
