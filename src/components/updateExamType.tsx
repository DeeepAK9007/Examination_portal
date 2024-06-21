import { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "./navbar";
import { ExamTypeType } from "../types/myTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOrDeleteExamType } from "../apis/backend";

function UpdateExamType() {
  const navigate = useNavigate();
  const [examType, setExamType] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [actStatus, setActStat] = useState<string>("");

  const location = useLocation();
  const examTypeId = new URLSearchParams(location.search).get("id");
  const examtypeobj = new URLSearchParams(location.search).get("examtype");
  console.log("ExamType id:", examTypeId);
  const [examTypeData, setExamTypeData] = useState<ExamTypeType>({
    id: "",
    exam_type_name: "",
    remark: "",
    status: "",
  });

  useEffect(() => {
    if (examTypeId && examtypeobj) {
      const jsonobj = JSON.parse(atob(examtypeobj));
      setExamType(jsonobj.exam_type_name);
      setRemarks(jsonobj.remark);
      setActStat(jsonobj.status);
    } else {
      console.error("Exam Type ID is null");
    }
  }, []);

  useEffect(() => {
    if (examTypeId && examtypeobj) {
      const jsonobj = JSON.parse(atob(examtypeobj));
      console.log(jsonobj);
      setExamTypeData({
        id: examTypeId,
        exam_type_name: examType ? examType : jsonobj.exam_type_name,
        remark: remarks ? remarks : jsonobj.remark,
        status: actStatus ? actStatus : jsonobj.status,
      });
    } else {
      console.error("Exam Type ID is null");
    }
  }, [examType, remarks, actStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (examTypeId) {
      console.log("examTypeData: ", examTypeData);
      await updateOrDeleteExamType(examTypeId, examTypeData, "MODIFY");
      navigate("/examType");
    } else {
      console.error("Exam Type ID is null");
    }
  };
  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="w-100">
        <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
          Update Exam Type
        </p>
        <hr style={{ width: "95%", margin: "auto" }} />

        <form
          id="examtypeform"
          className="d-flex flex-row jutify-content-evenly w-100"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column ms-5 w-50">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: examType ? "none" : "" }}
              >
                <label htmlFor="roomno">Exam Type</label>
              </div>
              <input
                id="roomno"
                type="text"
                className="form-control"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-column ms-5 w-50 me-5">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: remarks ? "none" : "" }}
              >
                <label htmlFor="capa">Remarks</label>
              </div>
              <input
                id="capa"
                type="string"
                className="form-control"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <div className="mb-3 form-group">
              <div
                className="palceholder ms-1"
                style={{ display: actStatus ? "none" : "" }}
              >
                <label htmlFor="file">Status</label>
              </div>
              <select
                name="block"
                className="form-select"
                id="blockno"
                aria-label="Floating label select example"
                value={actStatus}
                onChange={(e) => setActStat(e.target.value)}
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

export default UpdateExamType;
