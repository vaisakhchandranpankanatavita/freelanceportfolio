import { useEffect, useRef, useState } from 'react'

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/** True once the element has scrolled into view. */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
}

/** Inertial scrolling, parallax ([data-speed]) and scroll-driven tickers (.strip span[data-strip]). */
export function useSmoothScroll(route: string) {
  useEffect(() => {
    const root = document.documentElement
    const smooth = document.getElementById('smooth')
    if (!smooth || route === 'home') return
    if (reducedMotion()) { root.classList.add('native'); return }

    let vw = 0, vh = 0, H = 0, sy = scrollY, raf = 0
    let PX: { el: HTMLElement; sp: number; top: number; h: number }[] = []
    let STR: { el: HTMLElement; top: number; dir: number }[] = []

    const absTop = (el: HTMLElement | null) => { let t = 0; while (el && el !== smooth) { t += el.offsetTop; el = el.offsetParent as HTMLElement | null } return t }
    const measure = () => {
      vw = innerWidth; vh = innerHeight; H = smooth.offsetHeight
      document.body.style.height = H + 'px'
      PX = [...document.querySelectorAll<HTMLElement>('[data-speed]')].map(el => ({ el, sp: +(el.dataset.speed || 0), top: absTop(el), h: el.offsetHeight }))
      STR = [...document.querySelectorAll<HTMLElement>('.strip span')].map(el => ({ el, top: absTop(el.parentElement), dir: +(el.dataset.strip || 1) }))
    }
    const update = (y: number) => {
      const l1 = document.getElementById('l1'), l2 = document.getElementById('l2')
      if (y < vh * 1.6 && l1 && l2) { l1.style.transform = `translate3d(${-y * 0.2}px,0,0)`; l2.style.transform = `translate3d(${y * 0.2}px,0,0)` }
      PX.forEach(o => { const d = y + vh / 2 - (o.top + o.h / 2); if (Math.abs(d) < vh * 1.6) o.el.style.transform = `translate3d(0,${-d * o.sp}px,0)` })
      STR.forEach(o => { o.el.style.transform = `translate3d(${-(vw * 0.2) + o.dir * -(y - o.top + vh) * 0.3}px,0,0)` })
    }
    const tick = () => {
      const y = scrollY
      sy += (y - sy) * 0.085
      if (Math.abs(y - sy) < 0.1) sy = y
      smooth.style.transform = `translate3d(0,${-sy}px,0)`
      update(sy)
      raf = requestAnimationFrame(tick)
    }

    history.scrollRestoration = 'manual'
    measure(); sy = scrollY; tick()
    let rt: number
    const onResize = () => { clearTimeout(rt); rt = window.setTimeout(measure, 120) }
    addEventListener('resize', onResize)
    addEventListener('load', measure)
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => { clearTimeout(rt); rt = window.setTimeout(measure, 80) }) : null
    ro?.observe(smooth)
    document.fonts?.ready.then(measure)

    return () => {
      cancelAnimationFrame(raf); removeEventListener('resize', onResize); removeEventListener('load', measure); ro?.disconnect()
      smooth.style.transform = ''; document.body.style.height = ''
    }
  }, [route])
}

/** Card spotlight (cursor-following border glow) and magnetic buttons. */
export function usePointerEffects() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const c = (e.target as Element | null)?.closest?.('.card') as HTMLElement | null
      if (c) { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px') }
    }
    document.addEventListener('pointermove', onMove)
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
}

/** Smooth anchor navigation that works with the transform-based scroller. */
export function useAnchorScroll(onNavigate?: () => void) {
  useEffect(() => {
    const smooth = document.getElementById('smooth')
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href^="#"]:not([href^="#/"])') as HTMLAnchorElement | null
      if (!a || !smooth) return
      const id = a.getAttribute('href')!
      const target = id === '#top' ? document.getElementById('top') : document.querySelector<HTMLElement>(id)
      if (!target) return
      e.preventDefault(); onNavigate?.()
      let t = 0, el: HTMLElement | null = target
      while (el && el !== smooth) { t += el.offsetTop; el = el.offsetParent as HTMLElement | null }
      scrollTo({ top: id === '#top' ? 0 : t, behavior: reducedMotion() ? 'auto' : 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [onNavigate])
}

/** In hosts that block plain file downloads (e.g. the Claude artifact viewer) use the host's save capability; otherwise the normal link is used. */
export function useResumeDownload() {
  useEffect(() => {
    let save: ((o: { filename: string; data: Blob }) => Promise<unknown>) | null = null
    const w = window as unknown as { claude?: { use?: (n: string) => Promise<{ save: typeof save } | null> } }
    try { w.claude?.use?.('downloads').then(d => { save = d?.save ? d.save.bind(d) : null }).catch(() => {}) } catch { /* standalone */ }
    const onClick = async (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[download]') as HTMLAnchorElement | null
      if (!a || !save) return
      e.preventDefault()
      try { const blob = await (await fetch(a.href)).blob(); await save({ filename: 'Divya-Hariharan-Resume.pdf', data: blob }) } catch { /* user declined */ }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

export { clamp }
