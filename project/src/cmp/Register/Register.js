import React,{useState} from 'react'
import "./Register.css"
import axios from "axios"
import {useHistory} from 'react-router-dom'

function Register()
{
    const history=useHistory()

    const [user,setuser]=useState({
        name:"",
        email:"",
        password:"",
        repassword:""
    })

function handlechange(e)
{
    const {name,value}=e.target;
    setuser(
        {
        ...user,
        [name]:value
        }
    )
}
function register()
{
    const {name,email,password,repassword}=user
    if(name && email && password && (password === repassword))
    {
        axios.post("http://localhost:9700/Register",user).then(res=>
        {
            alert(res.data.message)
            history.push('/Login')
        })
    }
    else
    {
        alert("oops! somthing went wrong")
    }
    
}
    return (
        <div className="Register">
            
                <h1>Register</h1>
                <input type="text" name="name" value={user.name} onChange={handlechange} placeholder="Your Name" />
                <br/>
                <input type="text" name="email" value={user.email} onChange={handlechange} placeholder="Your Email"/>
                <br/>
                <input type="password" name="password" value={user.password} onChange={handlechange} placeholder="Your Password"/>
                <br/>
                <input type="password" name="repassword" value={user.repassword} onChange={handlechange} placeholder="Re-Password"/>
                <br/>
                <button type="submit" onClick={register}>Register</button>
                <div>or</div>
                <button type="submit" onClick={()=>history.push("/Login")}>Login</button>
        </div>
    )
}
export default Register