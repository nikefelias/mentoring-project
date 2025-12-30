import { useEffect, useMemo, useRef, useState } from "react";
import "./Slider.css";

const DEFAULT_STEP = 135;

export default function Slider({ items, step = DEFAULT_STEP }) {
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const safeItems = useMemo(() => items ?? [], [items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateBounds = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = track.parentElement?.clientWidth ?? 0;
      const max = Math.max(0, trackWidth - viewportWidth);
      setMaxOffset(max);
      setOffset((prev) => Math.min(prev, max));
    };

    updateBounds();

    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(track);
    window.addEventListener("resize", updateBounds);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateBounds);
    };
  }, [safeItems]);

  const handleLeft = () => setOffset((prev) => Math.max(0, prev - step));
  const handleRight = () => setOffset((prev) => Math.min(maxOffset, prev + step));

  return (
    <div className="slider-wrapper">
      <button className="left-btn" onClick={handleLeft} disabled={offset === 0}>
        ←
      </button>

      <div className="slider-viewport">
        <div
          className="slider-track"
          ref={trackRef}
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {safeItems.map((item, index) => (
            <div className="slider-item" key={item?.key ?? index}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <button
        className="right-btn"
        onClick={handleRight}
        disabled={offset >= maxOffset}
      >
        →
      </button>
    </div>
  );
}
