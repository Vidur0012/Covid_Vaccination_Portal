import React, { useState } from 'react'
import "./AdminLogin.css"
import { useHistory } from 'react-router-dom'

function AdminLogin({ setAdm }) {
    const history = useHistory()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    function handlechange(e) {
        const { name, value } = e.target;

        setUser(
            {
                ...user,
                [name]: value
            }
        )
    }

    async function login() {

        const { email, password } = user;
        if (email && password) {
            var res = await fetch("http://localhost:9700/admin/adminLogin", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            res = await res.json();

            if (res.wentWrong) {
                alert(res.message);
            }
            else {
                if (res.stat) {
                    localStorage.setItem("admin", JSON.stringify(res.admin));
                    alert(res.message);
                    setAdm(res.admin);
                    history.push('/');
                }
                else {
                    alert(res.message);
                }
            }
        }
        else
        {
            alert("Input fields can't be blank.");
        }

    }

    return (
        <div className="AdminLogin">

            <h1>Admin Login</h1>
            <input type="text" placeholder="Enter Your Email" name="email" value={user.email} onChange={handlechange} />
            <br />
            <input type="password" placeholder="Enter Your Password" name="password" value={user.password} onChange={handlechange} />
            <br />
            <button type="submit" onClick={login}>Admin Login</button>
        </div>
    )
}

export default AdminLogin;
