import { useState } from "react";
import "./styles.css";
import { batchType } from "../types/myTypes";

function AddBatch() {
  const [batchName, setBatchName] = useState<string>("");

  const handleBatchNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBatchName(event.target.value);
    console.log(batchName);
  };

  async function batchAdd(e : React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    // const params = new URLSearchParams();
    const newobj: batchType={
      batch_name: batchName
    }
    const jsonobj=JSON.stringify(newobj);

    const encode=btoa(jsonobj);
    
    // params.append("resource",encode);
    const seshID=sessionStorage.getItem("key");
    // params.append("session_id",seshID);

    const response=await fetch("http://localhost:8081/api/batch?session_id="+seshID+"&resource="+encode,{
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: "cors"
    });

    console.log("obj toi send",encode);
    console.log("sesh id here",seshID);
    // console.log("param here",params);
    console.log("response here", response);
  }

  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        Add Batch Detail
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <form className="d-flex flex-row jutify-content-evenly w-100">
        <div className="d-flex flex-column ms-5 w-50 me-5">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: batchName ? "none" : "" }}
            >
              <label htmlFor="name">Enter Batch Name</label>
              <span className="star">*</span>
            </div>
            <input
              id="name"
              type="text"
              className="form-control"
              value={batchName}
              onChange={handleBatchNameChange}
              required
            />
          </div>
          <div className="d-flex justify-content-end mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "105px", height: "44px" }}
              onClick={batchAdd}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBatch;
