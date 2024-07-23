import { createContext, useState } from "react";

// Create a context
const AttendanceContext = createContext();

// Create a provider component
const AttendanceProvider = ({ children }) => {
  // const [rowData, setRowData] = useState<attendance>([]);
  const [isCellClicked, setIsCellCliked] = useState<boolean>(false);
  const [queryHandler, setQueryHandler] = useState<boolean>(false);
  const [AttendanceHandler, setAttendanceHandler] = useState<boolean>(false);
  const [userid, setUserId] = useState<string>("");
  const [examid, setExamid] = useState<string>("");
  const [markTime, setMarkTime] = useState<string>("");

  return (
    <AttendanceContext.Provider
      value={{
        isCellClicked,
        setIsCellCliked,
        queryHandler,
        setQueryHandler,
        AttendanceHandler,
        setAttendanceHandler,
        userid,
        setUserId,
        examid,
        setExamid,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export { AttendanceContext, AttendanceProvider };
