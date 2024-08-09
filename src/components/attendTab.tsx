import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState, useContext } from "react";
import { getAllSchedules, getStudentsByCourseId } from "../apis/backend";
import { getUserById } from "../apis/backend";
import { AttendanceContext } from "../context/AuthContext";
import { attendance, attendanceType } from "../types/myTypes";
import { addAttendance } from "../apis/backend";
import "./YesNoButton.css";

interface PhotoComponentProps {
  value: string;
}

// Component for rendering photos in grid cells
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

// Interface for student ID prop
interface studentId {
  id: string;
}

const AttendTab: React.FC<studentId> = ({ id }) => {
  // Context values and functions
  const {
    isCellClicked,
    setIsCellCliked,
    queryHandler,
    AttendanceHandler,
    setUserId,
    setExamid,
    examid,
  } = useContext(AttendanceContext);

  useContext(AttendanceContext);
  console.log("data from AttendanceTab:", isCellClicked);
  
  // State variables
  const [rowData, setRowData] = useState([]);
  const [ExamName, setExamName] = useState<string>("");
  const [filteredAttendance, setFilteredAttendance] = useState<
    attendanceType[]
  >([]);
  const [examTypes, setexamTypes] = useState([]);
  const [attendanceData, setAttendanceData] = useState<attendance[]>({
    exam_schedule_id: "",
    user_id: "",
    attendance: "",
  });
  const [present, setPresent] = useState<boolean>(false);
  const [timeMap, setTimeMap] = useState<Map<string, string>>(new Map());
  console.log("query text from AttendTab: ", queryHandler);
  const newTimeMap = new Map(timeMap);

  
  // Toggle button for Yes/No attendance
  const YesNoToggle = (params: any) => {
    const [isYes, setIsYes] = useState<boolean>(false);

    const handleToggle = () => {
      console.log("params from toggle button", params);

      setIsYes(!isYes);
      setPresent(isYes);
      
      const newTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      // Update time map and local storage
      newTimeMap.set(params.data.Id, newTime);
      localStorage.setItem(params.data.Id, newTime);
      console.log("new time map: ", newTimeMap);
      setTimeMap(newTimeMap);

      // Reload the page to reflect changes
      window.location.reload();
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

  // Column definitions for AG Grid
  const [colDefs, setColDefs] = useState([
    { field: "Name", headerCheckboxSelection: true, sort: "asc", flex: 1 },
    {
      field: "Present",
      flex: 1,
      cellRenderer: YesNoToggle,
    },
    { field: "MarkTime", flex: 1 },
    { field: "Photo", flex: 1, cellRenderer: PhotoComponent },
  ]);


  // Handle cell click event
  const onCellClicked = (params: any) => {
    console.log("params data from attend tab", params.data.Id);
    console.log("from cell clicked:", AttendanceHandler);

    const result = examTypes.filter(
      (item) => item.examination_name === ExamName
    );

    console.log("result", result[0].id);

    setUserId(params.data.Id);

    // console.log("exam id number:", examIdNo);

    setAttendanceData({
      exam_schedule_id: result[0].id,
      user_id: params.data.Id,
      attendance: AttendanceHandler == true ? "present" : "absent",
    });
    if (params.colDef.field === "Name") {
      setIsCellCliked(true);
      setExamid(result[0].id);
      console.log("change data from AttendanceTab:", isCellClicked);
    }

    if (params.colDef.field === "Present") {
      console.log("data from present column", {
        exam_schedule_id: result[0].id,
        user_id: params.data.Id,
        attendance: present == true ? "present" : "absent",
      });
      addAttendance({
        exam_schedule_id: result[0].id,
        user_id: params.data.Id,
        attendance: present == true ? "present" : "absent",
      });
    }
  };

  
  // Filter attendance based on search query
  useEffect(() => {
    const filterAttendance = () => {
      if (!queryHandler) {
        setFilteredAttendance(rowData);
      } else if (queryHandler) {
        const lowerCaseQuery = queryHandler.toLowerCase();
        const filtered = rowData.filter((batch) =>
          Object.values(batch).some((value) =>
            String(value).toLowerCase().includes(lowerCaseQuery)
          )
        );
        setFilteredAttendance(filtered);
      }
    };

    filterAttendance();
  }, [queryHandler, rowData]);

 
  // Fetch exam types from the backend
  useEffect(() => {
    const fetchExamTypes = async () => {
      const res = await getAllSchedules();

      console.log("all schedules", res);

      setexamTypes(res);
    };
    fetchExamTypes();
  }, []);

  // Fetch students by course ID and format data for the grid 
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

        const formattedData = users.map((user) => {
          sessionStorage.setItem(user[0].id, timeMap.get(user[0].id));
          console.log("localstorage value", localStorage.getItem(user[0].id));
          return {
            Id: user[0].id,
            Name: user[0].name,
            Present: AttendanceHandler,
            MarkTime: timeMap.get(user[0].id)
              ? timeMap.get(user[0].id)
              : localStorage.getItem(user[0].id),
            Photo: user.image_url,
          };
        });
        setRowData(formattedData);
      } catch {
        console.log("error in fetching students");
      }
    };
    fetchStudentsByCourseId();
  }, [id, timeMap, present]);

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
        style={{ height: 400, width: "93%" }}
      >
        <AgGridReact
          rowSelection="multiple"
          resizable={true}
          headerCheckboxSelection={true}
          rowData={filteredAttendance}
          onCellClicked={onCellClicked}
          columnDefs={colDefs}
          frameworkComponents={{ PhotoComponent }}
        />
      </div>
    </div>
  );
};

export default AttendTab;
