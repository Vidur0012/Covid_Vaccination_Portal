import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './StyledTable.css'


function ListBeneficiariesD2() {
    // for protected page
    const history = useHistory()
    useEffect(() => {
        if (!localStorage.getItem("centerLoggedin")) {
            history.push("/");
        }
    }, [])

    const [dataD2, setDataD2] = useState([]);
    async function getDataD2() {

        const todaydate = JSON.parse(localStorage.getItem("todaydate")).todaydate;
        const center_num = JSON.parse(localStorage.getItem("centerLoggedin")).center_number;

        var res = await fetch("http://localhost:9700/beneficiary/getBeneficiaries", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                center_num: center_num,
                cur_date: todaydate,
                dose_num: 2
            })
        })

        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
        }
        else {
            //if empty Beneficiarires array are there in res
            if (res.stat) {
                setDataD2(res.beneficiaries);
            }
            else {
                alert(res.message);
            }
        }
    }
    useEffect(() => {
        getDataD2();
    }, [])

    async function markDoneD2(id) {
        var res = await fetch("http://localhost:9700/beneficiary/updateBeneficiary", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                b_id: id,
                status_d2: true,
            })
        })
        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
        }
        else {
            if (res.stat) {
                getDataD2();
            }
            else {
                alert(res.message);
            }
        }
    }
    async function deleteD2(id) {
        var res = await fetch("http://localhost:9700/beneficiary/updateBeneficiary", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                b_id: id,
                center_num_d2: '',
                date_d2: ''
            })
        })
        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
        }
        else {
            if (res.stat) {
                getDataD2();
            }
            else {
                alert(res.message);
            }
        }
    }

    return (
        <div className="StyledTable">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Verified ID Number</th>
                        <th>Mobile Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataD2.map((b) =>
                            <tr>
                                <td><b>{b.turn_num}</b></td>
                                <td>{b.name}</td>
                                <td><b>{b.verified_id_num}</b></td>
                                <td>{b.mobile_num}</td>
                                {b.status_d2 ?
                                    <td>
                                        <Button variant="success" disabled>Done</Button> &nbsp;&nbsp;
                                        <Button variant="danger">Remove</Button>
                                    </td>
                                    :
                                    <td>
                                        <Button variant="success" onClick={() => markDoneD2(b._id)}>Done</Button>
                                        &nbsp;&nbsp; <Button variant="danger" onClick={() => deleteD2(b._id)}>Remove</Button>
                                    </td>
                                }
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>

    )
}
export default ListBeneficiariesD2;