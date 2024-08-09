import ProgCordiTab from "./progCordiTab";

function ProgCordSchedConf() {
  return (
    <div>
      <hr style={{ width: "95%", margin: "auto" }} />
      <div className="d-flex justify-content-between mt-3 mb-0">
        <p className="p-0 ms-5 mb-0 mt-2 ">
          <h3>Scheduler Configuration</h3>
        </p>
      </div>
      {/* Include the ProgCordiTab component */}
      <ProgCordiTab />
    </div>
  );
}

export default ProgCordSchedConf;
