import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import { studsBycourse } from "../types/myTypes";
import { getAllCourses, getEnrollbyCours } from "../apis/backend";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";
import { useNavigate } from "react-router-dom";


interface CourseConfTabProps {
  queryText: string;
  searchStatus: boolean;
}

const UploadGradesPart2Tab: React.FC<CourseConfTabProps> = ({
  queryText,
  searchStatus,
}) => {
  const [courses, setCourses] = useState<studsBycourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<studsBycourse[]>([]);

  const [colDefs, setColDefs] = useState([
    {
      field: "StudentId",
      flex: 1,
    },
    { field: "StudentName", flex: 1 },
    { field: "Grade", flex: 1 },
    { field: "Remark", flex: 1,},
  ]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const course_iden = new URLSearchParams(location.search).get("id");
        const res= await getEnrollbyCours(course_iden);
        // console.log("Terms", res);
        console.log("studs associated with the course",res);
        
        const filteredTerms = res.map((stud: studsBycourse) => ({
          id: stud.id,
          StudentId: stud.student_id,
          StudentName: stud.stud_name,
          Grade: stud.grade,
          Remark: stud.remark, // Ensure this field is correctly mapped if required
        }));
        setCourses(filteredTerms);
        // console.log("Response");
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchTerms();
  }, []);

  useEffect(() => {
    const filterCourses = () => {
      if (!queryText) {
        setFilteredCourses(courses);
      } else if (queryText || searchStatus) {
        const lowerCaseQuery = queryText.toLowerCase();
        const filtered = courses.filter((course) =>
          Object.values(course).some((value) =>
            String(value).toLowerCase().includes(lowerCaseQuery)
          )
        );
        setFilteredCourses(filtered);
      }
    };

    filterCourses();
  }, [queryText, courses]);

  console.log("Row data:", courses);
  console.log("Column Data", colDefs);


  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 400, width: "95%" }}
      >
        <AgGridReact
          rowSelection="multiple"
          headerCheckboxSelection={true}
          rowData={filteredCourses}
          columnDefs={colDefs}
          onCellClicked={()=>{alert("bleh b;leh")}}        
          />
      </div>
    </div>
  );
};

export default UploadGradesPart2Tab;
