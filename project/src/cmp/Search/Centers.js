import React from "react";
import { Table,Button } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import './StyledTable.css'

// localhost:3000/book

function Centers({centers}) {
    const hist = useHistory()

    function registerVaccine(center,dose){
        if(dose===1){
            const book = {dose:1,center:center};
            localStorage.setItem("selection",JSON.stringify(book))
            hist.push("/book")
        }
        else{
            const book = {dose:2,center:center};
            localStorage.setItem("selection",JSON.stringify(book))
            hist.push("/book")
        }
    }
    
    return (
        <div className="StyledTable">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Center </th>
                    <th>Available Slots<br/>Dose1 &nbsp;&nbsp;&nbsp;Dose2 </th>
                    <th>Date</th>
                    <th>Vaccine</th>
                    <th>Book</th>
                </tr>
            </thead>
            <tbody>
                {
                    centers.map((center) =>
                        <tr>
                            <td><b>{center.center_name}</b><br />{center.address}</td>
                            <td>{center.available_slots_d1} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{center.available_slots_d2}</td>
                
                            <td>{center.date}</td>
                            <td>{center.vaccine}</td>
                            <td>{center.available_slots_d1>0?<Button onClick={()=>registerVaccine(center,1)}>D1</Button>:<Button disabled>D1</Button>} 
                            &nbsp;&nbsp; 
                            {center.available_slots_d2>0?<Button onClick={()=>registerVaccine(center,2)}>D2</Button>:<Button disabled>D2</Button>}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
        </div>
    )
}

export default Centers
