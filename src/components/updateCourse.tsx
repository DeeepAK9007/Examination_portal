import NavBar from "./navbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { courseType } from "../types/myTypes";
import { updateOrDeleteCourse } from "../apis/backend";

function UpdateCourse() {
  const navigate = useNavigate();

  const [CourseCode, setCourseCode] = useState<string>("");
  const [CourseName, setCourseName] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const location = useLocation();
  const courseId = new URLSearchParams(location.search).get("id");
  const courseobj = new URLSearchParams(location.search).get("course");
  console.log("Course id:", courseId);
  console.log("Course obj", courseobj);
  const [courseData, setCourseData] = useState<courseType>({
    id: "",
    course_name: "",
    course_code: "",
    status: "",
  });

  useEffect(() => {
    if (courseId && courseobj) {
      const jsonobj = JSON.parse(atob(courseobj));
      setCourseCode(jsonobj.Course_Code);
      setCourseName(jsonobj.Course_Name);
      setStatus(jsonobj.Status);
    } else {
      console.error("Cousre ID is null");
    }
  }, []);

  useEffect(() => {
    if (courseId && courseobj) {
      const jsonobj = JSON.parse(atob(courseobj));
      console.log("jsonobj", jsonobj);
      setCourseData({
        id: courseId,
        course_name: CourseName ? CourseName : jsonobj.Course_Name,
        course_code: CourseCode ? CourseCode : jsonobj.Course_Code,
        status: status ? status : jsonobj.Status,
      });
    } else {
      console.error("Course ID is null");
    }
  }, [CourseName, CourseCode, status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (courseId) {
      console.log("courseData: ", courseData);
      updateOrDeleteCourse(courseId, courseData, "MODIFY");
      navigate("/course");
    } else {
      console.error("Course ID is null");
    }
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
              <div
                className="palceholder ms-1"
                style={{ display: status ? "none" : "" }}
              >
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
    </div>
  );
}

export default UpdateCourse;
