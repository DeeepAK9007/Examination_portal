import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
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
                src="https://s3-alpha-sig.figma.com/img/1c8b/a115/5555c3e534dec5f2c27633aee63a0fe8?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mQHPokX3UO-IhGNKk85-IXTYY~gagNwnBoPKrp5Ge8HWaPfkZmIsR8Uvnq9LKEv2ZBCXxL6P1MbJoE76~Al~CdYAMcp7bNn-eiz1G~eG5QxG9WfWmMQ97eGKv2zzYu8p3rkgUgtKlGukgyWg2Ke4Dk2FAK3xAJP9JuKy7~pxoYO~RdzXmuVXAQNdegFYskI3RQGBQedVu5~WqJHNipQcjB75u1qeqpA0FJbyuA2y6Sbo~mOVHBkXTCsGEGCM9Eio9e7a7FsRmF7ZJz6f6MW5BVtkEjwRVU9XtjpBC5imZ5do-bEckjO6iO7t6JB0-HkhlyGMYlj4Fz1Vlu~EzHFJyA__"
                alt="the pic"
              />
            </div>
            <h3 style={{ textAlign: "center", color: "white" }}>
              International Institue of Information
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
              {/* <img src={addresses[0]} style={img_spec}></img>
                                <img src={addresses[1]} style={img_spec}></img>
                                <img src={addresses[2]} style={img_spec}></img> 
                                <img src={addresses[3]} style={img_spec}></img>
                                <img src={addresses[4]} style={img_spec}></img> */}
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
            <div className="d-flex gap-4 justify-content-end">
              <input
                type="email"
                className="form-control  bg-light  border-1"
                name="email_id"
                placeholder="Email"
              />
            </div>
            <div className="d-flex gap-4  justify-content-start">
              <input
                type="password"
                className="form-control bg-light border-1 "
                name="password"
                placeholder="Enter Password"
              />
            </div>
            <a href="https://www.google.com">Forgot Password?</a>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "274px" }}
            >
              Login
            </button>
            <p>
              New user?<a href="https://www.google.com">Click here </a> to
              register <br />
              To change password <a href="https://www.google.com">
                Click here
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
