import { useState } from "react";
import "./styles.css";
import { ExamTypeType } from "../types/myTypes";
function AddRoomDet() {
  const [examType, setExamType] = useState<string>("");
  const [remmarks, setRemmarks] = useState<string>("");
  const [actStatus, setActStat] = useState<string>("");


async function addExamType(e : React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newRoom: ExamTypeType={
        exam_type_name:examType,
        remark:remmarks,
        status:actStatus 
    }

    console.log(newRoom);

    const jsonobj= JSON.stringify(newRoom);
    console.log(jsonobj);
    const encode=btoa(jsonobj);
    console.log(encode);
    const seshID=sessionStorage.getItem("key");
    console.log(seshID);

    const response=await fetch("http://localhost:8081/api/exam_type?session_id="+seshID+"&resource="+encode,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors"
      });
    console.log(response);
  }
  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        Exam Type
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <form className="d-flex flex-row jutify-content-evenly w-100">
        <div className="d-flex flex-column ms-5 w-50">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: examType ? "none" : "" }}
            >
              <label htmlFor="roomno">Exam Type</label>
              <span className="star">*</span>
            </div>
            <input
              id="roomno"
              type="text"
              className="form-control"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="d-flex flex-column ms-5 w-50 me-5">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: remmarks ? "none" : "" }}
            >
              <label htmlFor="capa">Remarks</label>
              <span className="star">*</span>
            </div>
            <input
              id="capa"
              type="string"
              className="form-control"
              value={remmarks}
              onChange={(e) => setRemmarks(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: actStatus ? "none" : "" }}
            >
              <label htmlFor="file">Status</label>
              <span className="star"> *</span>
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
              onClick={addExamType}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRoomDet;
