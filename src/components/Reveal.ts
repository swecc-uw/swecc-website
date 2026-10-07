import { useEffect, useRef } from "react";
import * as stylex from "@stylexjs/stylex";
import { revealMarker } from "./markers.stylex";
import { easings, media } from "./tokens.stylex";

/**
 * Scroll reveal. Pass `useReveal()` to a `Band`; anything inside it styled
 * with `reveal.item` fades up once the band scrolls into view, staggered by
 * `reveal.order(i)`.
 *
 *   const scope = useReveal<HTMLElement>();
 *   <Band tone="grey" reveal={scope}>
 *     <Eyebrow path="about" style={[reveal.item, reveal.order(0)]} />
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, "data-reveal": "pending" as const };
}

export type RevealScope<T extends HTMLElement = HTMLElement> = ReturnType<
  typeof useReveal<T>
>;

/** Milliseconds between consecutive `reveal.order` steps. */
export const REVEAL_STEP_MS = 80;

export const reveal = stylex.create({
  item: {
    transition: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor("[data-reveal]", revealMarker)]:
          `opacity 700ms ${easings.out}, transform 700ms ${easings.out}`,
      },
    },
    opacity: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor('[data-reveal="pending"]', revealMarker)]: 0,
      },
    },
    transform: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor('[data-reveal="pending"]', revealMarker)]:
          "translateY(1rem)",
      },
    },
  },
  order: (index: number) => ({
    transitionDelay: {
      default: null,
      [media.motionOK]: {
        default: null,
        [stylex.when.ancestor("[data-reveal]", revealMarker)]:
          `${index * REVEAL_STEP_MS}ms`,
      },
    },
  }),
});
