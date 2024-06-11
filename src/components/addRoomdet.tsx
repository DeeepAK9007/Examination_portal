import { useState } from "react";
import "./styles.css";

function AddRoomDet() {
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div>
      <p className="p-0 ms-5 mb-0 mt-5" style={{ paddingTop: "1px" }}>
        Add Room Detail
      </p>
      <hr style={{ width: "95%", margin: "auto" }} />

      <form className="d-flex flex-row jutify-content-evenly w-100">
        <div className="d-flex flex-column ms-5 w-50">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder"
              style={{ display: roomNumber ? "none" : "" }}
            >
              <label htmlFor="roomno">Room Number</label>
              <span className="star">*</span>
            </div>
            <input
              id="roomno"
              type="text"
              className="form-control"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-group">
            <div
              className="palceholder"
              style={{ display: capacity ? "none" : "" }}
            >
              <label htmlFor="capa">Capacity</label>
              <span className="star">*</span>
            </div>
            <input
              id="capa"
              type="number"
              className="form-control"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="d-flex flex-column ms-5 w-50 me-5">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: selectedCourse ? "none" : "" }}
            >
              <label htmlFor="file">Block</label>
              <span className="star"> *</span>
            </div>
            <select
              name="block"
              className="form-select"
              id="blockno"
              aria-label="Floating label select example"
              value={selectedCourse}
              onChange={handleSelectChange}
            >
              <option id="examrole" value="" disabled selected></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
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

export default AddRoomDet;
