# SWECC design library

All styling goes through [StyleX](https://stylexjs.com). Styles compile to
atomic CSS at build time, and every style is type-checked.

## Layout

| File                                                          | What it holds                                                                          |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `tokens.stylex.ts`                                            | Colors, fonts, type scale, layout, radii, easings, media queries                       |
| `markers.stylex.ts`                                           | Markers for ancestor-driven styles (`stylex.when.ancestor`)                            |
| `Button.tsx`                                                  | `Button` (variants `primary`/`outline`/`ghost`, sizes `sm`/`md`/`lg`) and `ButtonIcon` |
| `Typography.tsx`                                              | `Heading`, `Text`, and `typeStyles` (hero, display, mono)                              |
| `SectionHeading.tsx`                                          | `Eyebrow`, `DisplayTitle`, `Accent`, `Lede`                                            |
| `Layout.tsx`                                                  | `Band` (full-bleed section) and `Container` (max-width wrapper)                        |
| `NavLink.tsx`                                                 | Router `NavLink` with StyleX `style` and `activeStyle` props                           |
| `Reveal.ts`                                                   | `useReveal` and the `reveal` styles for scroll-in animation                            |
| `Photo.tsx`, `Pill.tsx`, `TerminalWindow.tsx`, `SkipLink.tsx` | Smaller building blocks                                                                |
| `global.css`                                                  | The only hand-written CSS: document defaults, element resets, intro hooks              |

Import components from `../components` and tokens from
`../components/tokens.stylex` (StyleX needs the `.stylex` path to resolve
tokens at compile time).

## Composing styles

Every component takes a `style` prop typed as `StyleXStyles`. Styles passed
in are applied last, so they override the component's own:

```tsx
const styles = stylex.create({
  cta: { width: "100%" },
});

<Button variant="primary" size="lg" style={styles.cta}>
  <ButtonIcon icon={FiCalendar} />
  Add to calendar
</Button>;
```

`style` also accepts arrays and falsy values: `style={[a, isOpen && b]}`.

Always spread `stylex.props(...)` onto an element whole. Don't add a
separate `style={{ … }}` next to it: that replaces StyleX's inline
variables. Don't pick `.className` off it either. For values only known at
runtime, use a dynamic style:

```tsx
const styles = stylex.create({
  offset: (x: number, y: number) => ({
    transform: `translate(${x}px, ${y}px)`,
  }),
});

<div {...stylex.props(styles.window, styles.offset(x, y))} />;
```

When a component only accepts `className` (or a function returning one),
wrap it in the library once and give it StyleX props, as `NavLink` does.

Write colors, fonts, and breakpoints with tokens, not literals:

```tsx
import { colors, media } from "../components/tokens.stylex";

const styles = stylex.create({
  title: {
    color: colors.primary,
    fontSize: { default: "2rem", [media.max768]: "1.5rem" },
  },
});
```

To restyle a subtree, theme its variables with `stylex.createTheme`. See
`app/InitiativeCard.tsx` for an example: lavender cards override `cardVars.accent`.

## Scroll reveal

```tsx
const scope = useReveal<HTMLElement>();

<Band tone="grey" reveal={scope}>
  <Eyebrow path="about" style={[reveal.item, reveal.order(0)]} />
  <DisplayTitle style={[reveal.item, reveal.order(1)]}>…</DisplayTitle>
  <Photo src={img} alt="…" revealOrder={2} />
</Band>;
```

Items stay hidden until the band scrolls into view, then fade up in `order`.
With reduced motion turned on, nothing animates.

## Guardrails

`guards.test.ts` runs with `npm test` in CI and fails on:

- a border/background shorthand (see below)
- any stylesheet or CSS import besides `global.css`
- a hex color anywhere except `tokens.stylex.ts`
- an inline `style={{ … }}` object
- app code reading `.className` or `.style` off `stylex.props`
- a color in `global.css` that isn't a `colors` token value (StyleX hashes
  variable names, so `global.css` can't reference tokens directly)

Each failure names the file and the rule. Fix the code rather than the
guard; if a rule truly needs an exception, change it in the test with a
comment explaining why.

## StyleX gotchas

- **Use longhands for borders and backgrounds.** StyleX doesn't support
  `border`, `borderTop`, …, or `background`. The Vite plugin drops them
  silently instead of failing the build. Write `borderTopWidth` /
  `borderTopStyle` / `borderTopColor` or `backgroundColor`.
  `guards.test.ts` catches this.
- **Write `stylex.when.*` inline** as a computed key inside `stylex.create`.
  Hoisting one into a `const` leaves a call that throws at runtime.
- **Pass numbers as strings** for properties StyleX types as string-only
  (e.g. `gridRow: "2"`). Otherwise the style won't type-check as a `style`
  prop.
- **Select elements by data attribute, not class.** StyleX class names are
  hashed. The intro animation finds the hero through `data-intro-part`.
