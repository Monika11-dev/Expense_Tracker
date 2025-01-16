import React from "react";
import formImage from "../Assets/sign-up-2314914_1280.webp";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../Store/userAuth-slice";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import { useEffect } from "react";
export const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // navigation access
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);

    if(currentUser){
      navigate("/");
    }
    else {
      navigate("/Signup");
    }
   
  }, [navigate]);

  interface Register {
       target : {
        name : string;
        value : string;
       } ;
  }
  
  interface stringObject {
    username : string,
    email:string,
    password:string,
  }
  const errors = {     
    username : '',
    email : '',
    password:'',     
  };
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registerErrors, setRegisterErrors] = useState(errors);
  console.log(registerErrors.username);
  
  const [isSubmit,setIsSubmit] = useState(false);
  
  const handleChange = (e:Register) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
   
  };

  // handling form submission

  const handleSubmit = (e:{preventDefault():void}) => {

       e.preventDefault();

       const errors = validate(formValues);

       setRegisterErrors(errors);

       setIsSubmit(true);

        if(Object.values(errors).length === 0 ){

          setIsSubmit(true);
       // alert("yippee");
       dispatch(userActions.registerUser({...formValues} as stringObject));
       const user = JSON.parse(localStorage.getItem("currentUser") as string);
       console.log(user);
       if(user){
         navigate("/");
         return;
       } 
        navigate("/Signup");
        
       }
       else if(Object.values(errors).length !== 0){
        setIsSubmit(false);
            
      }
  }

  // useEffect(()=>{
  //   alert(registerErrors.username);
  // },[registerErrors]);

  

  const validate = (values:stringObject) => {
    
    const errors: any = {};

    const regexUsername = /^[A-Za-z\s]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    if (values.username==='') {
      errors.username = "Username is required!";
     
    }
    else if (!regexUsername.test(values.username)) {
      errors.username = "Username can only contain letters and spaces.";
      
    }
    if (values.email==='') {
      errors.email = "Email is required!";
     
    }
    else if (!regexEmail.test(values.email)) {
      errors.email = "Invalid email format.";
     
    }
    if (values.password==='') {
      errors.password = "Password is required!";
      
    }
    else if (!regexPassword.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.";
       
      }
    return errors;
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-2xl shadow-lg">
          <div className="grid grid-cols-2 items-center">
            <div className="p-8">
              <span className="flex justify-center my-2">
                <FaUserCircle fontSize={36} fill="green" />
              </span>
              <h2 className="text-center mb-4 text-darkBlue">Create Account</h2>
              <form  onSubmit = {handleSubmit} className=" flex flex-col justify-center">
                <input
                  type="text"
                  name="username"
                  placeholder="Name"
                  className="form-layout"
                  
                  value={formValues.username}
                  onChange={handleChange}
                />
                {registerErrors && (<div><span className="text-red text-sm ml-1">{registerErrors.username}</span></div>)}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-layout"
                  value={formValues.email}
                  onChange={handleChange}
                  
                />
                {registerErrors && (<div><span className="text-red text-sm ml-1">{registerErrors.email}</span></div>)}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formValues.password}
                  className="form-layout"
                  onChange={handleChange}
                  
                />
                 {registerErrors && (<div className="text-red text-sm ml-1"><span>{registerErrors.password}</span></div>)}
                <button
                  type="submit"
                  className="w-full bg-red text-white p-2 mt-4"
                >
                  Sign up
                </button>
                {/* <div className='flex justify-center'> */}
                <h3 className="mt-4 text-center">
                  Already Have an account ? <br />
                  <Link to="/Login">
                    Please <span className="text-blue underline">Login</span>
                    &nbsp; here !
                  </Link>
                </h3>
                {/* </div> */}
              </form>
            </div>
            <div className="bg-green flex items-center ">
              <img src={formImage} alt="Signup Form" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
