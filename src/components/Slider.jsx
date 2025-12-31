import "./Slider.css";

export default function Slider({ items }) {
  const safeItems = items ?? [];

  return (
    <div className="slider-wrapper">
      <div className="slider-viewport">
        <div className="slider-track">
          {safeItems.map((item, index) => (
            <div className="slider-item" key={item?.key ?? index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
