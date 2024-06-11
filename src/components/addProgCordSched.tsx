import { useState } from "react";

function AddProgSched() {
  const [dateTime, setDateTime] = useState<string>("");
  const [examName, setExamName] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        Add Schedule
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <form className="d-flex flex-row jutify-content-evenly w-100">
        <div className="d-flex flex-column ms-5 w-50">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: dateTime ? "none" : "" }}
            >
              <label htmlFor="datetime">Date Time</label>
              <span className="star"> *</span>
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
              style={{ display: selectedCourse ? "none" : "" }}
            >
              <label htmlFor="file">Select Course</label>
              <span className="star"> *</span>
            </div>
            <select
              name="Exam Role"
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={selectedCourse}
              onChange={handleSelectChange}
            >
              <option
                id="examrole"
                value=""
                disabled
                selected
                className="default-option"
              ></option>
              <option value="DSA">DSA</option>
              <option value="Computer Architecture">
                Computer Architecture
              </option>
              <option value="DMS">DMS</option>
            </select>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="Remark" />
          </div>
        </div>
        <div className="d-flex flex-column ms-5 w-50 me-5">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: examName ? "none" : "" }}
            >
              <label htmlFor="examname">Exam Name</label>
              <span className="star"> *</span>
            </div>
            <input
              id="examname"
              type="text"
              className="form-control"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: selectedCourse ? "none" : "" }}
            >
              <label htmlFor="file">Location/Room</label>
              <span className="star"> *</span>
            </div>
            <select
              name="Assign invigilator"
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              value={selectedCourse}
              onChange={handleSelectChange}
            >
              <option
                id="examrole"
                value=""
                disabled
                selected
                className="default-option"
              ></option>
              <option value="1">R-203</option>
              <option value="2">R-200</option>
              <option value="3">R-400</option>
            </select>
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

export default AddProgSched;
