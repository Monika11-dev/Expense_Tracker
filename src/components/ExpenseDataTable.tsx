import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { EditExpense } from "./EditExpense";
import { CategoryEdit } from "./CategoryEdit";
import { useState } from "react";
import { editDataActions } from "../Store/editDataSlice";


export const ExpenseDataTable = () => {

  interface T {
    catId:string,
    category:string,
    currentDate:string,
    expenseAmount : string,
    unit : string,
    expenseDesc : string,
    currentMonth : number,
    expenseName:string,
    
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();

const [catId, setcatId] = useState("");

  const expenses = JSON.parse(localStorage.getItem("expense") as string) || [];
  
  let sno : number = 1;

  const deleteData = (key:string) =>{
     
  dispatch(editDataActions.deleteExpense(key));
  navigate("/Expense");
  }


  const getEditData = (catId:string) => {
    
    setcatId(catId); 
    dispatch(editDataActions.showCatData(catId));
    navigate("/Expense");
       
  }

  const getCategoryData = () => {
    document.getElementById('categoryPopup')!.classList.add('hidden');
}

  return (
    <div className="">
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-grey">
        <thead className="text-xs text-textGrey uppercase bg-skyblue">
            <tr>
                <th scope="col" className="px-6 py-4">
                    S.No
                </th>
                <th scope="col" className="px-6 py-4">
                    Date Created
                </th>
                <th scope="col" className="px-6 py-4">
                    Category
                </th>
                <th scope="col" className="px-6 py-4">
                    Expense
                </th>
                <th scope="col" className="px-6 py-4">
                    Amount
                </th>
                <th scope="col" className="px-6 py-4">
                    Description
                </th>
                <th scope="col" className="px-6 py-4">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {expenses.map((item : T) => (
              <tr key={item.catId} className="odd:bg-white even:bg-skyblue">
              <th scope="row" className="w-4 px-6 py-4 font-medium text-textGrey whitespace-nowrap">
                  {sno++}
              </th>
              <td className="  px-6 py-4">
                  {item.currentDate}
              </td>
              <td className="  px-6 py-4">
                  {item.category}
              </td>
              <td className=" px-6 py-4">
                  {item.expenseName}
              </td>
              <td className=" px-6 py-4">
                  {item.expenseAmount}
              </td>
              <td className=" px-6 py-4">
                  {item.expenseDesc}
              </td>
              <td className=" px-6 py-4 flex">
              <div className='flex justify-end my-2 px-4 gap-6'>
      
         <CategoryEdit text="Edit" catId={item.expenseName} getEditData = {getEditData} />
      </div>
                  {/* <button onClick={()=> editData(`${item.myUUID}`)} className="font-medium text-green  hover:underline mr-2">Edit</button> */}
                  <button onClick={()=> deleteData(`${item.expenseName}`)} ><span><MdDelete fontSize={22} fill='red'/></span></button>
                  
              </td>
          </tr>        
            )
            )}         

        </tbody>
    </table>
    
</div>
<div id='categoryPopup' className='mt-2 mb-8 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden'>
      <EditExpense catId={catId} getCategoryData = {getCategoryData} />
</div>
</div>
  );
};
