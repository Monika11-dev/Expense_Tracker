import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from 'react';
import { useDispatch} from 'react-redux';
// import { addCatActions } from '../Store/category-slice';
// import { v4 as uuid } from 'uuid';
// import { useSelector } from 'react-redux';
// import { RootState } from '../Store';
// import { useCallback } from 'react';
// import { useEffect } from 'react';
import { editDataActions } from '../Store/editDataSlice';
import { useNavigate } from 'react-router-dom';
 
// interface T{
//   catName:string,
//   catBudget : number,
//   unit : string,
//   myUUID : string,
//   currentMonth : number,
//   currentDate: string,
// }


type Props = {
    catId : string,
    getCategoryData() : void;
  }

  interface category{
    catName:string,
    catBudget:number,
    unit:string,
  }

interface Category {
    target : {
     name : string;
     value : string;
    } ;
} 

export const EditCategory = (props:Props) => {

    // const [catId,setCatId] = useState(1);
    // const Id = useSelector((state:RootState) => state.editData.myUUID);
 
    
    const [categoryValues, setCategory] = useState({
        catName :  "",
        catBudget :   0,
        unit :  "",
    });

    const resetForm = () => {
      setCategory({
        catName : "",
        catBudget : 0,
        unit : "",
      });
    };

    const categoryError = {     
      
      category:'',
      amount : '',
      unit:'',     
    };
  
    const [categoryErrors, setCategoryErrors] = useState(categoryError);
    const [isSubmit,setIsSubmit] = useState(false);
    console.log(isSubmit);

    // const categories = JSON.parse(localStorage.getItem("categories") as string) || [];
    // const existingCat = categories.find((item:T) => item.myUUID === props.catId) || {};
     
    
   const dispatch = useDispatch();
   const navigate = useNavigate();
   

    const handleClose = () => {
        props.getCategoryData();
        resetForm();
   }

   const handlechange = (e:Category) => {
    const { name, value } = e.target;
    setCategory({ ...categoryValues, [name]: value });
    
   }

   const editCategory = (e:React.FormEvent) => {
    e.preventDefault();  
    const errors = validate(categoryValues);
    
    setCategoryErrors(errors);
  
    setIsSubmit(true);

    if(Object.values(errors).length === 0 ){
      setIsSubmit(true);
      dispatch(editDataActions.editCategory({...categoryValues}))
      resetForm();
      props.getCategoryData();
      navigate("/Budget");

    }
    else if(Object.values(errors).length !== 0){
      setIsSubmit(false);
      
    }
   
     
   }

   const validate = (values:category) => { 

    const errors: any = {};

    if (values.catName === ""){
       errors.category = "Category Name is required!";
       
    }

    if (values.catBudget === 0) {
      errors.amount = "Category Amount is required!";
      
    }
    else if (values.catBudget < 0){ 
      errors.amount = "Category Amount cannot be negative!";
      
    }
    if (values.unit === "") 
      {errors.unit = "unit is required!";
        
      }
    console.log(errors);
    return errors;
  }

    // const add = () => setCatId((catId) => catId + 1 );
    
   return (
     <>  
         <form  className="max-w-xl py-4 px-4 rounded bg-white shadow-lg ">
            <div className='flex justify-end gap-6'>
              <button onClick={handleClose} ><IoIosCloseCircle fontSize={20} fill='green'/></button>    
            </div>
           
           <h4 className='text-center'>Manage your Category</h4>
           <div className="grid grid-cols-2 gap-4 my-6 px-6">
             <input type="text" name='catName' placeholder="Category Name" className=" col-span-2 form-layout" onChange={handlechange} value={categoryValues.catName}/>
             {(categoryErrors.category !== '') && (<div className='col-span-2'><span className = " text-red text-sm ml-1   ">{categoryErrors.category}</span></div>)} 

             <input type="number" name='catBudget' placeholder="Budget" className="form-layout" onChange={handlechange} value={categoryValues.catBudget}/>
             <select name="unit" onChange={handlechange} value={categoryValues.unit} id="unit" className=" form-layout">
               <option value="Select unit">Select unit</option>
               <option value="$">$</option> 
               <option value="Rs">Rs</option>     
             </select>  
             {(categoryErrors.amount !== '') && (<div><span className="text-red text-sm ml-1">{categoryErrors.amount}</span></div>)} 
             {(categoryErrors.unit !== '') && (<div><span className="text-red text-sm ml-1">{categoryErrors.unit}</span></div>)}  

             <button className="bg-green text-white col-span-2 p-2 mt-2" onClick={editCategory}>Save & Update Category</button> 
                 
           </div>
           
         </form>   
        
     </>
   );
 
}
