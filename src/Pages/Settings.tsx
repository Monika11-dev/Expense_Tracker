import React from 'react';
import { Mainheading } from '../components/Mainheading';
import ProfileCard from '../components/ProfileCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const Settings = () => {
  
  const navigate = useNavigate();

  // navigation access
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);

    if(currentUser){
      navigate("/Settings");
    }
    else {
      navigate("/Login");
    }
   
  }, [navigate]);

    return (
        <>
        <div className='container mx-auto px-4'>
          <Mainheading mainheading="Account Profile"/>
          
          <div className=''>
          <ProfileCard/>
    
          </div>
        </div>
        
        </>
      )
}
