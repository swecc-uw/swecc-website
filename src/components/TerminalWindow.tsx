import React, {
  type ComponentPropsWithoutRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { colors, fonts } from "./tokens.stylex";

type Offset = { x: number; y: number };

type Metrics = {
  width: number;
  height: number;
  layoutLeft: number;
  layoutTop: number;
  bounds: { left: number; top: number; right: number; bottom: number };
};

type DragState = {
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  metrics: Metrics;
  cleanup: () => void;
};

type TerminalWindowProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "children"
> & {
  children: ReactNode;
  draggable?: boolean;
  boundsRef?: RefObject<HTMLElement | null>;
  style?: StyleXStyles;
  bodyStyle?: StyleXStyles;
};

/** A macOS-style window frame, optionally draggable within `boundsRef`. */
export function TerminalWindow({
  children,
  draggable = false,
  boundsRef,
  style,
  bodyStyle,
  ...props
}: TerminalWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const offsetRef = useRef<Offset>({ x: 0, y: 0 });
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const applyOffset = useCallback((next: Offset) => {
    offsetRef.current = next;
    setOffset(next);
  }, []);

  const clampToBounds = useCallback(
    (x: number, y: number, metrics: Metrics): Offset => {
      const { layoutLeft, layoutTop, width, height, bounds } = metrics;
      const minX = bounds.left - layoutLeft;
      const minY = bounds.top - layoutTop;
      const maxX = bounds.right - width - layoutLeft;
      const maxY = bounds.bottom - height - layoutTop;
      return {
        x: Math.min(Math.max(x, minX), Math.max(minX, maxX)),
        y: Math.min(Math.max(y, minY), Math.max(minY, maxY)),
      };
    },
    [],
  );

  const readMetrics = useCallback((): Metrics | null => {
    const winEl = windowRef.current;
    const boundsEl = boundsRef?.current;
    if (!winEl || !boundsEl) return null;
    const win = winEl.getBoundingClientRect();
    const bounds = boundsEl.getBoundingClientRect();
    const current = offsetRef.current;
    return {
      width: win.width,
      height: win.height,
      layoutLeft: win.left - current.x,
      layoutTop: win.top - current.y,
      bounds: {
        left: bounds.left,
        top: bounds.top,
        right: bounds.right,
        bottom: bounds.bottom,
      },
    };
  }, [boundsRef]);

  const stopDrag = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    drag.cleanup();
    dragRef.current = null;
    setDragging(false);
  }, []);

  const startDrag = useCallback(
    (clientX: number, clientY: number) => {
      const metrics = readMetrics();
      if (!metrics) return false;

      const onMove = (event: MouseEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        applyOffset(
          clampToBounds(
            drag.originX + event.clientX - drag.startX,
            drag.originY + event.clientY - drag.startY,
            drag.metrics,
          ),
        );
      };

      const onUp = () => stopDrag();

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);

      dragRef.current = {
        startX: clientX,
        startY: clientY,
        originX: offsetRef.current.x,
        originY: offsetRef.current.y,
        metrics,
        cleanup: () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
          window.removeEventListener("pointercancel", onUp);
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseup", onUp);
        },
      };
      setDragging(true);
      return true;
    },
    [applyOffset, clampToBounds, readMetrics, stopDrag],
  );

  const onPointerDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!draggable || event.button !== 0) return;
    if (
      event.type === "mousedown" &&
      "pointerId" in event.nativeEvent &&
      event.nativeEvent.pointerId != null
    ) {
      return;
    }
    if (!startDrag(event.clientX, event.clientY)) return;
    event.preventDefault();
  };

  useEffect(() => {
    if (!draggable) return undefined;
    const onResize = () => {
      const metrics = readMetrics();
      if (!metrics) return;
      applyOffset(
        clampToBounds(offsetRef.current.x, offsetRef.current.y, metrics),
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyOffset, clampToBounds, draggable, readMetrics]);

  useEffect(() => () => stopDrag(), [stopDrag]);

  return (
    <div
      {...props}
      ref={windowRef}
      {...stylex.props(
        styles.window,
        dragging && styles.dragging,
        style,
        // Last, so the drag position wins over any `style` passed in.
        draggable && styles.offset(offset.x, offset.y),
      )}
    >
      <div
        {...stylex.props(
          styles.chrome,
          draggable && styles.chromeDraggable,
          dragging && styles.chromeDragging,
        )}
        onPointerDown={onPointerDown}
        onMouseDown={onPointerDown}
      >
        <span {...stylex.props(styles.dot, styles.close)} />
        <span {...stylex.props(styles.dot, styles.minimize)} />
        <span {...stylex.props(styles.dot, styles.maximize)} />
      </div>
      <div {...stylex.props(styles.body, bodyStyle)}>{children}</div>
    </div>
  );
}

const styles = stylex.create({
  window: {
    width: "100%",
    minHeight: "17.5rem",
    backgroundColor: colors.surface,
    borderRadius: "0.9375rem",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  offset: (x: number, y: number) => ({
    transform: `translate(${x}px, ${y}px)`,
  }),
  dragging: {
    zIndex: 5,
    boxShadow: "0 18px 40px rgba(0, 0, 0, 0.35)",
    userSelect: "none",
  },
  chrome: {
    height: "1.875rem",
    flexShrink: 0,
    backgroundColor: colors.surfaceRaised,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0 0.9375rem",
    touchAction: "none",
  },
  chromeDraggable: {
    cursor: "grab",
  },
  chromeDragging: {
    cursor: "grabbing",
  },
  dot: {
    width: "0.625rem",
    height: "0.625rem",
    borderRadius: "50%",
    display: "inline-block",
  },
  close: { backgroundColor: colors.windowClose },
  minimize: { backgroundColor: colors.windowMinimize },
  maximize: { backgroundColor: colors.windowMaximize },
  body: {
    flex: 1,
    minHeight: 0,
    padding: "1rem 1.1875rem",
    fontFamily: fonts.mono,
    fontSize: "0.875rem",
    lineHeight: "1.0625rem",
    color: colors.text,
    whiteSpace: "pre-wrap",
  },
});
