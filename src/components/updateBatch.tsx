import { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "./navbar";
// import { batchMappedType } from "../types/myTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOrDeleteBatch } from "../apis/backend";
import { batchType } from "../types/myTypes";

function UpdateBatch() {
  const navigate = useNavigate();
  const [batchName, setBatchName] = useState<string>("");
  const [actStatus, setActStatus] = useState<string>("");

  const location = useLocation();
  const batchId = new URLSearchParams(location.search).get("id");
  const batchobj = new URLSearchParams(location.search).get("batch");

  console.log("Batch id:", batchId);
  const [batchData, setBatchData] = useState<batchType>({
    id: "",
    batch_name: "",
    status: "",
  });

  useEffect(() => {
    if (batchId && batchobj) {
      const jsonobj = JSON.parse(atob(batchobj));
      setBatchName(jsonobj.batch_name);
      setActStatus(jsonobj.status);
    } else {
      console.error("Batch ID is null");
    }
  }, []);

  useEffect(() => {
    if (batchId && batchobj) {
      const jsonobj = JSON.parse(atob(batchobj));
      setBatchData({
        id: batchId,
        batch_name: batchName ? batchName : jsonobj.batch_name,
        status: actStatus ? actStatus : jsonobj.status,
      });
    } else {
      console.error("Batch ID is null");
    }
  }, [batchId, batchName, actStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (batchId) {
      console.log("batchData: ", batchData);
      await updateOrDeleteBatch(batchId, batchData, "MODIFY");
      navigate("/batch");
    } else {
      console.error("Batch ID is null");
    }
  };

  return (
    <div className="d-flex flex-row">
      <NavBar />
      <div className="w-100">
        <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
          Update Batch Detail
        </p>
        <hr style={{ width: "95%", margin: "auto" }} />

        <form
          className="d-flex flex-row jutify-content-evenly w-100"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column ms-5 w-50 me-5">
            <div className="mb-3 mt-5 form-group">
              <div
                className="palceholder"
                style={{ display: batchName ? "none" : "" }}
              >
                <label htmlFor="name">Enter Batch Name</label>
              </div>
              <input
                id="name"
                type="text"
                className="form-control"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
              />
            </div>
            <div className="mb-3 form-group">
              <div className="palceholder ms-1" style={{ display: "none" }}>
                <label htmlFor="file">Status</label>
              </div>
              <select
                name="block"
                className="form-select"
                id="blockno"
                aria-label="Floating label select example"
                value={actStatus}
                onChange={(e) => setActStatus(e.target.value)}
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

export default UpdateBatch;
