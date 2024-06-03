import CourseConfTab from "./courseConfTab";

function CourseConf ()
{
    return(
        <div>
            <hr style={{width:'95%', margin:'auto'}}/>
            <div className='d-flex justify-content-between mt-3'>
                 <p className="p-0 ms-5 mb-0 mt-2 ">Course Configuration</p>
            </div>
            <CourseConfTab/>
        </div>
    );
}

export default CourseConf;