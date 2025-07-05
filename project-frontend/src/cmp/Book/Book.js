import React, { useState, useEffect } from "react";
import Sucess from './Sucess'
import './StyledFormBook.css'

function Book() {

    const selection = JSON.parse(localStorage.getItem("selection"));
    const center = selection.center;


    const [name, setName] = useState('');
    const [gidnum, setGidnum] = useState();
    const [mobnum, setMobnum] = useState();
    const [age, setAge] = useState();
    const [gen, setGen] = useState();
    const [err, setErr] = useState('')
    const [beneficiarydata, setBeneficiarydata] = useState()

    async function bookslot(e) {
        e.preventDefault();

        if (name && gidnum && mobnum && age)         //post data to backend
        {
            var res;
            if (selection.dose === 1) {
                res = await fetch("http://localhost:9700/beneficiary/d1Beneficiary", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"

                    },
                    body: JSON.stringify({
                        name: name,
                        age: age,
                        gender: gen,
                        verified_id_num: gidnum,
                        mobile_num: mobnum,
                        center_num: center.center_number
                    })
                })

                res = await res.json();
            }
            else {
                res = await fetch("http://localhost:9700/beneficiary/d2Beneficiary", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        age: age,
                        gender: gen,
                        verified_id_num: gidnum,
                        mobile_num: mobnum,
                        center_num: center.center_number
                    })
                })
                res = await res.json();
            }

            if (res.wentWrong) {
                setErr(res.message);
            }
            else {
                if (res.stat) {
                    setBeneficiarydata(res.resp)
                }
                else {
                    setErr(res.message);
                }
            }
        }
        else {
            setErr('Input fields can not be empty.');
        }

    }
    
    function handlegender(e) {
        setGen(e.target.value)
    }
    useEffect(() => {
        setErr('');
    }, [name, mobnum, gidnum])


    return (
        <>
            {!(beneficiarydata)
                ?
                <>

                    <form className="StyledForm" formEncType="multipart/form-data" onSubmit={bookslot}>
                        <div className="pre-detail">
                            <p><b>Your selected vaccine : </b>{center.vaccine}</p>
                            <p> <b>Dose : </b>{selection.dose}</p>
                            <p><b>Center : </b>{center.center_name}</p>
                        </div>
                        <input type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} required /><br />
                        <input type="text" placeholder="Verified ID Number" onChange={(e) => setGidnum(e.target.value)} required /><br />
                        <input type="text" placeholder="Mobile Number" onChange={(e) => setMobnum(e.target.value)} required /><br />
                        <input type="text" placeholder="Age" onChange={(e) => setAge(e.target.value)} required /><br />

                        <div className="insider">
                            <label className="lab" >Gender</label><br />
                            <label htmlFor="gender">Male</label>
                            <input type="radio" className="rad" name="gender" value="M" onChange={handlegender} />
                            <label htmlFor="gender">Female</label>
                            <input className="rad" type="radio" id="html" name="gender" value="F" onChange={handlegender} />
                            <br />
                        </div>
                        <br /><br />
                        <button type="submit">Confirm</button>
                        <p style={{ color: "red" }}><b>{err}</b></p>
                    </form><br /><br />

                </>

                : <Sucess beneficiarydata={beneficiarydata} center={center} />
            }
        </>
    )

}

export default Book;