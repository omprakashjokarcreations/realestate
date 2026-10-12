import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConstructionHero } from '@/components/construction-hero';
import { ProjectContact } from '@/components/project-contact';
import architecture from '@/assets/architecture.jpg';
import interior from '@/assets/interior.jpg';
import featuredHome1 from '@/assets/featured-home-1.jpg';
import featuredHome2 from '@/assets/featured-home-2.jpg';
import featuredHome3 from '@/assets/featured-home-3.jpg';
import avatar1 from '@/assets/avatar-1.jpg';
import avatar2 from '@/assets/avatar-2.jpg';

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: 'TERRA HAVEN — Buy Verified Plots, Build Custom Homes & Move In' },
      {
        name: 'description',
        content: 'Discover handpicked residential plots, design your custom villa, and build your family sanctuary with verified titles and turnkey construction.',
      },
      { property: 'og:title', content: 'TERRA HAVEN — Find Your Dream Plot, Build & Move In' },
      {
        property: 'og:description',
        content: 'From plot acquisition to structural foundation and final turnkey handover. Find your sanctuary today.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/og-image.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: '/og-image.jpg' },
    ],
  }),
});

const navigation = [
  ['Plots & Land', '#featured'],
  ['Our Approach', '#approach'],
  ['The Process', '#process'],
  ['Showcase', '#showcase'],
  ['Reviews', '#reviews'],
  ['Contact', '#contact'],
];

const stages: [string, string][] = [
  ['Select & Secure Plot', 'Handpicked residential land with 100% verified legal clearance, soil testing, and optimal natural topography.'],
  ['Custom Villa Design', 'Floorplans and elevations designed around your family’s daily rituals, light orientation, and privacy.'],
  ['Precision Turnkey Build', 'Poured concrete foundations, steel framework, and artisanal finishes managed under transparent milestone schedules.'],
  ['Move-In & Belong', 'Turnkey handover with zero lingering defects, complete legal registrations, and a place your family calls home.'],
];



const featuredProperties = [
  {
    id: 'parkview',
    badge: 'For Sale · Plot & Villa',
    image: featuredHome1,
    specs: '4 Beds | 3 Baths | 2,800 sq.ft',
    title: 'Parkview Heights',
    desc: 'Bright, modern interiors with generous living spaces and curated gardens in a family-friendly neighborhood.',
    price: '$850,000',
    tag: 'Ready to Build',
  },
  {
    id: 'oakwood',
    badge: 'Featured · Luxury Estate',
    image: featuredHome2,
    specs: '5 Beds | 4 Baths | 3,600 sq.ft',
    title: 'Oakwood Retreat',
    desc: 'Elegant organic double-curved architecture, expansive swimming pavilion, and sunset views over pristine foothills.',
    price: '$1,250,000',
    tag: 'Master Enclave',
  },
  {
    id: 'maplegrove',
    badge: 'For Sale · Residential Plot',
    image: featuredHome3,
    specs: '3,500 sq.ft Land | Clear Title',
    title: 'Maple Grove Haven',
    desc: 'Scenic hillside plot with sculptural sweeping canopy villa blueprint approved for immediate ground breaking.',
    price: '$920,000',
    tag: 'Immediate Registration',
  },
];

