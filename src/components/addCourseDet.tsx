import { useEffect, useState } from "react";
import "./styles.css";
import { courseType } from "../types/myTypes";
import { addOneCourse } from "../apis/backend";

function AddCourseDet() {
  const [CourseCode, setCourseCode] = useState<string>("");
  const [CourseName, setCourseName] = useState<string>("");

  const [courseData, setCourseData] = useState<courseType>({
    course_name: "",
    course_code: "",
  });

  useEffect(() => {
    setCourseData({
      course_name: CourseName,
      course_code: CourseName,
    });
  }, [CourseName, CourseCode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("courseData: ", courseData);
    addOneCourse(courseData);
  };

  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        Add Course Details{" "}
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
              <span className="star">*</span>
            </div>
            <input
              id="coursecode"
              type="text"
              className="form-control"
              value={CourseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
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
              <span className="star">*</span>
            </div>
            <input
              id="coursename"
              type="text"
              className="form-control"
              value={CourseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
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
  );
}

export default AddCourseDet;
