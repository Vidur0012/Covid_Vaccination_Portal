import React, { useState,useEffect } from 'react'
import "./AdminLogin.css";
import { useHistory } from 'react-router-dom'

function AddAdmin() {
    const history = useHistory()

    // for protected page
    useEffect(()=>{
        if(!localStorage.getItem("admin"))
        {
            history.push("/");
        }
    },[])

    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        repassword: ""
    })

    function handlechange(e) {
        const { name, value } = e.target;
        setuser(
            {
                ...user,
                [name]: value
            }
        )
    }

    async function register() {
        const { name, email, password, repassword } = user;

        if (name && email && password) {
            if (password === repassword) {
                var res = await fetch("http://localhost:9700/admin/adminAdd", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
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
                        alert(res.message);
                        history.push('/');
                    }
                    else {
                        alert(res.message);
                    }
                }
            }
            else
            {
                alert("Re-Password didn't matched.");
            }
        }
        else {
            alert("Input fields can't be blank.");
        }
    }
    return (
        <div className="AdminLogin">
            <h1>Add Admin</h1>
            <input type="text" name="name" value={user.name} onChange={handlechange} placeholder="Admin Name" />
            <br />
            <input type="text" name="email" value={user.email} onChange={handlechange} placeholder="Admin Email" />
            <br />
            <input type="password" name="password" value={user.password} onChange={handlechange} placeholder="Admin Password" />
            <br />
            <input type="password" name="repassword" value={user.repassword} onChange={handlechange} placeholder="Re-Password" />
            <br />
            <button type="submit" onClick={register}>Add Admin</button>
        </div>
    )
}
export default AddAdmin;