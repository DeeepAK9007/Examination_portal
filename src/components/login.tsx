import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext, User } from "../context/loginContext";
import { login } from "../apis/backend";

function Login() {
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const [formData, setFormData] = useState<User>({
    email_id: "",
    password: "",
  });
  const [error, setError] = useState(""); // Updated: Added state for error handling

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setUser(formData);
    console.log("User", user);
    console.log(formData);
    const lowerCaseName: string = formData.email_id.toLowerCase();
    if (
      lowerCaseName === "admin@rasp.com" &&
      formData.password === "admin@123"
    ) {
      console.log("User inside useEffect", user);

      setIsLoggedIn(true);
      console.log("Is user Logged In:", isLoggedIn);
    } else {
      setIsLoggedIn(false);
    }
  }, [formData]);

  // // Function to check if email is valid
  // const isEmailValid = () => {
  //   // console.log("Email validity: ",emailRegex.test(formData.email_id));
  //   return emailRegex.test(formData.email_id);
  // };

  // // Function to check if password satisfies requirements
  // const isPasswordValid = () => {
  //   // Implement your password validation logic here
  //   // For example, check if password length is greater than or equal to 8 characters
  //   // console.log("Password validity: ",formData.password.length >= 6 );
  //   return formData.password.length >= 6;
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggedIn(true);
    console.log("handle called", isLoggedIn);
    // setUser(formData);
    const lowerCaseName: string = formData.email_id.toLowerCase();
    if (
      lowerCaseName === "admin@rasp.com" &&
      formData.password === "admin@123"
    ) {
      setFormData({
        ...formData,
        ["email_id"]: lowerCaseName,
        ["password"]: formData.password,
      });

      const loginObj: User = formData;
      console.log("loginUser", loginObj);
      const ssid = await login(loginObj);

      console.log("retreived ssid", ssid);
      // const session_id = await res.json();
      // const ssid = res;

      console.log("User session Id after submit", ssid);

      // setIsLoggedIn(true); 
      // console.log("Is user Logged In after submit:", isLoggedIn);

      // Set data in session storage
      sessionStorage.setItem("key", ssid);
      // Get data from session storage
      const value = sessionStorage.getItem("key");
      console.log("Ssid after submit:", value); // Output: value
      navigate("/user");
    } else if (lowerCaseName !== "admin@rasp.com") {
      setError("Invalid email"); // Updated: Set error message for invalid credentials
    } else if (formData.password !== "admin@123") {
      setError("Invalid password"); // Updated: Set error message for invalid credentials
    } else {
      setError("Invalid email or password");
    }
    // navigate("/dashboard");
  };

  return (
    <div
      className=""
      style={{
        backgroundImage: "linear-gradient(to bottom right,#ADD8E6,white)",
        height: "100vh",
      }}
    >
      <br />
      <br />
      <div
        id="small-nav"
        className=" d-flex flex-row justify-content-end"
        style={{
          marginRight: "200px",
          marginBottom: "0px",
          paddingBottom: "0px",
        }}
      >
        <a href="/" className="pe-3 fw-bold" style={{ textDecoration: "none" }}>
          Home
        </a>
        <a href="#" className="pe-3 fw-bold" style={{ textDecoration: "none" }}>
          Application
        </a>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle text-primary"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faGear} />
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="d-flex flex-row justify-content-center shadow-sm bg-body-tertiary rounded w-75"
        style={{ height: "80vh", margin: "auto" }}
      >
        <div
          className="d-flex flex-column justify-content-between rounded-start h-100 w-100"
          style={{ backgroundColor: "#074E85" }}
        >
          <div>
            <div className="d-flex justify-content-center">
              <img
                style={{ height: "252px", width: "233px" }}
                src="src/components/iiit_logo.png"
                alt="the pic"
              />
            </div>
            <h3 style={{ textAlign: "center", color: "white" }}>
              International Institute of Information
              <br />
              Technology Bangalore
            </h3>
            <br />
            <h2 className="m-5" style={{ textAlign: "center", color: "white" }}>
              Examination portal
            </h2>
          </div>
          <div>
            <hr
              className="mt-2 mb-2"
              style={{
                width: "97%",
                margin: "auto",
                color: "#FFFFFF",
                height: "3px",
              }}
            />
            <div className="d-flex flex-row justify-content-center">
              <i className="fa-brands fa-github me-2 fa-2x"></i>
              <i className="fa-brands fa-facebook me-2 fa-2x"></i>
              <i className="fa-brands fa-twitter me-2 fa-2x"></i>
              <i className="fa-brands fa-linkedin me-2 fa-2x"></i>
              <i className="fa-brands fa-youtube me-2 fa-2x"></i>
            </div>
            <p style={{ textAlign: "center", color: "white" }}>
              {" "}
              © 2024 Copyright: International Institute of Information
              Technology - Bangalore Technical Support - application@iiitb.ac.in
            </p>
          </div>
        </div>

        <div
          className="rounded-end w-100 h-100"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            className=" d-flex flex-column gap-4 p-4 align-items-center"
            style={{ marginTop: "15vh" }}
          >
            <h3>Login form</h3>
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <div className="d-flex gap-4 justify-content-end m-2">
                <input
                  type="email"
                  className="form-control  bg-light  border-1"
                  name="email_id"
                  placeholder="Email"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex gap-4  justify-content-start m-2">
                <input
                  type="password"
                  className="form-control bg-light border-1 "
                  name="password"
                  placeholder="Enter Password"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <a className="m-3" href="https://www.google.com">
                Forgot Password?
              </a>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "274px" }}
                //onClick={handleSubmit}
              >
                Login
              </button>
              <p className="m-2">
                New user?<a href="https://www.google.com">Click here </a> to
                register <br />
                To change password{" "}
                <a href="https://www.google.com">Click here</a>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
