import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from "react";
import Modal from "react-modal";
import PopUp from "./popUp";
import { courseType } from "../types/myTypes";
import { getAllCourses } from "../apis/backend";
import { ColDef, GridApi, ColumnApi, RowNode, Column } from "ag-grid-community";
import { deletestuff } from "../types/myTypes";
import { useNavigate } from "react-router-dom";

type CustomButtonProps = {
  rowData: courseType; // Props for CustomButton component containing course data
};

// Custom button component for edit and delete actions
const CustomButton = ({ rowData }: CustomButtonProps) => {
  const navigate = useNavigate();

  // Edit course handler
  const editCourse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key"); // Retrieve session ID
    console.log(seshID);
    navigate(
      `/editCourse?course=${btoa(JSON.stringify(rowData))}&&id=${rowData.id}` // Navigate to edit page with encoded course data
    );
  };
  // Delete course handler
  const deleteCourse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Row data:", rowData);
    console.log(rowData.id);
    const seshID = sessionStorage.getItem("key"); // Retrieve session ID
    console.log("&resource=id:" + rowData.id);
    const temp: deletestuff = { id: rowData.id }; // Prepare delete request payload
    const targ = JSON.stringify(temp); // Encode payload
    const enc = btoa(targ);
    const resource = await fetch(
      "http://localhost:8081/api/course?session_id=" +
        seshID +
        "&resource=" +
        enc +
        "&action=DELETE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );
    console.log("result:", resource);
    window.location.reload();
  };

  return (
    <div className="d-flex gap-4 justify-content-around mt-2 ">
      <i
        onClick={editCourse}
        className="fas fa-edit "
        style={{ cursor: "pointer" }}
      ></i>
      <i
        onClick={deleteCourse}
        className="fas fa-trash text-danger"
        style={{ cursor: "pointer" }}
      ></i>
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

// Renderer function for custom button in grid
const CustomButtonRenderer = (params: CustomButtonRendererParams) => {
  return <CustomButton rowData={params.data} />; // Pass row data to CustomButton
};

Modal.setAppElement("#root"); // For accessibility

interface CourseConfTabProps {
  queryText: string; // Search query text
  searchStatus: boolean; // Status indicating whether a search has been performed
}

// Main component for course configuration tab
const CourseConfTab: React.FC<CourseConfTabProps> = ({
  queryText,
  searchStatus,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility
  const [selectedCourse, setSelectedCourse] = useState<courseType | null>(null); // State for selected course

  // Handler for cell click events
  const onCellClicked = (params: any) => {
    if (params.colDef.field === "Course_Code") {
      setSelectedCourse(params.data); // Set selected course data
      setModalIsOpen(true); // Open modal
    }
  };

  // Handler to close the modal
  const closeModal = () => {
    setModalIsOpen(false); // Close modal
  };

  const [courses, setCourses] = useState<courseType[]>([]); // State for all courses
  const [filteredCourses, setFilteredCourses] = useState<courseType[]>([]); // State for filtered courses

  // Column definitions for ag-Grid
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
    { field: "Action", flex: 1, cellRenderer: CustomButtonRenderer },
  ]);

  // Styles for the modal
  const customStyles = {
    content: {
      top: "50%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
      height: "80%",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses(); // Fetch courses from API
        // console.log("Courses", res);
        const filteredCourses = res.map((course: courseType) => ({
          id: course.id,
          Course_Code: course.course_code,
          Course_Name: course.course_name,
          Instructor: course.instructor_id,
          Status: course.status == "Active" ? true : false,
          Action: "remove",
        }));
        setCourses(filteredCourses); // Set fetched courses
        // console.log("Response");
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on search query
  useEffect(() => {
    const filterCourses = () => {
      if (!queryText) {
        setFilteredCourses(courses); // Show all courses if no query
      } else if (queryText || searchStatus) {
        const lowerCaseQuery = queryText.toLowerCase();
        const filtered = courses.filter((course) =>
          Object.values(course).some((value) =>
            String(value).toLowerCase().includes(lowerCaseQuery)
          )
        );
        setFilteredCourses(filtered); // Set filtered courses
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
        style={{ height: 400, width: "93%", overflowY: "auto" }}
      >
        <AgGridReact
          rowSelection="multiple"
          headerCheckboxSelection={true}
          rowData={filteredCourses}
          domLayout="autoHeight"
          onCellClicked={onCellClicked}
          columnDefs={colDefs}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Cell Data Modal"
        style={customStyles}
      >
        {selectedCourse && <PopUp courseData={selectedCourse} />}
      </Modal>
    </div>
  );
};

export default CourseConfTab;
