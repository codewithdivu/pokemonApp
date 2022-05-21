import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [flag, setFlag] = useState(false);

  const HandleLogin = (e) => {
    e.preventDefault();

    let mail = localStorage.getItem("Email").replace(/"/g, "");
    let pass = localStorage.getItem("Password").replace(/"/g, "");

    if (!emailLog || !passwordLog) {
      setFlag(true);
    } else if (passwordLog !== pass || emailLog !== mail) {
      setFlag(true);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <h2 className="text-center text-white pt-5">Login Form</h2>
      <form onSubmit={HandleLogin} className="mt-5 mb-5" id="registration-form">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="email"
            onChange={(e) => setEmailLog(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            name="password"
            placeholder="password"
            onChange={(e) => setPasswordLog(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-warning text-white">
            Login
          </button>
          {flag && (
            <div className="alert alert-danger mt-2" role="alert">
              Please Fill Correct Info !
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
