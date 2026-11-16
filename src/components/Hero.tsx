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
      <Reveal className="eyebrow-c"><span className="eyebrow live">Muscat, Oman · Open to collaborations</span></Reveal>

      <Split as="h1" className="name" immediate>
        <span className="ln" id="l1">Divya</span>
        <span className="ln l2" id="l2">Hariharan</span>
      </Split>

      <div className="cols">
        <div className="col lc">
          <Reveal className="side l">
            <p className="role">English Literature Lecturer, Researcher &amp; Author</p>
            <p className="vp">Seven-plus years teaching English language and literature, turning classroom practice into published research.</p>
          </Reveal>
          <div className="grp"><Stat i={0} delay={300} /><Stat i={1} delay={410} /></div>
        </div>

        <div className="fig">
          <img id="pimg" src={photo} alt="Portrait of Divya Hariharan smiling in a beige blazer" width={800} height={944} />
        </div>

        <div className="col rc">
          <Reveal className="hl cur" delay={250}>
            <small>Currently</small><span>Al Bayan College</span><em>Muscat, Oman</em>
          </Reveal>
          <div className="grp"><Stat i={2} delay={520} /><Stat i={3} delay={630} /></div>
        </div>
      </div>

      <Reveal className="cta-c" delay={900}>
        <a className="btn solid mag" href="#/work">View work details <span aria-hidden="true">→</span></a>
        <a className="btn mag" href="#/contact">Get in touch</a>
      </Reveal>
    </section>
  )
}
