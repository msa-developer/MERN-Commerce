import React from "react";
import useAuth from "../zustand/useAuth";

const LoginPage = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const { Login } = useAuth();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev.data, [e.target.name]: e.target.value }));
  };

  return (
    <div className="" data-theme="garden">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Login Rigth Now And Start Creating The Products You Love
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
