import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext, User } from "../context/loginContext";
import { login } from "../apis/backend";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Login() {
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const [formData, setFormData] = useState<User>({
    email_id: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error", // 'success' | 'error' | 'warning' | 'info'
  });

  useEffect(() => {
    setUser(formData);
    const lowerCaseName = formData.email_id.toLowerCase();
    if (
      lowerCaseName === "admin@rasp.com" &&
      formData.password === "admin@123"
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [formData]);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email_id && !formData.password) {
      setSnackbar({
        open: true,
        message: "Please enter login credentials",
        severity: "warning",
      });
      return;
    } else if (!formData.email_id) {
      setSnackbar({
        open: true,
        message: "Please enter login",
        severity: "warning",
      });
      return;
    } else if (!formData.password) {
      setSnackbar({
        open: true,
        message: "Please enter password",
        severity: "warning",
      });
      return;
    }

    setIsLoggedIn(true);
    const lowerCaseName = formData.email_id.toLowerCase();
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
      const ssid = await login(loginObj);
      sessionStorage.setItem("key", ssid);
      navigate("/user");
    } else if (lowerCaseName !== "admin@rasp.com") {
      setError("Invalid email");
      setSnackbar({
        open: true,
        message: "Incorrect login",
        severity: "error",
      });
    } else if (formData.password !== "admin@123") {
      setError("Invalid password");
      setSnackbar({
        open: true,
        message: "Incorrect password",
        severity: "error",
      });
    } else {
      setError("Invalid email or password");
      setSnackbar({
        open: true,
        message: "Invalid email or password",
        severity: "error",
      });
    }
  };

  return (
    <div
      className="d-flex flex-column login-container justify-content-center"
      style={{
        backgroundImage: "linear-gradient(to bottom right,#ADD8E6,white)",
        minHeight: "100vh",
      }}
    >
      <div className="d-flex flex-row justify-content-end py-3 px-4">
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
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-center align-items-center shadow-sm bg-body-tertiary rounded w-75 px-0">
        <div
          className="d-flex flex-column justify-content-between rounded-start h-100 w-100"
          style={{ backgroundColor: "#074E85" }}
        >
          <div>
            <div className="d-flex justify-content-center py-4">
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
            <div className="d-flex flex-row justify-content-center py-2">
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
          className="rounded-end w-100 h-100 p-4"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="d-flex flex-column gap-4 p-4 align-items-center">
            <h3>Login</h3>
            <form className="d-flex flex-column w-100" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control bg-light border-1"
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
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control bg-light border-1"
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
              <a className="mb-3" href="https://www.google.com">
                Forgot Password?
              </a>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              {error && <p className="text-danger mt-3">{error}</p>}
              <p className="mt-3">
                New user? <a href="https://www.google.com">Click here </a> to
                register <br />
                To change password{" "}
                <a href="https://www.google.com">Click here</a>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
