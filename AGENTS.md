<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Keep the editorial experience on the index route with hash navigation between its sections; this is a single continuous story.
- Keep replaceable footage paths and timing in a browser-safe video config; this separates media from scroll behavior.
- Use GSAP ScrollTrigger and a real paused video with serialized animation-frame seeks; this supports deterministic forward and reverse scrolling without autoplay.
- Submit enquiries through a validated public server function using an anonymous insert-only client; private enquiries must never be publicly readable.
