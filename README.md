# Vision Builders

Build a premium, Apple-inspired custom home construction website with an exceptional editorial design and immersive scroll-driven storytelling.

The website must feel like a high-end architecture studio designed it. Avoid generic AI-generated website layouts, excessive cards, gradients, glassmorphism, unnecessary icons, fake statistics and template-like sections.

## Design direction

Create a sophisticated, minimal, architecture-focused website with:

- Warm off-white backgrounds
- Deep charcoal typography
- Large editorial headlines
- Refined typography using Inter or Geist, with an elegant serif accent if appropriate
- Generous whitespace
- Beautiful architectural imagery
- Precise alignment and restrained animations
- Clean responsive layouts

Use React, TypeScript and Tailwind CSS with the project's existing stack. Use GSAP and ScrollTrigger for the pinned scroll-driven video experience if compatible with the project.

Do not invent a company name, logo, testimonials, awards, prices or contact details.

## 1. Hero section: Build your dream home

Create a full-viewport hero section featuring my supplied 10-second residential construction video.

The video shows a house progressing from a concrete foundation through timber framing, roof construction, exterior finishing and a completed house elevation.

Use the supplied video as the main visual asset. Do not generate a replacement or add branding to the footage.

Hero copy:

Eyebrow: CUSTOM HOMES · BUILT AROUND YOU

Headline:
"Your dream home.
Built from the ground up."

Supporting text:
"From the first foundation pour to the final detail, watch your vision take shape through thoughtful design and exceptional craftsmanship."

Primary CTA: Start Your Project

Secondary link: Explore Our Process

Keep the composition clean, cinematic and architectural. Avoid overcrowding the video with text.

## 2. Critical feature: Scroll-controlled pinned video

This is the most important technical requirement.

Implement a genuine scroll-driven video using a real HTML video element and GSAP ScrollTrigger.

The hero must pin to the viewport while the visitor scrolls through the construction sequence.

Requirements:

1. Pin the hero section at 100svh.
2. Create approximately 300% viewport height of scroll distance for the pinned sequence.
3. Map scroll progress from 0 to 1 to video time from 0 to 10 seconds.
4. Synchronise video.currentTime with scroll progress so scrolling down advances the construction and scrolling up reverses it.
5. Keep the headline and CTA fixed within the pinned hero while the video progresses.
6. Gradually reduce the supporting copy's opacity as the visitor moves through the sequence.
7. Keep the completed house visible at the end of the video.
8. Release the pinned section only after the video reaches its final frame.
9. Allow normal scrolling to continue into the next section.
10. Support reverse scrolling without restarting the animation unexpectedly.

The video must not simply autoplay independently of the visitor's scroll position.

Do not simulate the effect using seven static images or a CSS slideshow. Use the actual supplied video.

## 3. Video implementation and performance

Create a configurable video asset path, such as /videos/construction-timelapse.mp4, that can be replaced with my uploaded video.

Use preload="metadata" and display a poster image from the foundation stage while the video loads.

Wait for the video metadata and seekable duration to be available before enabling scroll synchronisation.

Use requestAnimationFrame or an equivalent efficient mechanism to avoid excessive video seeking. Avoid redundant currentTime updates and prevent flickering.

Use a scroll distance that gives the 10-second construction sequence enough time to be appreciated.

Handle video loading failures gracefully. If video seeking is unreliable on mobile, provide a usable fallback rather than a broken hero.

Respect prefers-reduced-motion and provide a static or simplified alternative.

Do not add video controls, audio, text overlays, logos or watermarks.

## 4. Navigation

Create a minimal navigation bar with a typographic placeholder on the left.

Links:
- Our Approach
- The Process
- Projects
- Contact

Primary button: Start Your Project

Keep navigation elegant, compact and accessible. Use a transparent background over the opening hero if text remains readable, transitioning to a solid warm-white background when scrolling into the remaining sections.

## 5. Following sections

Create the following sections using premium editorial layouts rather than generic cards.

**Section A: Introduction**

Headline: "More than a house. A place that's yours."

Explain the value of thoughtful design and a home tailored to the client's lifestyle.

**Section B: Process**

Headline: "From the first sketch to the final detail."

Present four stages:
01 Discover
02 Design
03 Build
04 Complete

Use generous spacing, refined typography and subtle scroll reveals.

**Section C: Architecture**

Headline: "Thoughtfully designed. Carefully built."

Show large architectural images, natural materials, structural details and craftsmanship.

**Section D: Projects**

Headline: "Spaces worth coming home to."

Create an editorial architectural portfolio. Do not invent real project names, locations or client testimonials. Use replaceable placeholders until actual content is provided.

**Section E: Contact**

Headline: "Let's build something that feels like home."

Create a functional contact form with name, email, optional phone number, project type and project description. Include validation and clear submission feedback. Do not claim a form was submitted successfully unless the submission actually succeeds.

## 6. Footer

Keep the footer minimal with navigation, a placeholder for the actual company identity, and contact details only when supplied.

## 7. Responsive design

Desktop: use the complete pinned scroll-driven video experience.

Mobile: preserve the construction storytelling while reducing the pin duration where appropriate. Ensure the house remains visible and the text remains readable.

Avoid horizontal overflow, unexpected layout shifts and excessive scroll trapping.

## 8. Quality standards

Use semantic HTML, accessible controls, responsive typography, keyboard navigation and efficient media loading.

Keep animations subtle and intentional. Avoid bouncy effects, animated gradients, excessive parallax and decorative elements that distract from the architecture.

Build a fully functioning website, not just a static mockup.

First inspect the project structure, then implement the design and video interaction. After implementation, test the scroll synchronisation, reverse scrolling, video loading, responsive behaviour and transition into the next section.

remember its not a construction company

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a1397f94-3e81-4e9e-b983-dc8574fa75de).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
