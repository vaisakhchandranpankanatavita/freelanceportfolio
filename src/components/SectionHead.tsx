import type { ReactNode } from 'react'
import Split from './Split'
import Reveal from './Reveal'

export default function SectionHead({ watermark, eyebrow, title, lead, flush }: { watermark?: string; eyebrow?: string; title: ReactNode; lead?: string; flush?: boolean }) {
  return (
    <div className="sh" style={flush ? { marginBottom: 0 } : undefined}>
      {watermark && <div className="wm" data-speed=".16" aria-hidden="true">{watermark}</div>}
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Split as="h2">{title}</Split>
      {lead && <div data-speed=".1"><Reveal as="p" className="lead">{lead}</Reveal></div>}
    </div>
  )
}
