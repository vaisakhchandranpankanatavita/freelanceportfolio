import { EDUCATION, SKILLS } from '../data'
import SectionHead from './SectionHead'
import Split from './Split'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <SectionHead watermark="About" eyebrow="03 / About" title={<>About <em>me</em></>} />
        <div className="about2">
          <div>
            <Split as="p" className="big">Dedicated to creating, implementing and assessing instruction that meets student needs.</Split>
            <Reveal as="p" className="t">I have led curriculum development, student mentoring and classroom management, and my scholarly work covers autism, gender and identity.</Reveal>
            <Reveal as="p" className="langs"><span>Languages</span>English · Malayalam · Hindi · Tamil</Reveal>
          </div>
          <div data-speed=".06">
            <Reveal className="edu">
              <p className="eyebrow" style={{ marginBottom: 16 }}>Education</p>
              {EDUCATION.map(e => (
                <div key={e.title}><h4>{e.title}</h4><time>{e.time}</time><p>{e.place}</p></div>
              ))}
            </Reveal>
          </div>
        </div>
        <div className="skills-wrap">
          <Reveal as="p" className="eyebrow">Skills &amp; competencies</Reveal>
          <Reveal className="skills">
            {SKILLS.map(s => (
              <div className="sk" key={s.title}><span className="n">{s.n}</span><h4>{s.title}</h4><ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul></div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
