import React from "react";
import formImage from "../Assets/sign-up-2314914_1280.webp";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../Store/userAuth-slice";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  // updating formvalues when user inputs
  
  const handleChange = (e:Register) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log("values set");
  };

  // handling form submission

  const handleSubmit = () => {
       dispatch(userActions.registerUser({...formValues} as stringObject));
       const user = JSON.parse(localStorage.getItem("currentUser") as string);
       console.log(user);
       if(user){
         navigate("/");
         return;
       }
       navigate("/Signup");
  }

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
                  required
                  value={formValues.username}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-layout"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                />
               
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formValues.password}
                  className="form-layout"
                  onChange={handleChange}
                  required
                />
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
