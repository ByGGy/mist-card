```markdown
# Design System Strategy: The Architect’s Deck

## 1. Overview & Creative North Star
### Creative North Star: "The Kinetic Blueprint"
This design system moves away from the static, cluttered aesthetics of traditional gaming tools. Instead, it adopts **The Kinetic Blueprint**—a philosophy that blends the high-stakes precision of a developer IDE with the visceral, tactile energy of a Trading Card Game (TCG). 

We reject the "flat" web. We embrace a multi-layered, atmospheric workspace where game mechanics are treated as data architecture. By using intentional asymmetry, overlapping "glass" panels, and a high-contrast typographic scale, we create a signature experience that feels less like a website and more like a high-end terminal for digital alchemy.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is rooted in `surface` (#0c0e11), a deep charcoal that serves as our "void." We do not use borders to define space; we use light.

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Structural definition must be achieved through background shifts. For example, a sidebar should use `surface-container-low` against a `surface` main stage. 
*   **Surface Hierarchy & Nesting:** Use the `surface-container` tiers to create "nested" depth. 
    *   **Level 0 (Background):** `surface` (#0c0e11)
    *   **Level 1 (Sections):** `surface-container-low` (#111417)
    *   **Level 2 (Cards/Widgets):** `surface-container` (#171a1d)
    *   **Level 3 (Popovers/Active Modals):** `surface-container-highest` (#23262a)
*   **The "Glass & Gradient" Rule:** Primary actions and hero elements should utilize subtle linear gradients (e.g., `primary` #69daff to `primary-container` #00cffc). For floating game-editor panels, apply **Glassmorphism**: use `surface-variant` at 60% opacity with a `24px` backdrop-blur to allow the underlying game board to bleed through.
*   **Signature Textures:** Interactive elements like active card slots should use a subtle inner glow using `secondary` (#a68cff) at 10% opacity rather than a standard drop shadow.

---

## 3. Typography: The Editorial Edge
We use a tri-font system to distinguish between "The Game," "The Tool," and "The Data."

*   **The Brand (Display/Headline):** `Space Grotesk`. Use this for large headers and game titles. Its geometric, slightly quirky terminals provide the "gaming aesthetic."
*   **The Tool (Title/Body):** `Inter`. This is our workhorse. Use it for the editor interface, settings, and general UI. It provides the "developer tool" professional polish.
*   **The Data (Labels):** `Manrope`. Used for small metadata, card stats, and technical labels. It remains legible even at `label-sm` (0.6875rem).

**Scale Strategy:** To break the template look, use extreme contrast. Pair a `display-lg` heading with a `label-md` sub-caption immediately beneath it to create an editorial, high-fashion layout.

---

## 4. Elevation & Depth: Tonal Layering
In this system, "Up" is "Lighter." 

*   **The Layering Principle:** Depth is achieved by stacking. A card (`surface-container-lowest`) sitting on a panel (`surface-container-low`) creates a natural, soft-edge lift. 
*   **Ambient Shadows:** For floating tooltips or context menus, use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow is not grey; it is a darker tint of the background to ensure it feels like a natural obstruction of light.
*   **The "Ghost Border" Fallback:** When high-density data requires containment (like in complex game mechanics tables), use a **Ghost Border**. Apply `outline-variant` (#46484b) at 15% opacity. It should be felt, not seen.
*   **Interactive Illumination:** When an element is focused or "active," don't just change the color—add a subtle `surface_tint` (#69daff) overlay at 4% to make the entire component feel energized.

---

## 5. Components

### The "Blueprint" Card
*   **Structure:** No borders. Background: `surface-container`.
*   **Visuals:** Use a 4px `lg` corner radius. 
*   **Interaction:** On hover, shift background to `surface-container-high` and add a `primary` top-border (2px) to signify selection.

### Specialized Mechanic Editor (The "Node")
*   **Visuals:** Use `surface-container-lowest` for the input area to create an "inset" look.
*   **Typography:** Labels in `manrope` (all-caps, 0.1em letter spacing) using `on-surface-variant`.
*   **Gradients:** Use a vertical gradient of `secondary` to `secondary-dim` for "Save" or "Execute" buttons.

### Data Tables (The "Ledger")
*   **Rules:** Forbidden: horizontal/vertical divider lines.
*   **Spacing:** Use `0.75rem` vertical padding. Alternate row colors between `surface` and `surface-container-low` for readability. 
*   **Headers:** Use `title-sm` in `primary` color to anchor the columns.

### Buttons & Chips
*   **Primary:** Solid `primary` background with `on-primary` text. No border.
*   **Secondary:** Glassmorphic. `surface-variant` at 20% opacity with a `outline-variant` (20% opacity) ghost border.
*   **Chips:** Pill-shaped (`full` roundedness). Use `tertiary-container` for mechanic tags (e.g., "Battlecry", "Deathrattle") to differentiate them from UI actions.

---

## 6. Do’s and Don'ts

### Do
*   **Do** use asymmetrical layouts. For example, align a header to the far left and the primary CTA to the far right, with 64px of breathing room.
*   **Do** use `primary` (#69daff) sparingly. It is a laser, not a paint bucket. Use it to draw the eye to the most critical interaction.
*   **Do** use backdrop blurs on sidebars to create a sense of environmental depth.

### Don’t
*   **Don't** use pure white (#FFFFFF). Always use `on-surface` (#f9f9fd) to prevent eye strain in dark environments.
*   **Don't** use standard 1px borders to separate content. Use a 16px gap or a tonal shift.
*   **Don't** use "flat" buttons. Even a 2% gradient or a 1px ghost border adds the necessary "premium" weight required for a pro-level tool.
*   **Don't** clutter the view. If a mechanic is complex, use a "drawer" (surface-container-high) that slides over the UI rather than cramming more fields into a flat grid.

---
**Director's Note:** Remember, we are building a tool for creators. The UI should be the stage, not the performance. Keep the containers dark and muted so that the user's card art and game mechanics are the only things that truly "pop."```