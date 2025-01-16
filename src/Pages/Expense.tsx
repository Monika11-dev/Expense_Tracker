import React from 'react';
// import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mainheading } from '../components/Mainheading';
import { ExpenseDataTable } from '../components/ExpenseDataTable';

export const Expense = () => {

  const navigate = useNavigate();

  // navigation access
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);

    if(currentUser){
      navigate("/Expense");
    }
    else {
      navigate("/Login");
    }
   
  }, [navigate]);


  return (
    <div className='container mx-auto px-4'>
      <Mainheading mainheading="Manage Your Expense in few steps"/>
      
      <div className=''>
      {/* <Datatable/> */}
      <ExpenseDataTable/>

      </div>
    </div>
    
  )
}
