import React from 'react';
import { SiSimplelogin } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../Store/userAuth-slice';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// const clientId = "822374362615-3e995mvve2lbuf2071orn8n3hir5k8ca.apps.googleusercontent.com";

export const Login = () => {



  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  // navigation access
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);

    if(currentUser){
      navigate("/");
    }
    else {
      navigate("/Login");
    }
   
  }, [navigate]);

  interface Values {
    email : string,
    password:string,  
  }

  interface Login {
    target : {
     name : string;
     value : string;
    } ;
}

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const errors = {     
    email : '',
    password:'',     
  };
  const [loginErrors, setLoginErrors] = useState(errors);
  
   const [isSubmit, setIsSubmit] = useState(false);

   console.log(isSubmit);

  // updating User inputs 

  const handleChange = (e:Login) => {
  
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });

  };

  // handling Login functionality

  const handleLogin = (e:{preventDefault():void}) => {

    e.preventDefault();

    const errors = validate(loginData);
    setLoginErrors(errors);
    setIsSubmit(true);

    if(Object.values(errors).length === 0 ){
      setIsSubmit(true);
      console.log("Login");
      // console.log(isSubmit);
      // alert("yippee");
      dispatch(userActions.loginUser({...loginData}));  

      const user = JSON.parse(localStorage.getItem("currentUser") as string);
    
      // navigation Access  
      if(user){
        navigate("/");
        return;
      }
      else{
        navigate("/Login");
        // windowlocation.reload();
      }
      
    }
    else if(Object.values(errors).length !== 0){
      setIsSubmit(false);
      console.log("not Login");     
    }
    return;

  }

  const validate = (values:Values ) => { 

    const errors: any = {};
    
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

     if(values.email==='') { 
      errors.email = "Email is required!";
     
     } 
     else if(!regexEmail.test(values.email)) { 
      errors.email = "Invalid email format!"; 
     
    } 
    
    if (values.password==='') { 
      errors.password = "Password is required!"; 
     
    } 
    // else if (!regexPassword.test(values.password)) { 
    //   errors.password = "Password must include at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character."; 
    // }
    return errors;
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
                   <input type='email' name="email" value={loginData.email} onChange={handleChange} placeholder='Email'className='form-layout' />
                   {loginErrors && (<div><span className="text-red text-sm ml-1">{loginErrors.email}</span></div>)}
                   <input type='password' name="password" placeholder='Password' value={loginData.password} onChange={handleChange}  className='form-layout' />
                   {loginErrors && (<div><span className="text-red text-sm ml-1">{loginErrors.password}</span></div>)}
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




