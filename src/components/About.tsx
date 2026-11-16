import { EDUCATION, SKILLS } from '../data'
import SectionHead from './SectionHead'
import Split from './Split'
import Reveal from './Reveal'

const RESUME = `${import.meta.env.BASE_URL}resume.pdf`

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <SectionHead title={<>About <em>me</em></>} />
        <div className="about2">
          <div>
            <Split as="p" className="big">Dedicated to creating, implementing and assessing instruction that meets student needs.</Split>
            <Reveal as="p" className="t">I have led curriculum development, student mentoring and classroom management, and my scholarly work covers autism, gender and identity.</Reveal>
            <Reveal className="langs">
              <span className="lang-label">Languages</span>
              <div className="lang-list">
                {['English', 'Malayalam', 'Hindi', 'Tamil'].map(language => <span key={language}>{language}</span>)}
              </div>
            </Reveal>
            <Reveal className="about-actions">
              <a className="about-resume-link" href={RESUME} download="Divya-Hariharan-Resume.pdf">Download resume <span aria-hidden="true">↓</span></a>
            </Reveal>
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
              <div className="sk" key={s.title}>
                <div className="sk-head"><span className="n">{s.n}</span><h4>{s.title}</h4></div>
                <ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
