import React from 'react';
import { Mainheading } from '../components/Mainheading';
import { Datatable } from '../components/Datatable';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Budget = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);

    if(currentUser){
      navigate("/Budget");
    }
    else {
      navigate("/Login");
    }
   
  }, [navigate]);
  return (
    <>
    <div className='container mx-auto px-4'>
      <Mainheading mainheading="Manage Your Budget in few steps"/>
      
      <div className=''>
      <Datatable/>

      </div>
    </div>
    
    </>
  )
}
