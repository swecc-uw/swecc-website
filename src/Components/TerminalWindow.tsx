import React, {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "../CSS/TerminalWindow.css";

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

type TerminalWindowProps = {
  children: ReactNode;
  className?: string;
  draggable?: boolean;
  boundsRef?: RefObject<HTMLElement>;
};

function TerminalWindow({
  children,
  className = "",
  draggable = false,
  boundsRef,
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
            drag.metrics
          )
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
    [applyOffset, clampToBounds, readMetrics, stopDrag]
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
        clampToBounds(offsetRef.current.x, offsetRef.current.y, metrics)
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyOffset, clampToBounds, draggable, readMetrics]);

  useEffect(() => () => stopDrag(), [stopDrag]);

  return (
    <div
      ref={windowRef}
      className={`terminal-window${draggable ? " terminal-window--draggable" : ""}${
        dragging ? " terminal-window--dragging" : ""
      } ${className}`.trim()}
      style={
        draggable
          ? { transform: `translate(${offset.x}px, ${offset.y}px)` }
          : undefined
      }
    >
      <div
        className="terminal-window__chrome"
        onPointerDown={onPointerDown}
        onMouseDown={onPointerDown}
        role={draggable ? "button" : undefined}
        aria-label={draggable ? "Move terminal window" : undefined}
        tabIndex={draggable ? 0 : undefined}
      >
        <span className="terminal-window__dot terminal-window__dot--close" />
        <span className="terminal-window__dot terminal-window__dot--minimize" />
        <span className="terminal-window__dot terminal-window__dot--maximize" />
      </div>
      <div className="terminal-window__body">{children}</div>
    </div>
  );
}

export default TerminalWindow;
