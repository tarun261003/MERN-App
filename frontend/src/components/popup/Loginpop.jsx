import React, { useState } from 'react'
import './Loginpop.css'
import { assets } from '../../assets/assets'

const Loginpop = () => {

    const [current,setCurrent] = useState("Sign up");

    const [formdata,setFormdata] = useState({
        username:"",
        password:"",
        email:""
    })

    

    const login = async () =>{
        console.log("Login lol",formdata);
        let responseData;
        await fetch('https://foodone-seven.vercel.app/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formdata),
        }).then((response)=>response.json()).then((data)=>responseData=data);

        if(responseData.success){
            localStorage.setItem('token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.error);
        }
    }
    

        


    const signup = async () =>{
        console.log("Signup",formdata);
        let responseData;
        await fetch('https://foodone-seven.vercel.app/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formdata),
        }).then((response)=>response.json()).then((data)=>responseData=data);

        if(responseData.success){
            localStorage.setItem('token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.error);
        }
    }
    

        


    const changehandle = (e)=>{
        setFormdata({...formdata,[e.target.name]:e.target.value})
    }
    

  return (
   
    <div className='Login'>
        <form className="loginpopup">
            <div className="title">
                <h2>{current}</h2>
                <img src={assets.cross_icon} alt="" />
            </div>
            <div className="logininputs">
                {current==='Login'?<></>:<input type='text'name='username' value={formdata.username} onChange={changehandle} placeholder='Your name' required/>}
                <input type='email' name='email' value={formdata.email} onChange={changehandle} placeholder='Your mail id' required/>
                <input type='password' name='password' value={formdata.password} onChange={changehandle} placeholder='Password' required/>
            </div>
            <button type='button' onClick={async ()=>{current==="Login"?login():signup()} }>{current==="Sign up"?"Create account":"Login"}</button>
            
            {current==="Login"?
            <p>Create a new account <span onClick={()=>setCurrent("Sign up")} >Click here</span></p>
            :
            <p>Already have an account?<span onClick={()=>setCurrent("Login")} >Login here</span></p>
            }
        </form>
    </div>
  )
}

export default Loginpop