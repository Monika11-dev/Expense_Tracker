import React from 'react';

import { IoIosInformationCircle } from "react-icons/io";
interface Props {
  name:string,
  budget:number,
}
export const Categorycard = (props:Props) => {
  return (
    <>
    
    <div className='flex p-3 border rounded border-l-4 border-s-darkSeaGreen justify-between mb-5 shadow-md'>
        <div className='p-2 justify-items-center text-lg text-darkGrey'><span>{props.name}</span></div>
        <div className='flex flex-col p-2 text-right text-textGrey'>
            <span className='mb-0.5'><IoIosInformationCircle fill="skyBlue"/></span>
            <span className='mb-0.5 text-sm'>{props.budget}</span>
        </div>
    </div>
    
    
    </>
  )
}
