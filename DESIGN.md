# Moore Covenant Productions — Site Design Brief (Oct 2026 rebuild)

Agreed with Elijah on 2026-10-13. Every page change should check against this.

## The idea: "Next stop."
DC Metro is the spine of the site. Movies are the feel. The logo is already a Metro sign
(the M in the oval pill). The site finally uses that.

- **The line.** A thin gold line runs down the page like a Metro map. Every major section is a
  station: a gold dot on the line plus a small signage-style label ("Work", "Services",
  "The Founder"). The line draws itself as you scroll. Never says "DC" out loud.
- **The pill.** The logo's rounded oval is the shape language. Buttons, tags, image crops,
  and the founder portrait use the pill. Rectangles are for video only.
- **Letterbox.** Hero and full-width video get 2.39:1 cinema bars. Section eyebrows read like
  a slate ("Scene 02 / Services"). Footer rolls like end credits.
- **Real DC, not postcard DC.** Metro coffered ceilings, night streets, Georgetown,
  the Kennedy Center, city lights flickering. Clients' actual locations. No Capitol dome,
  no cherry blossoms, no stock.
- **City vibe.** Flickering lights, skyline at night, motion in the background. Go-go in the
  music player (Apple Music embed, same component as before).
- **Logo moment.** Animated M that lights up like a Metro sign on load. Full wordmark in the
  nav instead of the text "MCP". Higgsfield can generate an ambient Metro tunnel / light-streak
  loop behind the headline if real footage runs short. Ask before spending credits.

## Color
- Black `#080808` + gold `#c4974a` stays. Cream `#f0ebe0`.
- **Cream sections.** Hero and Work stay black. Services and pricing flip to cream with black
  type and gold accents, like a printed program. Alternate black / cream down the page.
- No Metro Red for now.

## Type
- Cormorant Garamond for display (bigger than before: `text-display-hero` and `text-display-huge`).
- Inter for body and for Metro-signage style labels (uppercase, tracked, small).

## Copy rules (from Elijah)
- No em dashes. No AI-sounding language. No stacked "every X, every Y, every Z".
- Plain human sentences. Faith stays in the voice, not as a sales pitch.
- Title everywhere: **Founder & Creative Director, Moore Covenant Productions**
  (LinkedIn headline also carries "Brand Architect & Social Media Strategist" and
  "Brand Strategy, Content & Film").
- He is not a "filmmaker" in copy. He makes films; the label he uses is creative director /
  brand architect.

## Services and prices (public)
- Social Media Management, 3 month minimum: Starter $1,500/mo, Growth $2,750/mo,
  Sovereign $5,000/mo. Annual Covenant Plan $20,000/yr prepaid.
- Video Production: Content day from $1,500. Brand films, event/livestream edits, short films
  quoted per project.
- Websites & Brand: starting at $1,000, scoped on a call. Care plan $150/mo or $1,200/yr.
  Internal tiers ($1,000 / $1,500–2,500 / $3,000–5,000+) are NOT published.

## Work to feature
Hair Academy MD (1K → 14K IG, 15M+ views), Dieu Trippin (0 → 255K TikTok, 24.8M likes),
Morena Cafe DC (7.5K → 20K), ELEV8D Innovations (current partner, shorts series),
Nicholas Padilla Miami reels (best reels + highlight), Desire Delights website,
121 Auto Repair website, the short film (no title or names shown).
Do NOT show: the Superior Court campaign (Utrophia Robinson), Jayzui, Barton Rogers.

## Partners row (logo + link)
Only two: **Market Research Design LLC** (Julian, "MR Dubs", tagline "Unique Brand Solutions")
and **Sam Studios**. Desire Delights is a client, not a partner. AMD Branding: not shown.

## Founder imagery
Use the Instagram photo of Elijah and his wife at the cafe (brown cardigan, black tie, warm
light; post DcED362EYRi, Aug 15 2026) for the founder / CEO spot. Caption him as
Founder & Creative Director.

## Media in /public
- `hero/reel.mp4` + `reel-poster.jpg`: hero loop (placeholder cut from ELEV8D, Nick Padilla,
  Jakei footage until Elijah sends his own reel). Target under 3 MB.
- `work/*.mp4` + `.jpg`: 720x1280 reel previews with posters.
- `brand/`: logo pill (gold / white) and monogram from moore-covenant-contracts/brand/assets.

## Update 2026-10-13 (evening)
- Phone everywhere: (202) 407-5248.
- Partner links: Market Research Design LLC → https://mrdubs.com/ ; Sam Studios → https://thesamstudio.mypixieset.com/portfolio/ ; AMD Branding → instagram.com/amdbranding (Atlanta, "design your future").
- No DMV street B-roll anywhere (Elijah's call). City atmosphere comes from Higgsfield plates in `public/dc/`:
  `kennedy-night.jpg` (Home CTA, Services hero) and `georgetown-night.jpg` (About hero, Work hero). Nano Banana Pro, 16:9, 2 credits each.
- Short film shown with no title and no names. No personal names on photos (founder photo captioned by title only).
- Opening: `public/hero/intro.mp4` = Blender 3D emblem push-through (scratchpad `logo3d.py`), then `reel.mp4` loop (ELEV8D installs, Nick, the film).
- The ride: `components/ui/TrainRide.tsx` scroll-scrubs `public/train/t_0001..0272.webp` (every 3rd frame of the 816-frame Blender Metro render, `metro_train.py`). Stops at frames 30 / 98 / 166 / 234 → Social, Video, Websites, Your Brand.

## Update 2026-10-14 (early morning)
- Opening is now: logo pops and lights up → camera pushes into the oval → the Higgsfield DC aerial
  (`public/dc/aerial-night.jpg`) is revealed inside the oval and pulls closer → through the oval into
  the city → fade. Rendered by `opening.py` (168 frames) into `public/hero/intro.mp4`.
- After the opening the hero rests on the Higgsfield night-tunnel Metro interior
  (`public/dc/metro-interior-night.jpg`, generated from Elijah's reference photo in `design/`),
  then scrolling starts the ride. The work-footage loop (`hero/reel.mp4`) is no longer used in the hero.
- Higgsfield credits used so far: 5 images x 2 = 10 (one NSFW false flag refunded).
