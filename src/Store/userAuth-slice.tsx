import { createSlice } from "@reduxjs/toolkit";

interface stringObject {
    username : string,
    email:string,
    password:string,
  }

  interface UserProfile {
    name: string;
    email: string;
    mobile: string;
    location: string;
  }

const userAuthSlice = createSlice({
  name: "userAuth",

  // Initial State

  initialState: {
    username: "",
    email:"",
  },

  reducers: {

    // user Registration reducer function
    registerUser(state, action) {
      
      const newUser:stringObject = action.payload;
      // console.log(newUser);

      const existingUsers = JSON.parse(localStorage.getItem("users") as string) || [];
      // console.log(existingUsers);

      const emailExists = existingUsers.find(
        (user:stringObject) => user.email === newUser.email
      );

      if (emailExists) {
        alert("Email already exist");
        return;
      }

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      localStorage.setItem("currentUser",JSON.stringify(newUser.username));
      localStorage.setItem("currentUserEmail",JSON.stringify(newUser.email));
      state.username = newUser.username;
      state.email = newUser.email;
      alert("Account Created !");
      return;
      
    },
    // user login reducer function
    loginUser(state,action){
        const loginUser = action.payload;
        // console.log(loginUser);
        const existingUsers = JSON.parse(localStorage.getItem("users")as string) || [];

        const user = existingUsers.find((user:stringObject)=>user.email === loginUser.email && user.password === loginUser.password);
    
        if(user){
  
            state.username = user.username;
            state.email = user.email;
            localStorage.setItem("currentUser",JSON.stringify(user.username));
            localStorage.setItem("currentUserEmail",JSON.stringify(user.email));
            alert('Redirecting to the home page.');
            
        }
        else {
            alert("Invalid email or password. Please try again");       
        }
    },
    // google login reducer function
    googleLogin(state,action){
        const userData = action.payload;
        const dataToString = JSON.stringify(userData);
        const dataObject = JSON.parse(dataToString);
        localStorage.setItem("currentUser",JSON.stringify(dataObject.name));
        localStorage.setItem("currentUserEmail",JSON.stringify(dataObject.email));
        state.username = dataObject.name;
        state.email = dataObject.email;
    },
    updateProfile(state,action){
      const userProfile = action.payload;
      // alert(userProfile);
      const existingUserProfile = JSON.parse(localStorage.getItem("userProfile") as string) || [];
      const emailExists = existingUserProfile.find(
        (user:stringObject) => user.email === userProfile.email
      );
      if(emailExists){
        const updatedProfile = existingUserProfile.map((item:UserProfile) =>
          item.email === userProfile.email
            ? { ...item, name: userProfile.name , email : userProfile.email, mobile :userProfile.mobile,location : userProfile.location }
            : item
        );
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
          return;
      }
      existingUserProfile.push(userProfile);
      localStorage.setItem("userProfile", JSON.stringify(existingUserProfile));

      

    
    }
  },
});

export const userActions = userAuthSlice.actions;
export default userAuthSlice;
