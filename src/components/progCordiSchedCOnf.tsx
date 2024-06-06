import ProgCordiTab from "./progCordiTab";

function ProgCordSchedConf ()
{
    return(
        <div>
            <hr style={{width:'95%', margin:'auto'}}/>
            <div className='d-flex justify-content-between mt-3 mb-0'>
                 <p className="p-0 ms-5 mb-0 mt-2 ">Scheduler Configuration</p>
            </div>
                <ProgCordiTab/>
        </div>
    );
}

export default ProgCordSchedConf;