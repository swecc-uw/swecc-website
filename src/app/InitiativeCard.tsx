import React from "react";
import * as stylex from "@stylexjs/stylex";
import { FiArrowRight } from "react-icons/fi";
import {
  Button,
  ButtonIcon,
  Heading,
  REVEAL_STEP_MS,
  Text,
  reveal,
} from "@swecc/ui";
import { revealMarker } from "@swecc/ui/markers.stylex";
import { colors, easings, fonts, media } from "@swecc/ui/tokens.stylex";
import { cardVars } from "./InitiativeCard.stylex";
import { externalLinkProps } from "./Utils";

type InitiativeCardProps = {
  title: string;
  accent: "sage" | "lavender";
  file: string;
  blurb: string;
  cta: { label: string; href: string };
  /** Position in the section's reveal sequence; also times the typing. */
  revealOrder: number;
};

function InitiativeCard({
  title,
  accent,
  file,
  blurb,
  cta,
  revealOrder,
}: InitiativeCardProps) {
  const command = `cat ${file}`;

  return (
    <li
      {...stylex.props(
        styles.card,
        accent === "lavender" && lavender,
        reveal.item,
        reveal.order(revealOrder),
        stylex.defaultMarker(),
      )}
    >
      <div {...stylex.props(styles.panel)}>
        <Heading level={3} style={styles.title}>
          {title}
        </Heading>
        <Text style={styles.prompt}>
          <span aria-hidden {...stylex.props(styles.accentText)}>
            ~$
          </span>{" "}
          <span
            {...stylex.props(
              styles.typed,
              styles.typing(command.length, typingDelay(revealOrder)),
            )}
          >
            {command}
          </span>
          <span
            aria-hidden
            {...stylex.props(
              styles.caret,
              styles.caretTyping(command.length, typingDelay(revealOrder)),
            )}
          />
        </Text>
        <Text style={styles.output}>
          <span aria-hidden {...stylex.props(styles.glyph)}>
            &gt;
          </span>
          <span>{blurb}</span>
        </Text>
        <div {...stylex.props(styles.action)}>
          <Button
            variant="primary"
            size="lg"
            href={cta.href}
            {...externalLinkProps(cta.href)}
            style={styles.button}
          >
            {cta.label}
            <ButtonIcon icon={FiArrowRight} style={styles.arrow} />
          </Button>
        </div>
      </div>
    </li>
  );
}

const lavender = stylex.createTheme(cardVars, { accent: colors.accent });

// The panel lifts off a solid "side" by stacking 1px shadows.
const side = `color-mix(in srgb, ${cardVars.accent} 55%, ${colors.background})`;
const extrude = `1px 1px ${side}, 2px 2px ${side}, 3px 3px ${side}, 4px 4px ${side}, 5px 5px ${side}, 6px 6px ${side}`;
const flush = `0 0 ${side}, 0 0 ${side}, 0 0 ${side}, 0 0 ${side}, 0 0 ${side}, 0 0 ${side}`;
const radius = "2rem 0 2rem 0";
const frame = "5px";
// The command types out once the card has started fading in.
const typingDelay = (order: number) => `${order * REVEAL_STEP_MS + 350}ms`;
const TYPE_MS_PER_CHAR = 45;

const caretTyping = stylex.keyframes({
  from: { backgroundColor: cardVars.accent },
  to: { backgroundColor: "transparent" },
});

const caretBlink = stylex.keyframes({
  "0%": { opacity: 1 },
  "49%": { opacity: 1 },
  "50%": { opacity: 0 },
  "100%": { opacity: 0 },
});

