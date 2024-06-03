import BatchConfTab from "./batchConftab";
function BatchConf ()
{
    return(
        <div>
            <hr style={{width:'95%', margin:'auto'}}/>
            <div className='d-flex justify-content-between mt-3'>
                 <p className="p-0 ms-5 mb-0 mt-2 ">Batch Configuration</p>
            </div>
            <BatchConfTab/>
        </div>
    );
}

export default BatchConf;