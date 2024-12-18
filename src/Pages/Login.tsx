import React from 'react';
import { SiSimplelogin } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../Store/userAuth-slice';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
// import { useSelector } from 'react-redux';

// const clientId = "822374362615-3e995mvve2lbuf2071orn8n3hir5k8ca.apps.googleusercontent.com";


export const Login : React.FC = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // interface stringObject {
  //   username : string,
  //   email:string,
  //   password:string,
  // }
  // interface userState {
  //   userAuth: {
  //     users: stringObject[],
  //     currentuser:string,

  //   };

  // }

  interface Login {
    target : {
     name : string;
     value : string;
    } ;
}

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // updating User inputs 

  const handleChange = (e:Login) => {
  
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });

  };

  // handling Login functionality

  const handleLogin = () => {

    dispatch(userActions.loginUser({...loginData}));  

    const user = JSON.parse(localStorage.getItem("currentUser") as string);
  
    // navigation Access  
    if(user){
      navigate("/");
      return;
    }
    navigate("/Login");
  
  }
  
  // handling user credentials when Google Login fetches data

  const onSuccess = (credentialResponse:CredentialResponse)=> {

    const credentialResponseDecoded = jwtDecode(credentialResponse.credential as string)
    dispatch(userActions.googleLogin({...credentialResponseDecoded})); 
    navigate("/");

  }

  return (
    <>
       <div className='flex justify-center items-center h-screen'>
        <div className="w-96 shadow-lg">
        
           <div className='p-8'>
                <span className='flex justify-center my-2'><SiSimplelogin fontSize={36} fill='green'/></span>
                <h2 className='text-center mb-4 text-darkBlue'>Welcome to Expense Tracker</h2>
                <form onSubmit={handleLogin} className='flex flex-col justify-center' >
                   <input type='email' name="email" value={loginData.email} onChange={handleChange} placeholder='Username'className='form-layout' required/>
                   <input type='password' name="password" placeholder='Password' value={loginData.password} onChange={handleChange}  className='form-layout' required/>
                   <button type='submit' className='w-full bg-green text-white p-2 mt-4'>Log in</button>
                   <span className='text-center mt-2'>Or</span>
                  
                   {/* <div className='flex justify-center'> */}
                     <h3 className='mt-4 text-center'>Do not have an account ? <br/><Link to='/Signup'><span className='text-blue underline'>Create</span>&nbsp;Account</Link></h3>
                   {/* </div> */}
                   
                </form>
                <div className='mt-2'>
                <GoogleLogin onSuccess= {onSuccess} onError={() => {
                  console.log("Login Failed");
                }}/>
                </div>
           </div>
           

         </div>
     </div>
     
    </>
  )
}




