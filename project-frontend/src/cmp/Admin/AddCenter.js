import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import './AddCenter.css';



function AddCenter() {
    const history = useHistory()

    // for protected page
    useEffect(() => {
        if (!localStorage.getItem("admin")) {
            history.push("/");
        }
    }, [])


    const [cent, setCent] = useState({
        center_name: "",
        center_number: "",
        total_slots_d1: "",
        total_slots_d2: "",
        available_slots_d1: "",
        available_slots_d2: "",
        date: "",
        state: "",
        district: "",
        vaccine: "",
        vaccinator_name: "",
        center_pass: "",
        from: "",
        to: "",
        pincode: "",
        address: ""
    })

    function handlechange(e) {
        const { name, value } = e.target;
        setCent(
            {
                ...cent,
                [name]: value
            }
        )
    }
    async function add() {
        const { center_name, center_number, total_slots_d1, total_slots_d2, available_slots_d1, available_slots_d2, date, state, district, vaccine, vaccinator_name, center_pass, from, to, pincode, address } = cent;
        if (center_name && center_number && total_slots_d1 !== '' && total_slots_d2 !== '' && available_slots_d1 !== '' && available_slots_d2 !== '' && date && state && district && vaccine && vaccinator_name && center_pass && from && to && pincode !== '' && address) {
            var res = await fetch("http://localhost:9700/centers/addCenter", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cent)
            })

            res = await res.json();

            if (res.wentWrong) {
                alert(res.message);
            }
            else {
                //
                if (res.stat) {
                    alert(res.message);
                    history.push("/adminListCen");
                }
                else {
                    alert(res.message);
                }
            }

        }
        else {
            alert("Input fields can't be blank.");
        }
    }
    return (
        <div className="AddCenter">

            <h1>Add Center</h1>
            <input type="text" placeholder="Center Name: " name="center_name" value={cent.center_name} onChange={handlechange} />
            
            <input type="text" placeholder="Center Number" name="center_number" value={cent.center_number} onChange={handlechange} />
            
            <input type="text" placeholder="Total Slots Dose-1" name="total_slots_d1" value={cent.total_slots_d1} onChange={handlechange} />
            
            <input type="text" placeholder="Total Slots Dose-2" name="total_slots_d2" value={cent.total_slots_d2} onChange={handlechange} />
            
            <input type="text" placeholder="Available Slots Dose-1" name="available_slots_d1" value={cent.available_slots_d1} onChange={handlechange} />
            
            <input type="text" placeholder="Available Slots Dose-1" name="available_slots_d2" value={cent.available_slots_d2} onChange={handlechange} />
            
            <input type="text" placeholder="Date (dd-mm-yyyy)" name="date" value={cent.date} onChange={handlechange} />
            
            <input type="text" placeholder="State" name="state" value={cent.state} onChange={handlechange} />
            
            <input type="text" placeholder="District" name="district" value={cent.district} onChange={handlechange} />
            
            <input type="text" placeholder="Vaccine" name="vaccine" value={cent.vaccine} onChange={handlechange} />
            
            <input type="text" placeholder="Vaccinator Name" name="vaccinator_name" value={cent.vaccinator_name} onChange={handlechange} />
            
            <input type="text" placeholder="Center Password" name="center_pass" value={cent.center_pass} onChange={handlechange} />
            
            <input type="text" placeholder="From (time hh:mm:ss)" name="from" value={cent.from} onChange={handlechange} />
            
            <input type="text" placeholder="To (time hh:mm:ss)" name="to" value={cent.to} onChange={handlechange} />
            
            <input type="text" placeholder="Pincode" name="pincode" value={cent.pincode} onChange={handlechange} />
            
            <input type="text" placeholder="Address" name="address" value={cent.address} onChange={handlechange} />
            <br />


            <button type="submit" onClick={add}>Add Center</button>

        </div>
    )
}

export default AddCenter;