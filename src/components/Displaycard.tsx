import React from 'react';
import { FaMoneyBillAlt } from "react-icons/fa";

interface props {
  heading : string,
  expense : number,
}

export const Displaycard = (props:props) => {
  return (
    <>
    
    <div className='flex items-center p-2 border border-slateGrey rounded shadow-md'>
        <div className='flex-auto py-4 px-4 bg-blue text-white rounded justify-items-center'><FaMoneyBillAlt fontSize={34}/></div>
        <div className='flex-auto p-2 text-right text-textGrey'>
            <p>{props.heading}</p>
            <span>{props.expense}</span>
        </div>
    </div>
    
    
    </>
    
  )
}
