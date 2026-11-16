import { Children, cloneElement, isValidElement, type ElementType, type ReactNode } from 'react'
import { useInView } from '../hooks'

/** Wraps every word in a masked span so it can rise into view line by line. */
export default function Split({ as: Tag = 'h2', className = '', children, immediate = false }: { as?: ElementType; className?: string; children: ReactNode; immediate?: boolean }) {
  const [ref, seen] = useInView<HTMLElement>()
  let k = 0
  const walk = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, child => {
      if (typeof child === 'string') {
        return child.split(/(\s+)/).map((t, i) =>
          !t.trim() ? t : (
            <span className="w" key={i}><span className="i" style={{ transitionDelay: `${k++ * 80}ms` }}>{t}</span></span>
          ))
      }
      if (isValidElement<{ children?: ReactNode }>(child)) return cloneElement(child, undefined, walk(child.props.children))
      return child
    })
  const Comp = Tag as ElementType
  return <Comp ref={ref} className={`split ${className} ${seen || immediate ? 'in' : ''}`.trim()}>{walk(children)}</Comp>
}
