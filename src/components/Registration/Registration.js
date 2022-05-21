import React, { useState } from "react";
import Login from "./Login";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);

  const formSubmitHandle = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem("Email", JSON.stringify(email));
      localStorage.setItem("Password", JSON.stringify(password));

      setLogin(!login);
    }
  };

  const handleClick = () => {
    setLogin(!login);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              className="signup-img mt-5"
              src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
              alt="login img"
            />
          </div>
          <div className="col-md-6 text-white">
            {login ? (
              <>
                <h2 className="text-center text-white pt-5">
                  Registration Form
                </h2>
                <form
                  onSubmit={formSubmitHandle}
                  className="mt-5 mb-5"
                  id="registration-form"
                >
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      FullName <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Full Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

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
                      onChange={(e) => setEmail(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-warning text-white"
                    >
                      SignUp
                    </button>
                    {flag && (
                      <div className="alert alert-danger mt-2" role="alert">
                        Please Fill All The required Fields{" "}
                        <span className="text-danger">*</span>
                      </div>
                    )}
                    <p className="mt-2" onClick={handleClick}>
                      Already Registered{" "}
                      <span className="login-text">Click here to Login</span> !
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <Login />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
