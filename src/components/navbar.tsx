import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

function NavBar() {
  let navigate = useNavigate();

  type DropdownState = {
    admin: boolean;
    examOffice: boolean;
    courseInstructor: boolean;
    invigilator: boolean;
  };

  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    admin: false,
    examOffice: false,
    courseInstructor: false,
    invigilator: false,
  });

  const toggleDropdown = (section: keyof DropdownState) => {
    setDropdownOpen({
      admin: false,
      examOffice: false,
      courseInstructor: false,
      invigilator: false,
      [section]: !dropdownOpen[section],
    });
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "100vh", width: "319px" }}
    >
      <div
        className="d-flex flex-column col-xs-2"
        style={{ background: "#074E85", height: "90vh", width: "319px" }}
      >
        <div className="my-2">
          <p className="text-center mt-2">
            <img
              src="src/components/iiit_logo.png"
              className="border rounded-circle p-2 w-25 h-25"
              alt=""
            />
          </p>
          <p style={{ textAlign: "center", color: "white" }}>
            International Institute of <br /> Information Technology
            <br />
            Bangalore
          </p>
        </div>

        <hr className="border border-light w-100 m-1" />

        <div className="d-flex flex-column justify-content-between">
          <div>
            <ul
              className="text-start d-flex flex-column h-75 gap-0 mx-4 navbar-nav"
              style={{ fontSize: "16px", color: "white" }}
            >
              <li className="nav-item">
                <p
                  className="dropdown-heading"
                  onClick={() => toggleDropdown("admin")}
                >
                  <i className="fa-sharp fa-solid fa-graduation-cap"></i>{" "}
                  Administration
                </p>
                {dropdownOpen.admin && (
                  <ul className="dropdown-list">
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/user")}
                        style={{ color: "white" }}
                      >
                        <i className="fa-regular fa-user"></i> User
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/batch")}
                        style={{ color: "white" }}
                      >
                        <i className="fa-regular fa-calendar"></i> Batch
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/room")}
                        style={{ color: "white" }}
                      >
                        <i className="fa-regular fa-calendar"></i> Room
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/term")}
                        style={{ color: "white" }}
                      >
                        <i className="fa-regular fa-calendar"></i> Term
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/course")}
                        style={{ color: "white" }}
                      >
                        <i className="fa-regular fa-calendar"></i> Course
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/examType")}
                        style={{ color: "white" }}
                      >
                        <i className="fa-regular fa-calendar"></i> Exam Type
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn my-auto ps-5"
                        onClick={() => navigate("/examMode")}
                        style={{ color: "white" }}
                      >
                        <i className="fa-regular fa-calendar"></i> Exam Mode
                      </p>
                    </li>
                  </ul>
                )}
              </li>

              <br />

              <li className="nav-item">
                <p
                  className="dropdown-heading"
                  onClick={() => toggleDropdown("examOffice")}
                >
                  <i className="fa-solid fa-book"></i> Exam Office
                </p>
                {dropdownOpen.examOffice && (
                  <ul className="dropdown-list">
                    <li onClick={() => navigate("/schedule")}>
                      <p
                        className="btn my-auto ps-5"
                        style={{ color: "white" }}
                      >
                        <i className="fa-regular fa-calendar"></i> Exam
                        Scheduling
                      </p>
                    </li>
                  </ul>
                )}
              </li>

              <br />

              <li
                className="nav-item dropdown-heading"
                onClick={() => navigate("/progCord")}
              >
                <p style={{ color: "white" }}>
                  <i className="fa-solid fa-sheet-plastic"></i> Programme
                  Co-ordinator
                </p>
              </li>

              <br />

              <li className="nav-item">
                <p
                  className="dropdown-heading"
                  onClick={() => toggleDropdown("courseInstructor")}
                >
                  <i className="fa-solid fa-chalkboard-user"></i> Course
                  Instructor
                </p>
                {dropdownOpen.courseInstructor && (
                  <ul className="dropdown-list">
                    <li>
                      <p className="btn m-0 ps-5" style={{ color: "white" }}>
                        <i className="fa-solid fa-chalkboard-user"></i> Upload
                        Grades
                      </p>
                    </li>
                    <li>
                      <p className="btn m-0 ps-5" style={{ color: "white" }}>
                        <i className="fa-solid fa-chalkboard-user"></i> Issue
                        Reporting
                      </p>
                    </li>
                    <li>
                      <p className="btn m-0 ps-5" style={{ color: "white" }}>
                        <i className="fa-solid fa-chalkboard-user"></i> Exam
                        Mode Update
                      </p>
                    </li>
                  </ul>
                )}
              </li>

              <br />

              <li className="nav-item">
                <p
                  className="dropdown-heading"
                  onClick={() => toggleDropdown("invigilator")}
                >
                  <i className="fa-solid fa-person"></i> Invigilator
                </p>
                {dropdownOpen.invigilator && (
                  <ul className="dropdown-list">
                    <li>
                      <p
                        className="btn m-0 ps-5"
                        style={{ color: "white" }}
                        onClick={() => navigate("/attend")}
                      >
                        <i className="fa-solid fa-chalkboard-user"></i>{" "}
                        Attendance
                      </p>
                    </li>
                    <li>
                      <p
                        className="btn m-0 ps-5"
                        style={{ color: "white" }}
                        onClick={() => navigate("/incident")}
                      >
                        <i className="fa-solid fa-chalkboard-user"></i> Incident
                        Reporting
                      </p>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-row justify-content-around"
        style={{ backgroundColor: "#070241", height: "10vh" }}
      >
        <div className="ms-3 mt-2" style={{ color: "white" }}>
          <p className="mb-0 fw-bold">Application Admin</p>
          <p>application@iiitb.in</p>
        </div>
        <i
          className="fa-solid fa-right-from-bracket fa-2x mb-4 fs-4"
          style={{ color: "white", transform: "rotate(180deg)" }}
        ></i>
      </div>
    </div>
  );
}

export default NavBar;
