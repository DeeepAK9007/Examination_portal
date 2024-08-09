import AddBatch from "./addBatch";
import BatchConf from "./batchConf";
import NavBar from "./navbar";

function Batch() {
  return (
    <div className="d-flex flex-row">
      {/* Navigation bar */}
      <NavBar />
      <div className="d-flex flex-column w-100 justify-content-between">
        {/* Component for adding a new batch */}
        <AddBatch />

        {/* Component for batch configuration */}
        <BatchConf />
      </div>
    </div>
  );
}

export default Batch;
