import React from "react";
import useAuth from "../zustand/useAuth";

const LoginPage = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const { Login } = useAuth();

  console.log(data.email);
  console.log(data.password);

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
                <label className="label text-xl">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="Email"
                />
                <label className="label text-xl">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  value={data.password}
                  className="input"
                  placeholder="Password"
                />
                <button
                  className="btn btn-neutral mt-4"
                  onClick={() => Login(data)}
                >
                  Login
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
