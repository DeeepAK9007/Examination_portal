import { useEffect, useState } from "react";
import "./styles.css";
import { courseType } from "../types/myTypes";
import { addOneCourse, getUsersByRole } from "../apis/backend";

function AddCourseDet() {
  const [CourseCode, setCourseCode] = useState<string>("");
  const [Instructor, setInstructor] = useState<string>("");
  const [CourseName, setCourseName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [users, setUsers] = useState<{ name: string }[]>([]);

  const [courseData, setCourseData] = useState<courseType>({
    course_name: "",
    instructor_id: "",
    course_code: "",
    status: "",
  });

  useEffect(() => {
    setCourseData({
      course_name: CourseName,
      instructor_id: Instructor,
      course_code: CourseCode,
      status: status,
    });
  }, [CourseName, Instructor, CourseCode, status]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("courseData: ", courseData);
    addOneCourse(courseData);
    window.location.reload();
  };

  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        Add Course Details{" "}
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <form
        id="courseform"
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
          <div className="mb-3 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: status ? "none" : "" }}
            >
              <label htmlFor="file">Status</label>
              <span className="star"> *</span>
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
  );
}

export default AddCourseDet;
