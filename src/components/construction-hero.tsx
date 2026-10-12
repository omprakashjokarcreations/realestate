import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { constructionVideo, progressToTime } from '@/lib/video-config';

export function ConstructionHero() {
  const hero = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const section = hero.current;
    const media = video.current;
    if (!section || !media) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let trigger: ScrollTrigger | undefined;
    let frame = 0;
    let target = 0;
    let disposed = false;
    let seekStarted = 0;
    let currentStage = 0;
    let watchdog: ReturnType<typeof setInterval> | undefined;
    // Text depth is a separate visual plane; it never changes the media target.
    const updateDepth = (progress: number) => {
      if (heading.current) heading.current.style.transform = `translate3d(0, ${-12 * progress}px, 0) scale(${1 - 0.018 * progress})`;
      if (copy.current) {
        copy.current.style.opacity = String(Math.max(0, 1 - progress * 1.6));
        copy.current.style.transform = `translate3d(0, ${-6 * progress}px, 0)`;
      }
    };
    const fail = () => {
      if (disposed) return;
      setFallback(true);
      trigger?.kill();
      trigger = undefined;
      cancelAnimationFrame(frame);
      frame = 0;
      updateDepth(0);
      ScrollTrigger.refresh();
    };
    const seek = () => {
      frame = 0;
      if (disposed || media.seeking || Math.abs(media.currentTime - target) < 0.045) return;
      seekStarted = performance.now();
      try { media.currentTime = target; } catch { fail(); }
    };
    const schedule = () => { if (!frame && !disposed) frame = requestAnimationFrame(seek); };
    const onSeeked = () => { seekStarted = 0; schedule(); };
    const setup = () => {
      if (disposed || trigger || reduced.matches || !Number.isFinite(media.duration) || media.seekable.length === 0) return;
      trigger = ScrollTrigger.create({
        id: 'construction-sequence', trigger: section, start: 'top top',
        end: () => `+=${window.innerHeight * (window.matchMedia('(max-width: 767px)').matches ? constructionVideo.mobileScreens : constructionVideo.desktopScreens)}`,
        pin: true, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: self => {
          // Reach the final frame before the pin releases, leaving a short completed-house hold.
          const progress = Math.min(1, self.progress / 0.94);
          target = progressToTime(progress, media.duration);
          schedule();
          const nextStage = Math.min(4, Math.floor(progress * 5));
          if (nextStage !== currentStage) { currentStage = nextStage; setStage(nextStage); }
          updateDepth(progress);
          if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
        },
      });
      target = progressToTime(Math.min(1, trigger.progress / 0.94), media.duration);
      updateDepth(Math.min(1, trigger.progress / 0.94));
      schedule();
      ScrollTrigger.refresh();
    };
    const motionChange = () => {
      trigger?.kill(); trigger = undefined;
      cancelAnimationFrame(frame); frame = 0;
      updateDepth(0);
      if (reduced.matches) { setFallback(true); } else { setFallback(false); setup(); }
      ScrollTrigger.refresh();
    };
    if (reduced.matches) setFallback(true);
    const onLoaded = () => {
      try {
        if (media.currentTime === 0) {
          media.currentTime = 0.001;
        }
      } catch {
        // Ignored
      }
      setup();
    };

    media.addEventListener('loadedmetadata', onLoaded);
    media.addEventListener('loadeddata', onLoaded);
    media.addEventListener('progress', setup);
    media.addEventListener('canplay', onLoaded);
    media.addEventListener('seeked', onSeeked);
    reduced.addEventListener('change', motionChange);

    // Initial trigger to load video frame right away
    if (media.readyState >= 1) {
      onLoaded();
    }

    return () => {
      disposed = true;
      trigger?.kill();
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      clearInterval(watchdog);
      media.removeEventListener('loadedmetadata', onLoaded);
      media.removeEventListener('loadeddata', onLoaded);
      media.removeEventListener('progress', setup);
      media.removeEventListener('canplay', onLoaded);
      media.removeEventListener('seeked', onSeeked);
      reduced.removeEventListener('change', motionChange);
    };
  }, []);

  return (
    <section ref={hero} className="construction-hero" aria-label="Your home taking shape">
      <div className="hero-film" aria-hidden="true">
        <video
          ref={video}
          preload="auto"
          muted
          playsInline
          tabIndex={-1}
        >
          <source src={constructionVideo.compatibleSrc} type="video/mp4" />
          <source src={constructionVideo.src} type="video/mp4" />
        </video>
      </div>
      <div className="hero-contrast" aria-hidden="true" />
    <div className="hero-overlay">
      <div className="hero-content-left">
        <div ref={heading} className="hero-heading">
          <h1>Find your dream plot.<br /><span>Build & move in.</span></h1>
        </div>
        <div ref={copy} className="hero-support">
          <p>Handpicked residential land, bespoke architectural design, and turnkey construction crafted for your family's next generation.</p>
          <div className="hero-actions">
            <Button asChild className="editorial-button"><a href="#featured">Explore Plots & Villas <ArrowUpRight size={16} /></a></Button>
            <a href="#process" className="text-link">How We Build Together <ArrowUpRight size={14} /></a>
          </div>
        </div>
      </div>
    </div>
    <div className="hero-bottom">
      <a className="scroll-cue" href="#featured"><ArrowDown size={14} /><span>Scroll down to watch construction progress</span></a>
      <div className="film-stage">
        <span>{['Soil testing & plot marking', 'Foundation & footings', 'Framing & structural core', 'Interior craft & glazing', 'Move in with your family'][stage]}</span>
        <div className="film-track"><div ref={bar} /></div>
      </div>
    </div>
  </section>
  );
}
