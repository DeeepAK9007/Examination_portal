import NavBar from "./navbar";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { courseType } from "../types/myTypes";
import { getUsersByRole, updateOrDeleteCourse } from "../apis/backend";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// Custom Alert component with ref forwarding for Snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateCourse() {
  const navigate = useNavigate(); // Hook for navigation

  const [CourseCode, setCourseCode] = useState<string>("");
  const [Instructor, setInstructor] = useState<string>("");
  const [CourseName, setCourseName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [users, setUsers] = useState<{ name: string }[]>([]);

  const location = useLocation(); // Hook to access location object
  const courseId = new URLSearchParams(location.search).get("id"); // Extract course ID from URL
  const courseobj = new URLSearchParams(location.search).get("course"); // Extract course object from URL

  // Snackbar state variables for managing notification messages
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  console.log("Course id:", courseId);
  console.log("Course obj", courseobj);

  // State variable to hold course data for updating
  const [courseData, setCourseData] = useState<courseType>({
    id: "",
    course_name: "",
    instructor_id: "",
    course_code: "",
    status: "",
  });

  // useEffect to initialize form fields based on course data from the URL
  useEffect(() => {
    if (courseId && courseobj) {
      const jsonobj = JSON.parse(atob(courseobj));
      setCourseCode(jsonobj.Course_Code);
      setInstructor(jsonobj.Instructor);
      setCourseName(jsonobj.Course_Name);
      setStatus(jsonobj.Status);
    } else {
      console.error("Cousre ID is null");
    }
  }, []);

  // useEffect to update course data when input fields change
  useEffect(() => {
    if (courseId && courseobj) {
      const jsonobj = JSON.parse(atob(courseobj));
      console.log("jsonobj", jsonobj);
      setCourseData({
        id: courseId,
        course_name: CourseName ? CourseName : jsonobj.Course_Name,
        instructor_id: Instructor ? Instructor : jsonobj.Instructor,
        course_code: CourseCode ? CourseCode : jsonobj.Course_Code,
        status: status ? status : jsonobj.Status,
      });
    } else {
      console.error("Course ID is null");
    }
  }, [CourseName, Instructor, CourseCode, status]);

  // Fetch users with the role of "Faculty" from the backend
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await getUsersByRole("Faculty");
        setUsers(res);

        console.log("users based on role ", res);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchusers();
  }, []);

  // Function to handle form submission for course updates
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (courseId) {
      console.log("courseData: ", courseData);
      updateOrDeleteCourse(courseId, courseData, "MODIFY");
      setSnackbarMessage("Course updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else {
      console.error("Course ID is null");
      setSnackbarMessage("Failed to update Course.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Function to handle Snackbar close event
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    navigate("/course");
  };

  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="w-100">
        <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
          Update Course Details{" "}
        </p>
        <hr style={{ width: "95%", margin: "auto" }} />

        <form
          className="d-flex flex-row jutify-content-evenly w-100"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column ms-5 w-50">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: CourseCode ? "none" : "" }}
              >
                <label htmlFor="coursecode">Course Code</label>
              </div>
              <input
                id="coursecode"
                type="text"
                className="form-control"
                value={CourseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              />
            </div>
            <div className="mb-3 form-group">
              <div
                className="palceholder ms-1"
                style={{ display: Instructor ? "none" : "" }}
              >
                <label htmlFor="inst">Instructor</label>
                <span className="star"> *</span>
              </div>
              <select
                name="inst"
                className="form-select"
                id="instruct"
                aria-label="Floating label select example"
                value={Instructor}
                onChange={(e) => setInstructor(e.target.value)}
              >
                <option id="examrole" value="" disabled selected></option>
                {users.map((user, index) => (
                  <option key={index} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex flex-column ms-5 w-50 me-5">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: CourseName ? "none" : "" }}
              >
                <label htmlFor="coursename">Course Name</label>
              </div>
              <input
                id="coursename"
                type="text"
                className="form-control"
                value={CourseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className="mb-3 form-group">
              <div className="palceholder ms-1" style={{ display: "none" }}>
                <label htmlFor="file">Status</label>
              </div>
              <select
                name="block"
                className="form-select"
                id="blockno"
                aria-label="Floating label select example"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option id="examrole" value="" disabled selected></option>
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </select>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "105px", height: "44px" }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UpdateCourse;