const styles = stylex.create({
  card: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    // A grid item's aspect-ratio fixes its height, so a spacer sets the
    // minimum and the cell still grows when the copy runs longer.
    "::before": {
      content: '""',
      gridArea: "1 / 1",
      aspectRatio: { default: "2 / 3", [media.max600]: "4 / 5" },
    },
  },
  panel: {
    position: "relative",
    gridArea: "1 / 1",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    padding: "1.6rem 1.5rem 1.5rem",
    backgroundColor: colors.surface,
    borderWidth: frame,
    borderStyle: "solid",
    borderColor: cardVars.accent,
    borderRadius: radius,
    boxShadow: {
      default: flush,
      [media.hoverFine]: {
        default: null,
        [stylex.when.ancestor(":hover")]: extrude,
      },
      [stylex.when.ancestor(":active")]: flush,
      [stylex.when.ancestor(":has(a:focus-visible)")]: extrude,
    },
    translate: {
      default: null,
      [media.hoverFine]: {
        default: null,
        [stylex.when.ancestor(":hover")]: "-6px -6px",
      },
      [stylex.when.ancestor(":active")]: "0 0",
      [stylex.when.ancestor(":has(a:focus-visible)")]: "-6px -6px",
    },
    scale: {
      default: null,
      [media.hoverNone]: {
        default: null,
        [stylex.when.ancestor(":active")]: 0.98,
      },
    },
    outline: {
      default: null,
      [stylex.when.ancestor(":has(a:focus-visible)")]:
        `2px solid ${colors.text}`,
    },
    outlineOffset: {
      default: null,
      [stylex.when.ancestor(":has(a:focus-visible)")]: "4px",
    },
    transition: {
      default: null,
      [media.motionOK]: `translate 220ms ${easings.out}, box-shadow 220ms ${easings.out}, scale 120ms ${easings.out}`,
    },
    transitionDuration: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor(":active")]: "80ms",
      },
    },
  },
  title: {
    margin: 0,
    fontFamily: fonts.hero,
    fontWeight: 800,
    fontSize: "clamp(1.25rem, 1rem + 0.6vw, 1.5rem)",
    lineHeight: 1.1,
    letterSpacing: "0.005em",
    textTransform: "uppercase",
    color: colors.text,
    textWrap: "balance",
    // Two lines tall so prompts line up whether or not the title wraps.
    minHeight: "2lh",
  },
  prompt: {
    margin: 0,
    fontFamily: fonts.mono,
    fontSize: "0.875rem",
    lineHeight: 1.4,
    color: colors.text,
    whiteSpace: "nowrap",
  },
  accentText: {
    color: cardVars.accent,
  },
  typed: {
    display: "inline-block",
    fontFamily: "inherit",
    overflow: "hidden",
    verticalAlign: "bottom",
  },
  typing: (chars: number, delay: string) => ({
    width: {
      default: `${chars}ch`,
      [media.motionOK]: {
        default: `${chars}ch`,
        [stylex.when.ancestor('[data-reveal="pending"]', revealMarker)]: "0",
      },
    },
    transition: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor('[data-reveal="shown"]', revealMarker)]:
          `width ${chars * TYPE_MS_PER_CHAR}ms steps(${chars})`,
      },
    },
    transitionDelay: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor('[data-reveal="shown"]', revealMarker)]: delay,
      },
    },
  }),
  caret: {
    position: "relative",
    display: "inline-block",
    width: "0.6em",
    height: "1.1em",
    marginLeft: "0.15em",
    verticalAlign: "-0.2em",
    animationName: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor('[data-reveal="shown"]', revealMarker)]:
          caretTyping,
      },
    },
    animationTimingFunction: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor('[data-reveal="shown"]', revealMarker)]:
          "steps(1)",
      },
    },
    animationFillMode: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor('[data-reveal="shown"]', revealMarker)]: "both",
      },
    },
    "::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundColor: cardVars.accent,
      opacity: 0,
      animationName: {
        default: null,
        [media.motionOK]: {
          default: null,
          [stylex.when.ancestor(":hover")]: caretBlink,
          [stylex.when.ancestor(":has(a:focus-visible)")]: caretBlink,
        },
      },
      animationDuration: "1s",
      animationTimingFunction: "steps(1)",
      animationIterationCount: "infinite",
    },
  },
  // The caret stays solid while the command types, then hides.
  caretTyping: (chars: number, delay: string) => ({
    animationDuration: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor('[data-reveal="shown"]', revealMarker)]:
          `${chars * TYPE_MS_PER_CHAR + 400}ms`,
      },
    },
    animationDelay: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor('[data-reveal="shown"]', revealMarker)]: delay,
      },
    },
  }),
  output: {
    margin: 0,
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    columnGap: "0.6em",
    fontSize: "1rem",
    lineHeight: 1.6,
    color: colors.textMuted,
    textWrap: "pretty",
  },
  glyph: {
    fontFamily: fonts.mono,
    color: cardVars.accent,
  },
  action: {
    marginTop: "auto",
    paddingTop: "0.5rem",
  },
  button: {
    height: "2.75rem",
    padding: "0 1.25rem",
    fontSize: "0.9375rem",
    outline: { default: null, ":focus-visible": "none" },
    // Stretch the link over the whole card.
    "::after": {
      content: '""',
      position: "absolute",
      inset: `calc(${frame} * -1)`,
      borderRadius: radius,
    },
  },
  arrow: {
    transform: {
      default: null,
      [media.hoverFine]: {
        default: null,
        [stylex.when.ancestor(":hover")]: "translateX(3px)",
      },
    },
    transition: {
      default: null,
      [media.motionOK]: `transform 200ms ${easings.out}`,
    },
  },
});

export default InitiativeCard;
