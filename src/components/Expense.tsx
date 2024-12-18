import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Expense : React.FC = () => {

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
    <div>
      <h2> Expense <Link to="/" className="underline">Go to Dashboard</Link></h2>
      
    </div>
    
  )
}
