import React from "react";

const Nav = () => {
  const [theme, setTheme] = React.useState("black");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <nav className="nav flex p-4 sticky justify-around items-center">
        <span className="font-bold text-xl md:text-5xl lg:text-7xl bg-gradient-to-r from-sky-500 to-blue-800 text-transparent bg-clip-text">
          Mern-Commerce
        </span>
        <section className="space-x-3">
          <button className="btn btn-primary">Create</button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setTheme(theme === "black" ? "garden" : "black");
            }}
          >
            {theme === "black" ? "Light" : "Dark"}
          </button>
        </section>
      </nav>
    </>
  );
};

export default Nav;
