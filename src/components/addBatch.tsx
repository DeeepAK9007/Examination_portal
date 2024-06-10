import { useState } from "react";
import "./styles.css";

function AddBatch() {
  const [batchName, setBatchName] = useState<string>("");

  const handleBatchNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBatchName(event.target.value);
  };

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
              type="button"
              className="btn btn-primary"
              style={{ width: "105px", height: "44px" }}
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
