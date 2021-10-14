import React,{useState} from 'react'
import "./Login.css"
import axios from 'axios';
import {useHistory} from 'react-router-dom'
function Login({setloginuser})
{
    const history=useHistory()

    const [user,setuser]=useState({
        email:"",
        password:""
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

   function login()
   {
    const {email,password}=user
    if(email && password)
    {
        axios.post("http://localhost:9700/Login",user).then(res => {
             alert(res.data.message)
             setloginuser(res.data.user)
             history.push('/')
            })
    }
    
   }

    return (
        <div className="Login">
            
                <h1>Login</h1>
                <input type="text" placeholder="Enter Your Email" name="email" value={user.email} onChange={handlechange}/>
                <br/>
                <input type="password" placeholder="Enter Your Password" name="password" value={user.password} onChange={handlechange}/>
                <br/>
                <button type="submit" onClick={login}>Login</button>
                <div>or</div>
                <button type="submit" onClick={()=>history.push("/Register")}>Register</button>
        </div>
    )
}
export default Login