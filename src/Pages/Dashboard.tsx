import React from 'react'
import { Displaycard } from '../components/Displaycard';
import { SubHead } from '../components/SubHead';
import { Categorycard } from '../components/Categorycard';
import { Footer } from '../components/shared/Footer';
import { Button } from '../components/Button';
import { SearchCategory } from '../components/SearchCategory';
import { Datedetails } from '../components/Datedetails';
import { Popup } from '../components/Popup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard : React.FC = () => {

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


  // show add expense form

  const getData = ()  => {
      document.getElementById('formPopup')!.classList.remove('hidden');
      
  };

  // close add expense form

  const getShowData = () => {
      document.getElementById('formPopup')!.classList.add('hidden');
  }

  return (
    <div className='container mx-auto'>
      
      <div className='flex justify-end mb-2 px-4'>
         
         <SearchCategory/>
      </div>
     
      <h1 className='text-3xl font-normal text-darkGrey p-4 my-2'>Welcome to Advance Budget & Expense Tracker System</h1>
       
      <div className='flex justify-end mt-4 mb-8 px-4 gap-6'>
      <div className='flex gap-2 items-center'>
        <Datedetails text='From'/>
        <Datedetails text='To'/>
        </div>
        <Button text="Add Expense" getData = {getData}/>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4 mb-2">
        <Displaycard/>
        <Displaycard/>
        <Displaycard/>
      </div>

    
      <SubHead heading="Current Budget in each Categories" />
      
      <div className='flex justify-end my-2 px-4 gap-6'>
        
        <Button text="Add Category" getData = {getData}/>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8 mb-2 mx-4">
       <Categorycard/>
       <Categorycard/>
       <Categorycard/>
       <Categorycard/>
       <Categorycard/>
      </div>

      <div id='formPopup' className='mt-2 mb-8 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden'>
      <Popup getShowData = {getShowData}/>
      </div>
      

      <Footer/>

    </div>
  )
}
