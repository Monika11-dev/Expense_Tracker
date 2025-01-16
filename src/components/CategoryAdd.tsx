import React from 'react';
import { IoIosAddCircle } from "react-icons/io";

type Props = {
    text : string;
    getCatData() : void;
}

export const CategoryAdd = (props:Props) => {
 // calling getData to display add expense form in parent component

 const handleClick = () => {
     
      props.getCatData();
  
}

return (
  <>
  <button className='flex items-center bg-green text-white px-3 py-1 gap-1 shadow-md' onClick={handleClick} ><span><IoIosAddCircle/></span>{props.text}</button></>
)
}
