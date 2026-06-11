# KEEPSTEAD™ — HOUSE RULES

**This file is law. Read it fully before you touch a single thing.**

You are working inside Keepstead™ — a personal finance and life-organization
platform. Tagline: *"Let's get your house in order."* This document is the single
binding source of truth for how this house gets built. If anything you are about to
do conflicts with this file, stop and flag it. Do not improvise. Do not build a
second version of something that already exists.

> **Why this exists:** Past sessions built duplicates that hid in the walls for weeks
> because nothing caught them at birth. This file is the foreman. Every swing of the
> hammer gets checked against the blueprint first.

---

## THE THREE STANDING RULES (the oath)

**1. Read before you build.**
Before creating any file, component, route, table, or RPC, search the repo for one
that already does the job. If it exists, extend it. If you genuinely must make a new
one, state in your report why the existing one could not serve.

**2. One instruction, named surfaces only.**
When given an instruction, build it on the exact file / route / table the spec names —
nowhere else. No parallel variants. No "while I was in there" extras. No duplicate
implementations of the same instruction.

**3. Report what you touched.**
Every deliverable ends with a complete list of every file created or modified. A
duplicate belongs in the report, not in an accidental discovery three weeks later.

---

## THE STACK — BUILD HERE, NOWHERE ELSE

| Thing | Value |
|---|---|
| Supabase project | **`odbwjifjszdttpegsgdb`** |
| Supabase URL | `https://odbwjifjszdttpegsgdb.supabase.co` |
| GitHub repo | `kari-kounkel/keepstead-pro` |
| Deploy branch | `main` → Vercel |
| Domain | `keepstead.pro` |
| Local path | `C:\dev\keepstead-pro` |
| Stack | React / Vercel / Supabase / Stripe |

**DO NOT BUILD ON THE LEGACY PROJECT.** Legacy Supabase `fufhjraudksavfncpdrm`,
GitHub `kari-kounkel/keepstead`, and `keepstead.karikounkel.com` are being retired
after data migration. Never write to them. Never reference them in new code.

---

## THE HOUSE — SEVEN ROOMS

Rooms are defined ONCE in `src/config/rooms.config.js`. Never hardcode a room
anywhere else. Add or remove a room in that one file and it must ripple everywhere.

| Room | Purpose |
|---|---|
| **Commons** | Front door + living room. Tasks, projects, boards, cross-room links, habit boards (Marbleverse). Shows a pulse of every other room. |
| **Provision** | Budget, bills, income, subscriptions, planning. |
| **Ledger** | Tax records, CPA info, current year, DIY or send to preparer. |
| **Stronghold** | Important documents, records, IDs — the fireproof box. |
| **Mending** | Past financial issues, credit rebuild, unfiled taxes. |
| **Legacy** | End-of-life wishes, accounts, contacts, digital instructions. |
| **Harvest** | Investing, starter to advanced, recommendations, growth. |

---

## PRICING — THE KEEPER LADDER

Pricing lives ONCE in `src/config/pricing.config.js`. Never hardcode a price or a
feature gate in the UI. Feature access is read from the user's tier in Supabase —
never from commented-out code or baked-in conditionals.

| Tier | Price | Includes |
|---|---|---|
| **Keeper Lite** | Free | Full use, no data persistence, login only |
| **Keeper** | $13/mo | All 7 rooms + storage + shareability |
| **Keeper+** | $20/mo | Creator boards in Commons |
| **Keeper Pro** | $20/mo | Business toggle (sole prop / partnership / single-member LLC only — NOT C-corp, NOT 501c3) |
| **Keeper X** | $27/mo | Everything unlocked |

Sharing: every room is shareable by the owner (paid accounts only). Viewers are free
and can upgrade if they want their own account.

Locked rooms/features show a **keyhole with a peek inside** + upgrade instructions.
No banners. No popups.

---

## THEMES — SEVEN, USER SETTINGS ONLY

Themes live ONCE in `src/config/themes.config.js`. Every color is already pulled from
`keepstead-themes.html` — never invent a hex code. Themes are a Settings feature, not
a marketing feature.

Alphabetical: **Daylight, Garden, Hearth, Slate, Stained Glass, Sunflower, Walnut.**

**Stained Glass is room-aware** — each room shifts the entire UI to its own color:

| Room | Color |
|---|---|
| Commons | cobalt blue `#2563EB` |
| Provision | amber gold `#D4A017` |
| Ledger | emerald green `#059669` |
| Stronghold | ruby red `#DC2626` |
| Mending | dusty rose `#B06080` |
| Legacy | deep plum `#7C3AED` |
| Harvest | burnt orange `#C2410C` |

---

## MIGRATION MAP

Keepstead Pro consolidates five legacy apps into ONE platform + ONE deploy. Retire
all old deploys AFTER data migration.

| Legacy app | Lands in |
|---|---|
| everything-board | Commons |
| credit-comeback | Mending |
| keepstead (tax organizer) | Ledger |
| keepstead2 | Ledger |
| marbleverse | Commons (as a habit-board type) |

Systeme.io — cancelled. Webflow — cancelled.

---

## HARD BUILD RULES — NON-NEGOTIABLE

- [ ] **No hardcoding anywhere.** Rooms, pricing, themes, feature gates — all
      config-driven. One file changes one thing everywhere.
- [ ] **RLS on every table.** No exceptions. No hardcoded user/org filtering in the
      UI — Supabase enforces who sees what.
- [ ] **No backticks in JSX.** String concatenation only.
- [ ] **Git uses forward slashes:** `cd /c/dev/keepstead-pro`. Never Windows
      backslash paths.
- [ ] **Keepstead™** — with the trademark — on first/prominent mentions.
- [ ] **Every HTML file** gets the Ask Kari widget before `</body>`:
      `<script src="https://chat.karikounkel.com/widget.js" defer></script>`
      plus the proprietary IP footer.
- [ ] **Read the actual file in the repo before modifying it.** Never rebuild from
      memory or from a past chat version.
- [ ] **End every code delivery with the quoted git commit description string only** —
      no `cd`, no `git add`, no `git push`, no command block.

---

## WHEN IN DOUBT

Stop. Flag the conflict against this file. Ask. A blocked instruction reported is
cheaper than a duplicate discovered.

*House Rules govern. The blueprint is locked. Now go build it right.*
