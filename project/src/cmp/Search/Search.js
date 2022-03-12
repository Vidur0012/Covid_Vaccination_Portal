import React from "react";
import { useState, useEffect } from 'react';
import Centers from './Centers'
import './StyledForm1.css'

function Search() {
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [err, setErr] = useState('');
    const [centers, setCenters] = useState([]);

    async function searchCenters(e) {
        e.preventDefault();
        if (district && state) {

            var res = await fetch("http://localhost:9700/centers/getCenters", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    dist: district,
                    state: state
                })
            })

            res = await res.json();


            if (res.wentWrong) {
                setErr(res.message);
            }
            else {
                //if empty centers array are there in res
                if (res.stat === false) {
                    setErr('No Centers available for given input.');
                }
                else {
                    setCenters(res.centers);
                }
            }

        }
        else {
            setErr('Input fields can not be empty.');
        }
    }


    useEffect(() => {

        setErr('');
        setCenters([]);

    }, [state, district])


    return (
        <>
            <form className="StyledForm1" onSubmit={searchCenters} formEncType="multipart/form-data">
                <div className="StyledForm1__inner">
                    <input type="text" id="statenm" name="statenm" placeholder="State Name" onChange={(e) => setState(e.target.value)} required />
                    <input type="text" id="distnm" name="distnm" placeholder="District Name" onChange={(e) => setDistrict(e.target.value)} required />
                </div>
                <button type="submit">Search</button>
                <p style={{ color: "red" }}><b>{err}</b></p>

            </form>
            <p></p>
            {
                centers.length != 0
                    ? <Centers centers={centers} />
                    : null
            }
        </>
    )
}

export default Search;