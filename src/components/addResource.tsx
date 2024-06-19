import NavBar from "./navbar";
import {useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { termType } from "../types/myTypes";
import { updateOrDeleteTerm } from "../apis/backend";

function AddResource() {
  const navigate = useNavigate();
  const [termName, setTermName] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  console.log(status);

  const dates = dateTime.split("-");

  const location = useLocation();
  const termId = new URLSearchParams(location.search).get("id");
  //const termDetails = new URLSearchParams(location.search).get("term");
  console.log("Term id:", termId);
  const [termData, setTermData] = useState<termType>({
    id:"",
    term_name: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  useEffect(() => {
    setTermData({
      id: termId,
      term_name: termName,
      start_date: dates[0],
      end_date: dates[1],
      status: status,
    });
  }, [termName, dateTime, status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("termData: ", termData);
    updateOrDeleteTerm(termId, termData, "MODIFY");
      navigate("/term");
  };

  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="w-100">
        <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
          Update Term Detail
        </p>
        <hr style={{ width: "95%", margin: "auto" }} />

        <form
          className="d-flex flex-row jutify-content-evenly w-100"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column ms-5 w-50">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: termName ? "none" : "" }}
              >
                <label htmlFor="name">Name</label>
                <span className="star">*</span>
              </div>
              <input
                id="name"
                type="text"
                className="form-control"
                value={termName}
                onChange={(e) => setTermName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="d-flex flex-column ms-5 w-50 me-5">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: dateTime ? "none" : "" }}
              >
                <label htmlFor="datetime">StartDate - EndDate</label>
                <span className="star">*</span>
              </div>
              <input
                id="datetime"
                type="text"
                className="form-control"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 form-group">
              <div
                className="palceholder ms-1"
                style={{ display: status ? "none" : "" }}
              >
                <label htmlFor="file">Status</label>
                <span className="star"> *</span>
              </div>
              <select
                name="block"
                className="form-select"
                id="blockno"
                aria-label="Floating label select example"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option id="examrole" value="" disabled selected></option>
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </select>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "105px", height: "44px" }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddResource;
