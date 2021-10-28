import React, { useState } from 'react'
import "./CenterLogin.css"
import { useHistory } from 'react-router-dom'

function CenterLogin({ setCnt }) {
    const history = useHistory()

    const [cent, setCent] = useState({
        num: "",
        password: ""
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

    //getting today's date in dd-mm-yyyy format
    function getTodayDate() {
        const dt = new Date();
        const year = dt.getFullYear();
        const mon = dt.getMonth() + 1;
        const day = dt.getDate();

        var strday = day.toString();
        var strmon = mon.toString();
        var stryear = year.toString();

        if (day < 10) {
            strday = "0" + strday;
        }
        if (mon < 10) {
            strmon = "0" + strmon;
        }

        const finaldt = strday + "-" + strmon + "-" + stryear;
        return finaldt;
    }

    async function login() {

        const { num, password } = cent;
        if (num && password) {
            var res = await fetch("http://localhost:9700/centers/centerLogin", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    center_num: num,
                    center_pass: password
                })
            })

            res = await res.json();

            if (res.wentWrong) {
                alert(res.message);
            }
            else {
                if (res.stat) {
                    localStorage.setItem("centerLoggedin", JSON.stringify(res.center));
                    const todaydate = getTodayDate();
                    localStorage.setItem("todaydate",JSON.stringify({todaydate:todaydate}))
                    setCnt(res.center);
                    alert(res.message);
                    history.push('/');
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
        <div className="CenterLogin">

            <h1>Center Login</h1>
            <input type="text" placeholder="Enter Center Number" name="num" value={cent.num} onChange={handlechange} />
            <br />
            <input type="password" placeholder="Enter Center Password" name="password" value={cent.password} onChange={handlechange} />
            <br />
            <button type="submit" onClick={login}>Center Login</button>
        </div>
    )
}

export default CenterLogin;
