import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../hooks'

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, style }: { as?: ElementType; className?: string; delay?: number; children: ReactNode; style?: CSSProperties }) {
  const [ref, seen] = useInView<HTMLElement>()
  const Comp = Tag as ElementType
  return <Comp ref={ref} className={`rv ${seen ? 'in' : ''} ${className}`.trim()} style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</Comp>
}
