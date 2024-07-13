import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import { courseType } from "../types/myTypes";
import { getAllCourses } from "../apis/backend";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";
import { useNavigate } from "react-router-dom";

type CustomButtonProps = {
  rowData: courseType;
};

const CustomButton = ({ rowData }: CustomButtonProps) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex gap-4 justify-content-around mt-2 ">
      <i
        // onClick={editCourse}
        className="fa-solid fa-upload"
        style={{ cursor: "pointer" }}
      >Upload Grades</i>
    </div>
  );
};

type CustomButtonRendererParams = {
  data: courseType;
  value: any;
  valueFormatted: any;
  getValue: () => any;
  setValue: (value: any) => void;
  node: RowNode;
  colDef: ColDef;
  column: Column;
  rowIndex: number;
  api: GridApi;
  columnApi: ColumnApi;
  context: any;
  refreshCell: () => void;
  eGridCell: HTMLElement;
  eParentOfValue: HTMLElement;
};

const CustomButtonRenderer = (params: CustomButtonRendererParams) => {
  return <CustomButton rowData={params.data} />;
};

interface CourseConfTabProps {
  queryText: string;
  searchStatus: boolean;
}

const UploadGradesPart1Tab: React.FC<CourseConfTabProps> = ({
  queryText,
  searchStatus,
}) => {
  const [courses, setCourses] = useState<courseType[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<courseType[]>([]);

  const [colDefs, setColDefs] = useState([
    {
      field: "Course_Code",
      flex: 1,
    },
    { field: "Course_Name", flex: 1 },
    { field: "Status", flex: 1 },
    { field: "Actions", flex: 1, cellRenderer: CustomButtonRenderer },
  ]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await getAllCourses();
        // console.log("Terms", res);
        const filteredTerms = res.map((course: courseType) => ({
          id: course.id,
          Course_Code: course.course_code,
          Course_Name: course.course_name,
          Status: course.status == "Active" ? true : false,
          Actions: "remove", // Ensure this field is correctly mapped if required
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

  const putGrades = async (e: any, rowData:any|undefined,navigatee: (path: string) => void) => {
    e.stopPropagation();
    console.log("maybe some stuff", e);
    console.log("maybe some stuff", rowData.Course_Name);
    console.log("maybe some stuff", rowData);

    // console.log(rowData.id);
    const seshID = sessionStorage.getItem("key");
    console.log(seshID);
    //const navigate=useNavigate();
    navigatee(`/updateGrade?id=${rowData?.id}&&course_nm=${rowData?.Course_Name}`);
    
  };
  const navigate=useNavigate();

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
          onCellClicked={(e) => putGrades(e.event, e.data,navigate)}        
          />
      </div>
    </div>
  );
};

export default UploadGradesPart1Tab;
