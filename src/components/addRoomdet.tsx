import { useState } from "react";
import "./styles.css";
import { RoomType } from "../types/myTypes";

function AddRoomDet() {
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [roomCapacity, setCapacity] = useState<number | undefined>(undefined);
  const [selectedBlock, setSelectedBlock] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBlock(event.target.value);
    console.log(event.target.value);
  };

async function addSingRoom(e : React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newRoom: RoomType={
        room_number:roomNumber,
        block:selectedBlock,
        capacity:roomCapacity    
    }

    console.log(newRoom);

    const jsonobj= JSON.stringify(newRoom);
    console.log(jsonobj);
    const encode=btoa(jsonobj);
    console.log(encode);
    const seshID=sessionStorage.getItem("key");
    console.log(seshID);

    const response=await fetch("http://localhost:8081/api/room?session_id="+seshID+"&resource="+encode,
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
              style={{ display: roomCapacity ? "none" : "" }}
            >
              <label htmlFor="capa">Capacity</label>
              <span className="star">*</span>
            </div>
            <input
              id="capa"
              type="number"
              className="form-control"
              value={roomCapacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              required
            />
          </div>
        </div>
        <div className="d-flex flex-column ms-5 w-50 me-5">
          <div className="mb-3 mt-5 form-group">
            <div
              className="palceholder ms-1"
              style={{ display: selectedBlock ? "none" : "" }}
            >
              <label htmlFor="file">Block</label>
              <span className="star"> *</span>
            </div>
            <select
              name="block"
              className="form-select"
              id="blockno"
              aria-label="Floating label select example"
              value={selectedBlock}
              onChange={handleSelectChange}
            >
              <option id="examrole" value="" disabled selected></option>
              <option value="Ramanujan">Ramanujan</option>
              <option value="Bhaskar">Bhaskar</option>
            </select>
          </div>
          <div className="d-flex justify-content-end mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "105px", height: "44px" }}
              onClick={addSingRoom}
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
