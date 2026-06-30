import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import "./Header.css";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const headerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                headerRef.current &&
                !headerRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <header className="header" ref={headerRef}>
            <div className="header-top">
                <div className="name">
                    <Link to="/">
                        <span>Football</span> League Manager
                    </Link>
                </div>

                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    ☰
                </button>
            </div>

            <nav className={menuOpen ? "nav active" : "nav"}>
                <Link
                    to="/leagues"
                    onClick={() => setMenuOpen(false)}
                >
                    Leagues
                </Link>

                <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                >
                    Register
                </Link>
            </nav>
        </header>
    );
}

export default Header;