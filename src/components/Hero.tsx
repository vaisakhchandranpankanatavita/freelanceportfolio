import photo from '../assets/photo.webp'
import { HIGHLIGHTS } from '../data'
import Split from './Split'
import Reveal from './Reveal'

const H = HIGHLIGHTS
const Stat = ({ i, delay }: { i: number; delay: number }) => (
  <Reveal className={`hl hl${i + 1}`} delay={delay}>
    <b>{H[i].value}</b><span>{H[i].label}</span><small>{H[i].sub}</small>
  </Reveal>
)

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Split as="h1" className="name" immediate>
        <span className="ln" id="l1">Divya</span>
        <span className="ln l2" id="l2">Hariharan</span>
      </Split>

      <Reveal className="title-below" delay={200}>
        <p>English Literature Lecturer, Researcher &amp; Author</p>
      </Reveal>

      <div className="cols">
        <div className="col lc">
          <Reveal className="side l">
            <p className="role">PhD in English, Lincoln University College</p>
          </Reveal>
          <div className="grp"><Stat i={0} delay={300} /><Stat i={1} delay={410} /></div>
        </div>

        <div className="fig">
          <img id="pimg" src={photo} alt="Portrait of Divya Hariharan smiling in a beige blazer" width={800} height={944} />
        </div>

        <div className="col rc">
          <Reveal className="hl cur" delay={250}>
            <span>Al Bayan College</span>
          </Reveal>
          <div className="grp"><Stat i={2} delay={520} /><Stat i={3} delay={630} /></div>
        </div>
      </div>

    </section>
  )
}
