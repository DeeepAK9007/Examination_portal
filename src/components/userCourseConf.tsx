import UserCourseConfTab from "./userCourseConfTab";

function UserCourseConf ()
{
    return(
        <div>
            <hr style={{width:'95%', margin:'auto'}}/>
            <div className='d-flex justify-content-between mt-3'>
                 <p className="p-0 ms-5 mb-0 mt-2 ">Course Configuration</p>
                 <div className="d-flex flex-row">
                        
                        <button type="button" className="btn btn-primary me-5" style={{width:'155px',height:'38px', fontSize:'12px'}}>Bulk upload</button>

                        <button type="button" className="btn btn-primary me-2" style={{width:'155px',height:'38px', fontSize:'12px'}}>Mapp</button>
                        
                        <div className="input-group">
                            <div id="search-autocomplete" className="form-outline" data-mdb-input-init>
                                <input type="search" id="form1" className="form-control" placeholder="Course Name" />
                                <label className="form-label" for="form1"></label>
                            </div>
                        <button type="button" className="btn btn-primary" data-mdb-ripple-init style={{width:'50px',height:'38px'}}>
                            <i className="fas fa-search"></i>
                        </button>
                        </div>

                        <button type="button" className="btn btn-primary me-5" style={{width:'50px',height:'38px'}}>
                            <i className="fa-solid fa-rotate-right"></i>
                        </button>
                 
                 </div>
            </div>
                <UserCourseConfTab/>
            </div>
    );
}

export default UserCourseConf;