import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useEffect, useState, useContext } from "react";
import "./YesNoButton.css";
import { IncidentContext } from "../context/IncidentContext";
import {
  getAllSchedules,
  getStudentsByCourseId,
  getUserById,
} from "../apis/backend";
import { incidentType, incident } from "../types/myTypes";

// Toggle component for Yes/No switch
const YesNoToggle = () => {
  const [isYes, setIsYes] = useState<boolean>(false);

  const handleToggle = () => {
    setIsYes(!isYes);
  };

  return (
    <div className="form-check form-switch yes-no-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="yesNoSwitch"
        checked={isYes}
        onChange={handleToggle}
      />
      <label className="form-check-label" htmlFor="yesNoSwitch"></label>
    </div>
  );
};

// Photo component to display student photos
interface PhotoComponentProps {
  value: string;
}

const PhotoComponent: React.FC<PhotoComponentProps> = (props) => {
  console.log(props.value);
  return (
    <img
      style={{ height: "100px", width: "100px" }}
      src={props.value}
      alt="the pic"
    />
  );
};

// Props interface for the IncidentTab component
interface studentId {
  id: string;
}

// IncidentTab component
const IncidentTab: React.FC<studentId> = ({ id }) => {
  const { isCellClicked, setIsCellCliked, queryHandler, IncidentHandler } =
    useContext(IncidentContext);

  useContext(IncidentContext); // Use the context
  console.log("data from AttendanceTab:", isCellClicked);
  const [rowData, setRowData] = useState([]);
  const [ExamName, setExamName] = useState<string>("");
  const [attendanceData, setAttendanceData] = useState<incident[]>({
    exam_schedule_id: "",
    user_id: "",
    attendance: "",
  });
  const [filteredIncident, setFilteredIncident] = useState<incidentType[]>([]);
  const [examTypes, setexamTypes] = useState([]);

  console.log("query text from IncidentTab: ", queryHandler);

  // Columns definition for ag-Grid
  const [colDefs, setColDefs] = useState([
    { field: "Name", headerCheckboxSelection: true, sort: "asc", flex: 1 },
    { field: "IncidentReported", flex: 1, cellRenderer: YesNoToggle },
    { field: "Remarks", flex: 1 },
    { field: "MarkedTime", flex: 1 },
    { field: "Photo", sortable: true, flex: 1, cellRenderer: PhotoComponent },
  ]);

  // Handle cell click events in the grid
  const onCellClicked = (params: any) => {
    console.log("params data from incident tab", params.data.Id);
    console.log("from cell clicked:", IncidentHandler);

    const result = examTypes.filter(
      (item) => item.examination_name === ExamName
    );

    console.log("result", result);

    // setAttendanceData({
    //   exam_schedule_id: result[0].id,
    //   user_id: params.data.Id,
    //   attendance: params.data,
    // });

    // console.log("attendace data", attendanceData);
    // // useEffect(() => {
    // }, []);

    if (params.colDef.field === "Name") {
      setIsCellCliked(true);
      console.log("change data from IncidentTab:", isCellClicked);
    }
  };

  // useEffect to fecth students by courseid

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
        console.log(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );

        const formattedData = users.map((user) => ({
          Id: user[0].id,
          Name: user[0].name,
          Present: IncidentHandler,
          MarkTime: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          Photo: user.image_url,
        }));
        setRowData(formattedData);
      } catch {
        console.log("error in fetching students");
      }
    };
    fetchStudentsByCourseId();
  }, [id]);

  // search opeartion

  useEffect(() => {
    const filterAttendance = () => {
      if (!queryHandler) {
        setFilteredIncident(rowData);
      } else if (queryHandler) {
        const lowerCaseQuery = queryHandler.toLowerCase();
        const filtered = rowData.filter((batch) =>
          Object.values(batch).some((value) =>
            String(value).toLowerCase().includes(lowerCaseQuery)
          )
        );
        setFilteredIncident(filtered);
      }
    };

    filterAttendance();
  }, [queryHandler, rowData]);

  // useEffect for getting all the schedules

  useEffect(() => {
    const fetchExamTypes = async () => {
      const res = await getAllSchedules();

      console.log("all schedules", res);

      setexamTypes(res);
    };
    fetchExamTypes();
  }, []);

  return (
    <div>
      <div>
        <hr style={{ width: "95%", margin: "auto" }} />
        <select
          name="block"
          className="form-select"
          id="blockno"
          aria-label="Floating label select example"
          value={ExamName}
          onChange={(e) => setExamName(e.target.value)}
        >
          <option id="examrole" value="" disabled selected>
            Exam Type
          </option>
          {examTypes.map((exam, index) => (
            <option key={index} value={exam.examination_name}>
              {exam.examination_name}
            </option>
          ))}
        </select>
      </div>
      <div
        className="ag-theme-quartz mt-4 ms-5 shadow"
        style={{ height: 250, width: "93%", overflowY: "auto" }}
      >
        <AgGridReact
          rowSelection="multiple"
          headerCheckboxSelection={true}
          rowData={filteredIncident}
          onCellClicked={onCellClicked}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
};

export default IncidentTab;
