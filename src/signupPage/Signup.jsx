import "./signUp.css";
import { useFormik } from "formik";
import { SignUpSchemas } from "../schemas";
// import GoogleLogIn from "./GoogleLogin";
import GoogleLoginButton from "./GoogleLogin";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const SignUp = (props) => {
  const handleCombinedSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);

    handleLogin(e);
  };

  // const [value, setValue] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    // resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchemas,
    onSubmit: (values, { resetForm }) => {
      handleLogin(values);
    },
  });

  const navigate = useNavigate();

  // const handleLogin = async (event) => {
  //   // alert("backend call");
  //   event.preventDefault();
  //   debugger;
  //   axios.post("http://localhost:3005/accounts", addUser);
  //   debugger;
  //   console
  //     .log("🚀 ~ file: Signup.jsx:54 ~ handleLogin ~ addUser:", addUser)

  //     .then((response) => {
  //       console.log(response);
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   try {
  //     debugger;
  //     const response = await axios.post(
  //       "http://localhost:3005/accounts",
  //       addUser
  //     );
  //     console.log("🚀 ~ file: Signup.jsx:54 ~ handleLogin ~ addUser:", addUser);
  //     console.log(response);
  //     navigate("/login");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleLogin = async (values) => {
    console.log("values:::", values);
    axios
      .post("http://localhost:3005/addUser", values)
      .then((response) => {
        console.log(response);
        navigate("/login");
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
                <label htmlFor="exampleInputname">User Name </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="exampleInputName"
                  aria-describedby="nameHelp"
                  placeholder="Enter  User name"
                  autoComplete="off"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {touched.name && errors.name ? (
                  <p className="error-message" style={{ color: "red" }}>
                    {errors.name}
                  </p>
                ) : null}
              </div>
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
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember me for 30 days
                </label>
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block bton"
              >
                Submit
              </button>
              {/* <button
                type="button"
                className="
            btn-lg btn-block google"
                id="signinDiv"
              >
                <img
                  src="./images/google.png"
                  alt="google"
                  style={{
                    paddingRight: "7px",
                    height: "24px",
                    width: "24px",
                  }}
                />
                Sign-in with Google
              </button> */}
              <br />
              <GoogleLoginButton />
            </form>
            <p className="account">
              Don’t have an account?
              <Link to="/login">log In</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="bulding-img">
        <img src="./images/building.png" alt="Buliding" />
      </div>
    </div>
  );
};

export default SignUp;
