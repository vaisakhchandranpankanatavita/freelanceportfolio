import { useEffect } from 'react'
import BottomNav from './components/BottomNav'
import Hero from './components/Hero'
import Work from './components/Work'
import Experience from './components/Experience'
import Strip from './components/Strip'
import About from './components/About'
import Contact from './components/Contact'
import Page from './components/Page'
import { useAnchorScroll, usePointerEffects, useResumeDownload, useSmoothScroll } from './hooks'
import { useRoute } from './router'

export default function App() {
  const route = useRoute()
  useEffect(() => {
    document.documentElement.classList.toggle('home', route === 'home')
    document.title = route === 'home' ? 'Divya Hariharan · English Literature Lecturer, Researcher & Author' : `${route[0].toUpperCase()}${route.slice(1)} · Divya Hariharan`
  }, [route])
  useSmoothScroll(route)
  usePointerEffects()
  useAnchorScroll()
  useResumeDownload()
  return (
    <>
      <main id="smooth" key={route} className={route === 'home' ? 'is-home' : 'is-page'}>
        {route === 'home' && <Hero />}
        {route === 'work' && <Page route="work"><Work /></Page>}
        {route === 'experience' && <Page route="experience"><Experience /><Strip /></Page>}
        {route === 'about' && <Page route="about"><About /></Page>}
        {route === 'contact' && <Page route="contact"><Contact /></Page>}
      </main>
      <BottomNav route={route} />
    </>
  )
}
