import RoomConfTab from "./roomConfTab";
function RoomConf()
{
    return(
        <div>
            <hr style={{width:'95%', margin:'auto'}}/>
            <div className='d-flex justify-content-between mt-3'>
                 <p className="p-0 ms-5 mb-0 mt-2 ">Room Configuration</p>
            </div>
            <RoomConfTab/>
        </div>
    );
}

export default RoomConf;