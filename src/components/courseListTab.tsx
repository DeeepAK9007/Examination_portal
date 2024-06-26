import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import { courseType } from "../types/myTypes";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCourses } from "../apis/backend";

function CourseListTab() {
  const navigate = useNavigate();
  const location = useLocation();
  const page = new URLSearchParams(location.search).get("redirectedPage");
  const [selectedCourse, setSelectedCourse] = useState<courseType | null>(null);
  const [courses, setCourses] = useState<courseType[]>([]);

  const onCellClicked = (params: any) => {
    if (params.colDef.field === "Course_Code") {
      setSelectedCourse(params.data);
      console.log("selected course: ", selectedCourse);
      if (page === "issuereporting") {
        navigate(
          `/issuereporting?course=${btoa(JSON.stringify(selectedCourse))}&&id=${
            selectedCourse.id
          }`
        );
      } else if (page === "attendance") {
        navigate(
          `/attend?course=${btoa(JSON.stringify(selectedCourse))}&&id=${
            selectedCourse.id
          }`
        );
      } else if (page === "incident") {
        navigate(
          `/incident?course=${btoa(JSON.stringify(selectedCourse))}&&id=${
            selectedCourse.id
          }`
        );
      }
    }
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "Course_Code",
      flex: 1,
    },
    { field: "Course_Name", flex: 1 },
    {
      field: "Instructor",
      flex: 1,
    },
    { field: "Status", flex: 1 },
  ]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        // console.log("Courses", res);
        const filteredCourses = res.map((course: courseType) => ({
          id: course.id,
          Course_Code: course.course_code,
          Course_Name: course.course_name,
          Instructor: course.instructor_id,
          Status: course.status == "Active" ? true : false,
          Actions: "remove", // Ensure this field is correctly mapped if required
        }));
        setCourses(filteredCourses);
        console.log("Response");
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 400, width: "90%" }}
      >
        <AgGridReact
          rowSelection="multiple"
          headerCheckboxSelection={true}
          rowData={courses}
          onCellClicked={onCellClicked}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
}

export default CourseListTab;
