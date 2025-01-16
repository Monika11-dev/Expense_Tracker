import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { EditCategory } from "./EditCategory";
import { CategoryEdit } from "./CategoryEdit";
import { useState } from "react";
import { editDataActions } from "../Store/editDataSlice";

export const Datatable = () => {

  interface T {
    catName:string,
    catBudget : number,
    unit : string,
    myUUID : string,
    currentMonth : number,
    currentDate: string,
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [catId, setcatId] = useState("");

  const categories = JSON.parse(localStorage.getItem("categories") as string) || [];
  
  let sno : number = 1;

  const deleteData = (key:string) =>{
     
  dispatch(editDataActions.deleteCategory(key));
  navigate("/Budget");
  }


  const getEditData = (catId:string) => {
    
    setcatId(catId); 
    dispatch(editDataActions.showCatData(catId));
    navigate("/Budget");
       
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
                    Amount
                </th>
                <th scope="col" className="px-6 py-4">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {categories.map((item : T) => (
              <tr key={item.myUUID} className="odd:bg-white even:bg-skyblue">
              <th scope="row" className="w-4 px-6 py-4 font-medium text-textGrey whitespace-nowrap">
                  {sno++}
              </th>
              <td className="  px-6 py-4">
                  {item.currentDate}
              </td>
              <td className="  px-6 py-4">
                  {item.catName}
              </td>
              <td className=" px-6 py-4">
                  {item.catBudget}
              </td>
              <td className="w-4 px-6 py-4 flex">
              <div className='flex justify-end my-2 px-4 gap-6'>
      
         <CategoryEdit text="Edit" catId={item.myUUID} getEditData = {getEditData} />
      </div>
                  {/* <button onClick={()=> editData(`${item.myUUID}`)} className="font-medium text-green  hover:underline mr-2">Edit</button> */}
                  <button onClick={()=> deleteData(`${item.myUUID}`)}><span><MdDelete fontSize={22} fill='red'/></span></button>
                  
              </td>
          </tr>
          
            )
            )}
            

        </tbody>
    </table>
    
</div>
<div id='categoryPopup' className='mt-2 mb-8 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden'>
      <EditCategory catId={catId} getCategoryData = {getCategoryData} />
      </div>
</div>
  );
};
