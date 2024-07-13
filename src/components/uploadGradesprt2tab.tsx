import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import { studsBycourse } from "../types/myTypes";
import { getEnrollbyCours } from "../apis/backend";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";
import { updateGradeType } from "../types/myTypes";
import { updtGrades } from "../apis/backend";
type CustomButtonProps = {
  rowData: studsBycourse;
};

const CustomButton = ({ rowData }: CustomButtonProps) => {
const [state1,setstat1]=useState(rowData);
const [state2,setstat2]=useState(rowData);


  const upld_grd= async (e : React.MouseEvent<HTMLElement>) => {
    console.log("heyy there");
    console.log(rowData);
    const data:updateGradeType={    
      id:rowData.id,
      grade:rowData.Grade,
      remarks:rowData.Remark
    }
    console.log("new dta here!!!",data);
    const response= updtGrades(data);
    window.location.reload();
  }
  return (
        <i className="fa-regular fa-floppy-disk" onClick={(e)=>{upld_grd(e)}} style={{cursor:"pointer"}}>
        </i>
  );
};

type CustomButtonRendererParams = {
  data: studsBycourse;
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
    { field: "Grade", flex: 1 , editable: true, cellEditor: 'agTextCellEditor'},
    { field: "Remark", flex: 1, editable: true, cellEditor: 'agTextCellEditor' },
    {field: "Save Changes", flex: 1, cellRenderer: CustomButtonRenderer} 
  ]);

  useEffect(() => {
    const fetchUsersMapped = async () => {
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
          Remark: stud.remarks, // Ensure this field is correctly mapped if required
        }));
        setCourses(filteredTerms);
        // console.log("Response");
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchUsersMapped();
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
          //onCellEditingStopped={}
          />
      </div>
    </div>
  );
};

export default UploadGradesPart2Tab;


