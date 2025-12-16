import { useEffect, useRef, useState } from "react";
import '../index.css'

export default function HamburgerNav() {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const navRef = useRef(null);

  // клик вне меню
  useEffect(() => {
    const onDocClick = (e) => {
      const nav = navRef.current;
      const hamburger = hamburgerRef.current;
      if (!nav || !hamburger) return;

      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <>
      <button
  id="hamburger-menu"
  className={`hamburger ${open ? "active" : ""}`}
  onClick={() => setOpen(o => !o)}
  ref={hamburgerRef}
  type="button"
>
  <span />
  <span />
  <span />
</button>
      

      <nav
        id="nav-container"
        ref={navRef}
        className={open ? "open" : ""}
      >
        {}
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </>
  );
}