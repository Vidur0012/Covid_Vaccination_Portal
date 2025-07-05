import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './StyledTable.css'


function ListBeneficiariesD1() {
    // for protected page
    const history = useHistory()
    useEffect(() => {
        if (!localStorage.getItem("centerLoggedin")) {
            history.push("/");
        }
    }, [])

    const [dataD1, setDataD1] = useState([]);
    async function getDataD1() {

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
                dose_num: 1
            })
        })

        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
        }
        else {
            //if empty Beneficiarires array are there in res
            if (res.stat) {
                setDataD1(res.beneficiaries);
            }
            else {
                alert(res.message);
            }
        }
    }
    useEffect(() => {
        getDataD1();
    }, [])

    async function markDoneD1(id) {
        const vac = JSON.parse(localStorage.getItem("centerLoggedin")).vaccine;
        var res = await fetch("http://localhost:9700/beneficiary/updateBeneficiary", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                b_id: id,
                status_d1: true,
                vaccine: vac
            })
        })
        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
        }
        else {
            if (res.stat) {
                getDataD1();
            }
            else {
                alert(res.message);
            }
        }
    }
    async function deleteD1(id) {
        var res = await fetch("http://localhost:9700/beneficiary/updateBeneficiary", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                b_id: id,
                center_num_d1: '',
                date_d1: ''
            })
        })
        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
        }
        else {
            if (res.stat) {
                getDataD1();
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
                        dataD1.map((b) =>
                            <tr>
                                <td><b>{b.turn_num}</b></td>
                                <td>{b.name}</td>
                                <td><b>{b.verified_id_num}</b></td>
                                <td>{b.mobile_num}</td>
                                {b.status_d1 ?
                                    <td>
                                        <Button variant="success" disabled>Done</Button> &nbsp;&nbsp;
                                        <Button variant="danger">Remove</Button>
                                    </td>
                                    :
                                    <td>
                                        <Button variant="success" onClick={() => markDoneD1(b._id)}>Done</Button>
                                        &nbsp;&nbsp; <Button variant="danger" onClick={() => deleteD1(b._id)}>Remove</Button>
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
export default ListBeneficiariesD1