import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConstructionHero } from '@/components/construction-hero';
import { ProjectContact } from '@/components/project-contact';
import architecture from '@/assets/architecture.jpg';
import interior from '@/assets/interior.jpg';

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({ meta: [
    { title: 'Custom Homes — Built Around You' },
    { name: 'description', content: 'Explore thoughtful custom-home design, from the first foundation to spaces that feel like home. Start a conversation about your vision.' },
    { property: 'og:title', content: 'Custom Homes — Built Around You' },
    { property: 'og:description', content: 'A home shaped around your life. Explore the journey from foundation to final detail.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
});

const navigation = [['Our Approach', '#approach'], ['The Process', '#process'], ['Projects', '#projects'], ['Contact', '#contact']];
const stages = [
  ['Discover', 'It starts with you. Your everyday rituals, your ambitions, and what home really means to you.'],
  ['Design', 'Ideas become considered spaces. Light, proportion and materials come together around the way you live.'],
  ['Build', 'A vision takes physical form. Each structural connection and finishing detail deserves the same care.'],
  ['Complete', 'The final details fall into place. A thoughtfully imagined space becomes a place to call your own.'],
];
function Index() {
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const update = () => { const next = document.getElementById('approach'); setSolid(Boolean(next && next.getBoundingClientRect().top < 85)); };
    window.addEventListener('scroll', update, { passive: true }); update();
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => { window.removeEventListener('scroll', update); observer.disconnect(); };
  }, []);
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className={`site-header ${solid || menu ? 'is-solid' : ''}`}>
      <a href="#main" className="identity" aria-label="Home">[ Your identity ]</a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="nav-actions"><Button asChild className="nav-project"><a href="#contact">Start Your Project <ArrowUpRight /></a></Button><Button variant="ghost" size="icon" className="menu-toggle" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>
      {menu && <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}<ArrowUpRight size={18} /></a>)}</nav>}
    </header>
    <main id="main">
      <ConstructionHero />
      <section id="approach" className="section introduction">
        <div className="section-kicker"><span>01 / OUR APPROACH</span><span>Designed for living.</span></div>
        <div className="intro-layout" data-reveal><h2>More than a house.<br /><span className="text-muted-foreground">A place that's yours.</span></h2><div className="intro-copy"><p>A home is more than its walls. It’s the quiet morning light, the room for everyone at the table, the feeling of being exactly where you belong.</p><p>Thoughtful design begins with your life. From the way spaces connect to the materials you touch every day, every decision can make a home more personal, more meaningful, more yours.</p><a href="#process" className="text-link">A considered journey <ArrowUpRight size={16} /></a></div></div>
      </section>
      <section id="process" className="section process-section">
        <div className="section-kicker"><span>02 / THE PROCESS</span><span>A clear path from idea to home.</span></div>
        <h2 data-reveal>From the first sketch<br /><span className="text-muted-foreground">to the final detail.</span></h2>
        <div className="process-grid">{stages.map(([title, description], index) => <div className="process-step" key={title} data-reveal><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
      </section>
      <section className="architecture-section" aria-labelledby="architecture-title">
        <div className="section architecture-heading"><div className="section-kicker"><span>03 / FORM & FEELING</span><span>Less, but better.</span></div><h2 id="architecture-title" data-reveal>Thoughtfully designed.<br /><span className="text-muted-foreground">Carefully built.</span></h2></div>
        <figure className="architecture-image"><img src={architecture} alt="Conceptual limestone and cedar home opening onto a green courtyard" loading="lazy" width={1536} height={1024} /><figcaption><span>Natural materials. Lasting character.</span><span>Architectural inspiration</span></figcaption></figure>
        <div className="section material-note" data-reveal><p className="eyebrow">THE BEAUTY IS IN THE DETAILS</p><p>Honest materials. Considered proportions.<br />Spaces that grow more beautiful with time.</p></div>
      </section>
      <section id="projects" className="section projects-section">
        <div className="section-kicker"><span>04 / SPACES & POSSIBILITIES</span><span>A collection of inspiration.</span></div>
        <div className="projects-heading" data-reveal><h2>Spaces worth<br /><span className="text-muted-foreground">coming home to.</span></h2><p>A glimpse of what’s possible.<br />Concept imagery, ready for your projects.</p></div>
        <div className="project-grid"><figure data-reveal><img src={interior} alt="Concept interior with oak detailing and garden-facing glazing" width={1536} height={1024} loading="lazy" /><figcaption><div><span className="eyebrow">CONCEPT 01 / INTERIORS</span><h3>Room to breathe.</h3></div><span>Concept study</span></figcaption></figure><figure data-reveal><img src={architecture} alt="Concept courtyard residence with natural stone and timber" width={1536} height={1024} loading="lazy" /><figcaption><div><span className="eyebrow">CONCEPT 02 / ARCHITECTURE</span><h3>Connected to nature.</h3></div><span>Concept study</span></figcaption></figure></div>
      </section>
      <section id="contact" className="section contact-section"><div className="section-kicker"><span>05 / YOUR NEXT CHAPTER</span><span>Start with a conversation.</span></div><div className="contact-layout"><div data-reveal><h2>Let's build something<br /><span className="text-muted-foreground">that feels like home.</span></h2><p className="contact-intro">A first idea. A little inspiration. A clear vision.<br />Wherever you are, there’s a place to begin.</p></div><ProjectContact /></div></section>
    </main>
    <footer className="site-footer"><a href="#main" className="identity">[ Your identity ]</a><p>Thoughtfully imagined. Personally yours.</p><nav aria-label="Footer navigation">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav><a href="#main" className="text-link">Back to top ↑</a></footer>
  </>;
}
