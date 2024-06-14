import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';
import Custom_button from './actions';
import { getAllUsers } from '../apis/backend';
import { getuserType, userMappedType} from '../types/myTypes';
import { useEffect } from 'react';

function UserCourseConfTab()
{
    const [obt_users,setObtUsers]=useState<userMappedType[]>([]);
    
    useEffect(() => {
    const fetchusers = async () => {
        try {
        const res: getuserType[] = await getAllUsers();

        const mappedRowData = res.map((row) => ({
            id: row.id,
            roll_number: row.roll_number,
            Uname:row.name,
            email:row.email,
            role:row.role,
            status:row.status
        }));

        setObtUsers(mappedRowData);
        console.log("some data",mappedRowData);
        } catch (error) {
        console.log("Error fetching data:", error);
        }
    };
    fetchusers();
    }, [getAllUsers]);  

    const [colDefs, setColDefs] = useState<ColDef<getuserType, unknown>[]>([
        {field: "roll_number",headerName: "Employee Number",flex: 1,headerCheckboxSelection: true},
        { field: "Uname", headerName: "Name", flex: 1 },
        { field: "email",headerName: "Email",flex: 1,},
        { field: "role",headerName: "Role",flex: 1,},
        { field: "status",headerName:" Status",flex:1},
        { field: "Actions",flex:1,cellRenderer:Custom_button}
    ]);



    //   const [rowData, setRowData] = useState([
    //         {Employee_No:'500',Name:'Maxx',Email:'madmax@gmail.com',Role:'Staff',Active: true, Actions: 'Remove'},
    //         {Employee_No:'500',Name:'Maxx',Email:'madmax@gmail.com',Role:'Staff',Active: true, Actions: 'Remove'},
    //         {Employee_No:'500',Name:'Maxx',Email:'madmax@gmail.com',Role:'Staff',Active: true, Actions: 'Remove'}
    //     ]);
        
    //     const [colDefs, setColDefs] = useState([
    //     { field: "Employee_No",flex:1},
    //     { field: "Name",flex:1},
    //     { field: "Email",flex:1},
    //     { field: "Role",flex:1},
    //     { field: "Active",flex:1},
    //     { field: "Actions",flex:1,cellRenderer:Custom_button}
    //     ]);
        
      return(
        <div>
            <div className="ag-theme-quartz mt-4 ms-5 shadow"style={{ height:400 , width:'90%'}}>
                <AgGridReact rowSelection="multiple" rowData={obt_users} columnDefs={colDefs} />
            </div>
        
        </div>
    ); 
}

export default UserCourseConfTab;

