# Ground-Truth Visual Specification

The supplied discovery-interface reference is the ground truth for the implementation. The application will reproduce its **dark app shell**, **compact top navigation**, **persistent left rail**, **large promotional banner**, **high-density portrait catalog**, **pink operational accents**, and **fixed cookie panel**. Fidelity to visual structure, rhythm, control sizing, and responsive behavior takes priority over reproducing the original product identity or copy.

## Chosen Approach: Editorial Discovery Console

**Design Movement:** Contemporary dark-media interface with premium editorial card design.

**Core Principles:** The page must make browsing feel continuous rather than segmented; visual hierarchy comes from photography and scale rather than heavy borders; pink accents are reserved for activation and conversion; every reusable card preserves the same image-to-copy rhythm.

**Color Philosophy:** Deep graphite carries the entire canvas so portraits become the content color. Soft-white copy creates crisp hierarchy, muted gray supports secondary detail, and a warm coral-pink accent directs selection, status, and primary action.

**Layout Paradigm:** A header-and-sidebar shell frames a horizontally expansive scrolling catalog. The card grid grows directly from the content gutter rather than sitting inside a centered marketing container.

**Signature Elements:** A low-contrast black photo gradient, miniature coral status lozenges, and a translucent cookie panel with one decisively pink action.

**Interaction Philosophy:** Interaction is fast and restrained. Filters update locally, menu actions are reversible, and card movement is limited to short lift-and-scale responses.

**Animation:** Card hover elevation, 160ms active button press, brief sidebar transitions, and no continuous decorative animation. All non-essential motion respects reduced-motion settings.

**Typography System:** Outfit provides the crisp display hierarchy; Manrope carries small UI copy and descriptions. Headings use 600–700 weight, labels use 600 weight, and summaries use 500 weight at a low contrast.

**Brand Essence:** A visual discovery space for people who want a structured, premium way to browse dynamic personas; editorial, confident, and inviting.

**Brand Voice:** Short, direct, and lightly playful. Example lines: “Find your next conversation.” and “New stories, one scroll away.”

**Wordmark & Logo:** A lowercase wordmark paired with a sparkle-heart symbol, using the coral accent only on the last syllable.

**Signature Brand Color:** Signal coral — `#ff6388`.

## Style Decisions

The desktop application retains three catalogue columns at reference-like widths and moves to four only on unusually wide displays. The sidebar collapses behind a menu button below 980px, and cards reduce to two then one column without losing their portrait ratio or gradient overlay.

## Interaction Extensions

The next refinement adds local, reversible interactions that do not require a backend: banner and experience navigation, profile-detail drawers, visible saved states, contextual collection filtering, and lightweight activity confirmation. On mobile, a fixed bottom dock becomes the primary way to reach discovery, saved profiles, and account actions, while the off-canvas sidebar retains the complete navigation map.

## Route Expansion Map

The next release preserves the same charcoal app shell, narrow icon-led sidebar, coral action color, rounded editorial media, and high-density card rhythm. The **character profile** route uses a full-width image composition with a restrained metadata rail, a tabbed editorial narrative, and clear routes into the conversation view. The **collection** route reuses the catalogue grid and its filter language while focusing on locally saved profiles and an intentional empty state. The **conversation** route replaces the generic chat component because its default dashboard styling and server-LLM contract would dilute the established visual language; it instead uses a bespoke, locally interactive composition that feels native to the rest of the product and is clearly presented as a demo interaction.