function Index() {
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById('main');
      const scrollY = window.scrollY;
      setSolid(scrollY > 90);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <header className={`site-header ${solid || menu ? 'is-solid' : 'is-hero-mode'}`}>
        <a href="#main" className="identity-lockup" aria-label="TERRA HAVEN Home">
          <span className="identity-mark">TH</span>
          <span>TERRA HAVEN</span>
        </a>

        <nav className="desktop-nav-capsule" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href} className="nav-capsule-link">
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="nav-cta-btn">
            <span>Schedule Visit</span>
            <ArrowUpRight size={15} />
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="menu-toggle"
            aria-label={menu ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>

        {menu && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                <span>{label}</span>
                <ArrowUpRight size={18} />
              </a>
            ))}
            <a href="#contact" onClick={() => setMenu(false)} className="font-bold text-foreground">
              Schedule Consultation →
            </a>
          </nav>
        )}
      </header>

      <main id="main">
        {/* HERO SECTION WITH VIDEO TIMELAPSE & LEFT-BOTTOM MINIMAL TEXT */}
        <ConstructionHero />

        {/* OUR APPROACH */}
        <section id="approach" className="section introduction">
          <div className="section-kicker">
            <span>OUR APPROACH</span>
            <span>Real Estate · Verified Land · Custom Living</span>
          </div>

          <div className="intro-layout" data-reveal>
            <h2>
              Find your dream plot.<br />
              <span className="text-muted-foreground">Build and move in with your family.</span>
            </h2>
            <div className="intro-copy">
              <p>
                A home is more than square footage. It’s where your children take their first steps, where dinners turn into lifelong memories, and where your family feels unconditionally rooted.
              </p>
              <p>
                We remove the anxiety from building and buying. Every plot in our collection comes with verified clear titles, municipal permits, and vetted soil mechanics. When you're ready, our architecture and construction team brings your villa to life on budget and on schedule.
              </p>
              <a href="#featured" className="text-link">
                Explore handpicked properties <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Quick value props / trust badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-border" data-reveal>
            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-extrabold font-display">1,250+</span>
              <p className="text-xs text-muted-foreground font-medium">Verified residential plots delivered</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-extrabold font-display">100%</span>
              <p className="text-xs text-muted-foreground font-medium">Clear title deed guarantee</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-extrabold font-display">180 Days</span>
              <p className="text-xs text-muted-foreground font-medium">Average groundwork-to-framing speed</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl md:text-3xl font-extrabold font-display">4.9 / 5</span>
              <p className="text-xs text-muted-foreground font-medium">Family homeowner satisfaction</p>
            </div>
          </div>
        </section>

        {/* FEATURED PROPERTIES */}
        <section id="featured" className="section featured-section">
          <div className="section-kicker">
            <span>FEATURED PROPERTIES</span>
            <span>Curated Enclaves & Turnkey Villas</span>
          </div>

          <div className="featured-header" data-reveal>
            <h2>Discover Featured Homes & Plots</h2>
            <p>
              Explore our handpicked selection of homes and plots that combine style, comfort, and verified legal security. Each property is carefully vetted for your family's lasting peace of mind.
            </p>
          </div>

          <div className="featured-grid">
            {featuredProperties.map((prop) => (
              <div key={prop.id} className="featured-card" data-reveal>
                <div className="card-image-box">
                  <span className="card-badge">{prop.badge}</span>
                  <img src={prop.image} alt={prop.title} loading="lazy" />

                  {/* Signature Curved Bending Notch with circular action button */}
                  <a href="#contact" className="card-corner-notch" aria-label={`View details for ${prop.title}`}>
                    <div className="notch-action-btn">
                      <ArrowUpRight size={20} />
                    </div>
                  </a>
                </div>

                <div className="card-info">
                  <div className="card-meta-line">{prop.specs}</div>
                  <h3 className="card-title">{prop.title}</h3>
                  <p className="card-desc">{prop.desc}</p>
                  <div className="card-price-row">
                    <span>Price: <span className="price-val">{prop.price}</span></span>
                    <span className="card-tag">{prop.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE PROCESS */}
        <section id="process" className="section process-section">
          <div className="section-kicker">
            <span>THE PROCESS</span>
            <span>A clear path from idea to family move-in</span>
          </div>
          <h2 data-reveal>
            From the first plot selection<br />
            <span className="text-muted-foreground">to handing over the keys.</span>
          </h2>
          <div className="process-grid">
            {stages.map(([title, description]) => (
              <div className="process-step" key={title} data-reveal>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>


        {/* FORM & LIVING ARCHITECTURAL SHOWCASE */}
        <section id="showcase" className="architecture-section" aria-labelledby="architecture-title">
          <div className="architecture-top" data-reveal>
            <div>
              <div className="section-kicker !mb-4">
                <span>FORM & LIVING</span>
                <span>Architectural Excellence</span>
              </div>
              <div className="terra-title-lockup">
                <span className="terra-big">TERRA</span>
                <span className="cotta-script">cotta</span>
              </div>
            </div>

            <div className="arch-specs-pill">
              <span className="arch-pill-tag">Collection</span>
              <span className="arch-pill-tag">Masterplanned Plots</span>
              <span className="arch-pill-tag">Custom Builds</span>
            </div>
          </div>

          <div className="architecture-hero-frame" data-reveal>
            <img
              src={architecture}
              alt="TERRA cotta signature residence with warm timber and architectural limestone opening to courtyard"
              loading="lazy"
            />

            {/* Interactive feature hotspots */}
            <div className="arch-hotspot" style={{ top: '65%', left: '32%' }} title="Soil-engineered foundation pad">
              <div className="arch-hotspot-inner" />
            </div>
            <div className="arch-hotspot" style={{ top: '48%', left: '59%' }} title="Panoramic thermal-insulated glass facade">
              <div className="arch-hotspot-inner" />
            </div>
            <div className="arch-hotspot" style={{ top: '75%', left: '71%' }} title="Private cantilevered terrace & landscape pool">
              <div className="arch-hotspot-inner" />
            </div>

            {/* Floating Glassmorphic Spec Card (Inspo 3) */}
            <div className="arch-floating-card">
              <h4>Hillside Crest Sanctuary</h4>
              <div className="arch-spec-grid">
                <div>
                  <span className="arch-spec-label">Architecture</span>
                  <span className="arch-spec-val">Vision Design Studio</span>
                </div>
                <div>
                  <span className="arch-spec-label">Plot Dimension</span>
                  <span className="arch-spec-val">3,400 sq.m Estate</span>
                </div>
                <div>
                  <span className="arch-spec-label">Zoning</span>
                  <span className="arch-spec-val">Residential R-1 Clear</span>
                </div>
                <div>
                  <span className="arch-spec-label">Timeline</span>
                  <span className="arch-spec-val">Turnkey in 9 Months</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6" data-reveal>
            <p className="text-sm text-slate-300 max-w-xl">
              Honest materials, seismic-tested structural frameworks, and natural daylight orientation. Designed to look breathtaking on day one and grow more cherished with every passing decade.
            </p>
            <Button asChild className="editorial-button !bg-white !text-slate-900 hover:!bg-neutral-100">
              <a href="#contact">Request Estate Dossier <ArrowUpRight size={16} /></a>
            </Button>
          </div>
        </section>

        {/* WHAT BUYERS ARE SAYING */}
        <section id="reviews" className="testimonials-section">

          <div className="testimonials-curved-wrapper" data-reveal>
            {/* Side pill notch buttons */}
            <button
              type="button"
              className="testimonials-side-notch-left"
              aria-label="Previous review"
              onClick={() => setTestimonialIndex((prev) => (prev === 0 ? 1 : 0))}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="testimonials-side-notch-right"
              aria-label="Next review"
              onClick={() => setTestimonialIndex((prev) => (prev === 1 ? 0 : 1))}
            >
              <ChevronRight size={22} />
            </button>

            <div className="testimonials-header">
              <h2>What Buyers Are Saying</h2>
              <p>
                Explore real journeys from families who found their dream plot and built their lifelong sanctuary with Terra Haven.
              </p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div>
                  <h3 className="testimonial-quote-title">
                    "I found our dream plot in less than a week"
                  </h3>
                  <p className="testimonial-quote-body">
                    "Terra Haven made the entire land acquisition and villa build process incredibly smooth. The team was attentive, knowledgeable, and genuinely cared about our family's safety and spatial needs. We moved in 2 months ahead of schedule with zero hidden expenses."
                  </p>
                </div>
                <div className="testimonial-author-row">
                  <div className="author-profile">
                    <img src={avatar1} alt="Daniel & Sarah S." className="author-avatar" />
                    <div>
                      <div className="author-name">Daniel & Sarah S.</div>
                      <div className="author-role">Homeowners, Oakwood Enclave</div>
                    </div>
                  </div>
                  <span className="quote-icon">“</span>
                </div>
              </div>

              <div className="testimonial-card">
                <div>
                  <h3 className="testimonial-quote-title">
                    "Fantastic experience from blueprint to handover!"
                  </h3>
                  <p className="testimonial-quote-body">
                    "We've bought and built properties before, but working with Terra Haven was a true game-changer. The soil testing and foundation checks were transparent, the drone updates kept us connected, and the structural finish is second to none."
                  </p>
                </div>
                <div className="testimonial-author-row">
                  <div className="author-profile">
                    <img src={avatar2} alt="Marcus H." className="author-avatar" />
                    <div>
                      <div className="author-name">Marcus H.</div>
                      <div className="author-role">Villa Owner, Parkview Heights</div>
                    </div>
                  </div>
                  <span className="quote-icon">“</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YOUR NEXT CHAPTER */}
        <section id="contact" className="section contact-section">
          <div className="section-kicker">
            <span>YOUR NEXT CHAPTER</span>
            <span>Begin With A Conversation</span>
          </div>
          <div className="contact-layout">
            <div data-reveal>
              <h2>
                Find your dream plot.<br />
                <span className="text-muted-foreground">Build the home you deserve.</span>
              </h2>
              <p className="contact-intro">
                Whether you’re seeking a clear-title residential plot, exploring custom villa designs, or ready to break ground with your family, our senior property advisors are here to guide every step.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <CheckCircle2 size={18} className="text-slate-500" />
                  <span>Free on-site plot inspections & soil analysis</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <CheckCircle2 size={18} className="text-slate-500" />
                  <span>100% legal title verification & encumbrance check</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <CheckCircle2 size={18} className="text-slate-500" />
                  <span>Fixed-price custom architectural build contracts</span>
                </div>
              </div>
            </div>

            <ProjectContact />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <a href="#main" className="identity-lockup">
            <span className="identity-mark">TH</span>
            <span>TERRA HAVEN</span>
          </a>
          <p className="!text-left mt-2">
            Verified Residential Plots · Custom Architectural Homes · Turnkey Family Living
          </p>
        </div>

        <nav aria-label="Footer navigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a href="#main" className="text-link">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}
