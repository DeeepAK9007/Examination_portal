import TermConfTab from "./termConfTab";

function TermConf() {
    return (
        <div>
            <hr style={{ width: '95%', margin: 'auto' }} />
            <div className='d-flex justify-content-between mt-3'>
                <p className="p-0 ms-5 mb-0 mt-2 ">Term Configuration</p>

                <div className="d-flex flex-row">

                    <div className="dropdown-center me-5">
                        <button
                            className="btn btn-danger dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Action
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" style={{ color: "red" }} href="#">
                                    Donwload Hall ticket
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="input-group">
                        <div id="search-autocomplete" className="form-outline" data-mdb-input-init>
                            <input type="search" id="form1" className="form-control" placeholder="Term Name" />
                            <label className="form-label"></label>
                        </div>
                        <button type="button" className="btn btn-primary" data-mdb-ripple-init style={{ width: '50px', height: '38px' }}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>

                    <button type="button" className="btn btn-primary me-5" style={{ width: '50px', height: '38px' }} onClick={() => { window.location.reload(); }}>
                        <i className="fa-solid fa-rotate-right"></i>
                    </button>

                </div>

            </div>
            <TermConfTab />
        </div>
    );
}

export default TermConf;