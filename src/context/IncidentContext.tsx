import { createContext, useState } from "react";

const IncidentContext = createContext();

const IncidentProvider = ({ children }) => {
  // const [rowData, setRowData] = useState<Incident>([]);
  const [isCellClicked, setIsCellCliked] = useState<boolean>(false);
  const [queryHandler, setQueryHandler] = useState<boolean>(false);
  const [IncidentHandler, setIncidentHandler] = useState<boolean>(false);

  return (
    <IncidentContext.Provider
      value={{
        isCellClicked,
        setIsCellCliked,
        queryHandler,
        setQueryHandler,
        IncidentHandler,
        setIncidentHandler,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

export { IncidentContext, IncidentProvider };
