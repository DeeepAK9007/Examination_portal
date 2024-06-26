import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useEffect, useState } from "react";
import YesNoToggle from "./yesNoToggle";
import { getStudentsByCourseId } from "../apis/backend";
import { getUserById } from "../apis/backend";

interface PhotoComponentProps {
  value: string;
}

const PhotoComponent: React.FC<PhotoComponentProps> = (props) => {
  // console.log(props.value);
  return (
    <img
      style={{ height: "100px", width: "100px" }}
      src={props.value}
      alt="the pic"
    />
  );
};

interface studentId {
  id: string;
}

const AttendTab: React.FC<studentId> = ({ id }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "Name", headerCheckboxSelection: true, sort: "asc", flex: 1 },
    { field: "Present", flex: 1, cellRenderer: YesNoToggle },
    { field: "MarkTime", flex: 1 },
    { field: "Photo", flex: 1, cellRenderer: PhotoComponent },
  ]);
  useEffect(() => {
    const fetchStudentsByCourseId = async () => {
      try {
        const response = await getStudentsByCourseId(id);
        console.log("response", response);

        const userIds = response.map(
          (student) => student.user_type_enrollment_id
        );

        const userPromises = userIds.map((userId) => getUserById(userId));

        const users = await Promise.all(userPromises);

        console.log("users from attendance: ", users);

        const formattedData = users.map((user) => ({
          Name: user[0].name,
          Present: user.present,
          MarkTime: "05032003",
          Photo:
            "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        }));
        setRowData(formattedData);
      } catch {
        console.log("error in fetching students");
      }
    };
    fetchStudentsByCourseId();
  }, [id]);

  return (
    <div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 400, width: "93%" }}
      >
        <AgGridReact
          rowSelection="multiple"
          resizable={true}
          headerCheckboxSelection={true}
          rowData={rowData}
          columnDefs={colDefs}
          frameworkComponents={{ PhotoComponent }}
        />
      </div>
    </div>
  );
};

export default AttendTab;
