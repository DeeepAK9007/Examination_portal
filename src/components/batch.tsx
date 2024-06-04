import AddBatch from "./addBatch";
import BatchConf from "./batchConf";
import NavBar from "./navbar"

function Batch()
{
    return(
        <div className="d-flex flex-row">
            <NavBar/>
            <div className="d-flex flex-column w-100 justify-content-between">
                <AddBatch/>
                <BatchConf/>
            </div>
        </div>
    );
}

export default Batch;