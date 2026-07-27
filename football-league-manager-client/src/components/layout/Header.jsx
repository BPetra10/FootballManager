import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import "./Header.css";

import { useAuth } from "../../context/AuthContext";

function Header() {
    const navigate = useNavigate();

    const {
        isAuthenticated,
        user,
        logout
    } = useAuth();

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

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

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

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {

            window.removeEventListener(
                "resize",
                handleResize
            );

        };

    }, []);

    const handleLogout = () => {

        logout();

        navigate("/");

        setMenuOpen(false);

    };

    return (

        <header
            className="header"
            ref={headerRef}
        >

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

            <nav
                className={
                    menuOpen
                        ? "nav active"
                        : "nav"
                }
            >

                <Link
                    to="/leagues"
                    onClick={() => setMenuOpen(false)}
                >
                    Leagues
                </Link>

                {isAuthenticated && user?.role === "Admin" && (

                    <Link
                        to="/admin"
                        onClick={() => setMenuOpen(false)}
                    >
                        Admin Panel
                    </Link>

                )}

                {isAuthenticated && user?.role === "TeamManager" && (

                    <Link
                        to="/my-team"
                        onClick={() => setMenuOpen(false)}
                    >
                        My Team
                    </Link>

                )}

                {isAuthenticated && (

                    <>

                        <span className="header-user">

                            Welcome, {user?.username}

                        </span>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </>

                )}

                {!isAuthenticated && (

                    <>

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

                    </>

                )}

            </nav>

        </header>

    );

}

export default Header;