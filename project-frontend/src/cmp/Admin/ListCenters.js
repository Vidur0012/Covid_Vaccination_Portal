import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { useHistory,Link} from 'react-router-dom';
import './StyledTable.css'


function ListCenters() {

    // for protected page
    const history = useHistory()
    useEffect(()=>{
        if(!localStorage.getItem("admin"))
        {
            history.push("/");
        }
    },[])

    const [data, setData] = useState([]);
    async function getData() {
        var res = await fetch("http://localhost:9700/centers/getCentersAdm");
        res = await res.json();
        if (res.wentWrong) {
            alert(res.message);
        }
        else {
            if (res.stat) {
                setData(res.centers);
            }
            else {
                alert(res.message);
            }
        }
    }
    useEffect(() => {
        getData();
    }, [])

    async function deleteCenter(c_id) {

        var res = await fetch("http://localhost:9700/centers/removeCenter", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                center_id: c_id
            })
        })
        res = await res.json();
        if (res.wentWrong) {
            alert(res.message);
        }
        else {
            if (!res.stat) {
                alert(res.message);
            }
            
        }
        getData();
    }

    return (
        <div className="StyledTable">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Total Slots<br />Dose1 &nbsp;&nbsp;&nbsp;Dose2 </th>
                    <th>Available Slots<br />Dose1 &nbsp;&nbsp;&nbsp;Dose2 </th>
                    <th>Date</th>
                    <th>Vaccinator</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((center) =>
                        <tr>
                            <td><b>{center.center_name}</b></td>
                            <td><b>{center.center_number}</b></td>
                            <td>{center.total_slots_d1} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{center.total_slots_d2}</td>
                            <td>{center.available_slots_d1} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{center.available_slots_d2}</td>
                            <td>{center.date}</td>
                            <td>{center.vaccinator_name}</td>
                            <td><Link to={"adminUpdCen/"+center._id}><Button >Update</Button></Link> &nbsp;&nbsp; <Button variant="danger" onClick={() => deleteCenter(center._id)}>Delete</Button></td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
        </div>
    )
}
export default ListCenters;

