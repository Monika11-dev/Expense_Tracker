import React from "react";
import { IoIosCloseCircle } from "react-icons/io";


type Props = {
  getShowData() : void;
}

export const Popup: React.FC<Props> = (props) => {

  // calling getShowData for closing of add expense form in parent component
  
  const handleClose = () => {
       props.getShowData();
  }

  return (
    <>  
        <form className="max-w-xl py-4 px-4 rounded bg-white shadow-lg ">
          <div className='flex justify-end gap-6'>
            <button onClick={handleClose} ><IoIosCloseCircle fontSize={20} fill='green'/></button>    
          </div>
          <div className="grid grid-cols-2 gap-4 py-12 px-10">
            <input type="text" placeholder="Expense Name" className=" form-layout"/>
            <select name="category" id="category" className=" form-layout">
              <option value="Select">Select Category</option>
              <option value="category 1">Category 1</option>      
            </select>
            <textarea
              className="col-span-2 form-layout"
              placeholder="Description"
            ></textarea>
            <input type="number" placeholder="Amount spend" className="form-layout"></input>
            <select name="unit" id="unit" className=" form-layout">
              <option value="Unit">unit</option>
              <option value="dollar">$</option>      
            </select>
            <button className="bg-green text-white col-span-2 p-2 mt-2">Add Expense</button>
          </div>
        </form>    
    </>
  );
};
