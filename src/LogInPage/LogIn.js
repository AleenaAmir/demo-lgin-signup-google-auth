import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useFormik } from "formik";
import { SignUpSchemas } from "../schemas";
import GoogleLogIn from "../signupPage/GoogleLogin";
import axios from "axios";

// import GoogleLoginButton from "./signupPage/GoogleLogin.jsx";

const initialValues = {
  email: "",
  password: "",
};

const LogIn = (props) => {
  const handleCombinedSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);

    handleLogin(e);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchemas,
      onSubmit: (values, { resetForm }) => {
        handleLogin(values);
      },
    });

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.log("values:::", values);
    axios
      .post("http://localhost:3005/login", values)
      .then((response) => {
        console.log(response);
        navigate("/welcome");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main">
      <div className="signup">
        <div className="second-box">
          <div>
            <h2 className="main-h">Welcome back</h2>
            <p className="main-p">Welcome back! Please enter your details.</p>
          </div>
          <div>
            <form onSubmit={handleCombinedSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email ? (
                  <p className="form-error" style={{ color: "red" }}>
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  autoComplete="off"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password ? (
                  <p className="form-error" style={{ color: "red" }}>
                    {errors.password}
                  </p>
                ) : null}
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  className="form-check-label"
                  type="check"
                  name="remember"
                  value="yes"
                >
                  Remember me for 30 days
                  <a href="#" style={{ marginLeft: "20px" }}>
                    Forget Password?
                  </a>
                </label>
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block bton"
              >
                <Link to="/welcome" style={{ color: "white" }}>
                  Submit
                </Link>
              </button>

              <br />

              <GoogleLogIn />
            </form>
            <span className="account">
              You Don’t have an account?
              <Link to="/">SignUp</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="bulding-img">
        <img src="./images/building.png" alt="Buliding" />
      </div>
    </div>
  );
};

export default LogIn;
