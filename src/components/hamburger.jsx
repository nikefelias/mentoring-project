import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../index.css'

export default function HamburgerNav() {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const navRef = useRef(null);
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

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
        <Link to="/" onClick={() => setOpen(false)}>Map</Link>
        <Link to="/about" onClick={() => setOpen(false)}>How it works</Link>
        {isAuth && (
          <Link to="/rewards" onClick={() => setOpen(false)}>My rewards</Link>
        )}
        
        {isAuth ? (
          <button
            type="button"
            onClick={async () => {
              await logout();
              setOpen(false);
              navigate("/");
            }}
          >
            Log out
          </button>
        ) : (
          <Link to="/signup" onClick={() => setOpen(false)}>Sign up</Link>
        )}
      </nav>
    </>
  );
}
