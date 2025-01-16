
import React from "react";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../Store/userAuth-slice";
import { useEffect } from "react";


interface UserProfile {
  name: string;
  email: string;
  mobile: number;
  location: string;
  currentUserEmail:string;
  currentUser:string;
}

const ProfileCard: React.FC = () => {
  // Simulated user data (could be retrieved from localStorage or an API)

  const currentUser : string = JSON.parse(localStorage.getItem("currentUser") as string);
  const currentUserEmail : string = JSON.parse(localStorage.getItem("currentUserEmail") as string);
  const Profile = JSON.parse(localStorage.getItem("userProfile") as string) || [];
  

  const user: UserProfile = {
    name: currentUser,
    email: currentUserEmail,
    mobile: 0,
    location: "Location",
    currentUser:currentUser,
    currentUserEmail: currentUserEmail,
  };

  const [userProfile, setUserProfile] = useState(user);
  const dispatch = useDispatch();

  interface Profile {
    target : {
     name : string;
     value : string;
    } ;
}
useEffect(()=> {
  const emailExists = Profile.find(
    (user:UserProfile) => user.currentUserEmail === currentUserEmail
  );
  // alert(emailExists);
  if(emailExists){
    setUserProfile({ ...userProfile,name: emailExists.name , email : emailExists.email, mobile :emailExists.mobile,location : emailExists.location });
  }
},[])
  const handleChange = (e:Profile) => {
  
    const { name, value } = e.target;

    setUserProfile({ ...userProfile, [name]: value });

  };

  const handleUpdate = () => {

    dispatch(userActions.updateProfile({...userProfile,currentUserEmail,currentUser}));  
  
  }

return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <div className="flex items-center mb-4 ">
          {/* <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="w-16 h-16 rounded-full mr-4"
          /> */}
          <span className="w-16 h-16 flex items-center justify-center rounded-full bg-blue mr-4"><FaUser fontSize={38} fill="white"/></span>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{currentUser}</h1>
            <p className="text-sm text-gray-500">{currentUserEmail}</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleUpdate}>
          <div className="flex justify-between items-center">
            <label className="text-darkGrey">Full Name</label>
            <input type="text" name = "name" value={userProfile.name} onChange={handleChange} className="text-textGrey text-right outline-none" />
           </div>
           <div className="flex justify-between items-center">
            <label className="text-darkGrey">Email</label>
            <input type="email" name = "email" value={userProfile.email} onChange={handleChange} className="text-textGrey text-right outline-none bg-white" disabled/>
           </div>
           <div className="flex justify-between items-center">
            <label className="text-darkGrey">Mobile</label>
            <input type="text" name = "mobile" value={userProfile.mobile} onChange={handleChange} className="text-textGrey text-right outline-none" />
           </div>
           <div className="flex justify-between items-center">
            <label className="text-darkGrey">Location</label>
            <input type="text" name = "location" value={userProfile.location} onChange={handleChange} className="text-textGrey text-right outline-none" />
           </div>
           <button className="mt-6 w-full bg-green text-white py-2 px-4 rounded hover:bg-blue transition duration-300 ease-in-out" type="submit">
          Save Changes
        </button>
        </form>    
      </div>
    </div>
  );
};

export default ProfileCard;
