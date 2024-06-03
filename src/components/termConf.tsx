import TermConfTab from "./termConfTab";

function TermConf ()
{
    return(
        <div>
            <hr style={{width:'95%', margin:'auto'}}/>
            <div className='d-flex justify-content-between mt-3'>
                 <p className="p-0 ms-5 mb-0 mt-2 ">Term Configuration</p>
            </div>
            <TermConfTab/>
        </div>
    );
}

export default TermConf;