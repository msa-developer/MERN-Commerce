import { BadgePlus, LogOut, Sun, SunMoon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";
import useAuth from "../zustand/useAuth";

const Nav = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "garden",
  );

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const location = useLocation();
  const { Logout } = useAuth();

  return (
    <>
      <nav className="nav flex p-4 sticky justify-around items-center">
        <span className="font-bold text-xl md:text-5xl lg:text-7xl bg-gradient-to-r from-sky-500 to-blue-800 text-transparent bg-clip-text">
          <Link to="/">Mern-Commerce</Link>
        </span>
        <section className="space-x-3">
          <Link to="/create">
            <button
              className={`btn btn-primary ${location.pathname === "/create" ? "hidden" : ""}`}
            >
              <BadgePlus />
            </button>
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => {
              setTheme(theme === "garden" ? "black" : "garden");
            }}
          >
            {theme === "garden" ? <SunMoon /> : <Sun />}
          </button>

          <button className="btn btn-primary" onClick={Logout}>
            <LogOut />
          </button>
        </section>
      </nav>
    </>
  );
};

export default Nav;
