import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

const subscribe = () => () => {};

// False during prerender and hydration, true once mounted on the client.
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function useRevealOnce<T extends HTMLElement>() {
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
  return ref;
}

export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
