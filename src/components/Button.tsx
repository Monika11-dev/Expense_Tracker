import React from 'react';
import { IoIosAddCircle } from "react-icons/io";

type Props = {
    text : string;
    getData() : void;
}

export const Button : React.FC<Props> = (props) => {

  // calling getData to display add expense form in parent component

  const handleClick = () => {
      // e.preventDefault();
      if(props.text === 'Add Expense'){
        props.getData();
      }
  }

  return (
    <>
    <button className='flex items-center bg-green text-white px-3 py-1 gap-1 shadow-md' onClick={handleClick} ><span><IoIosAddCircle/></span>{props.text}</button></>
  )
}
