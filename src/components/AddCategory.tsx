import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { addCatActions } from '../Store/category-slice';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
 
type Props = {
    getCategoryData() : void;
  }

interface Category {
    target : {
     name : string;
     value : string;
    } ;
} 

interface category{
  catName:string,
  catBudget:number,
  unit:string,
}

export const AddCategory = (props:Props) => {

    // const [catId,setCatId] = useState(1);
     
    const [categoryValues, setCategory] = useState({
        catName : "",
        catBudget : 0,
        unit : "",
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
  
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   // console.log(catId);

    const handleClose = () => {
        props.getCategoryData();
        resetForm();
   }

   const handlechange = (e:Category) => {
    const { name, value } = e.target;
    setCategory({ ...categoryValues, [name]: value });
   }

  // console.log("outside add category" + catId);

  const todayDate = () => {
    const date = new Date();
    console.log(date);
    const parts = {
      date : date.getDate(),
      month : date.getMonth() + 1 ,
      year : date.getFullYear(),
    }
    const formatDate = parts.year + "-" + parts.month + "-" + parts.date;
    const currentMonth = parts.month;
    const dateDetails = [formatDate,currentMonth];
    return dateDetails;
  }

   const addCategory = (e:React.FormEvent) => {
    e.preventDefault();


    const errors = validate(categoryValues);
    console.log(errors);
    setCategoryErrors(errors);
    console.log(Object.values(categoryErrors));
    setIsSubmit(true);

    if(Object.values(errors).length === 0 ){
      setIsSubmit(true);
      console.log("added expense");
      const myUUID = uuid();   
      const dateDetails = todayDate();
      const currentDate = dateDetails[0];
      const currentMonth = dateDetails[1];
     
      dispatch(addCatActions.addCategory({...categoryValues,myUUID,currentDate,currentMonth}))

      resetForm();
      props.getCategoryData();
      navigate("/");
    }
    else if(Object.values(errors).length !== 0){
      setIsSubmit(false);
      console.log("not added category"); 
    }
  }

      // const uniqid = Date.now() + Math.floor(Math.random() * 1000);  
         

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
           {/* <span>{uniqid}</span> */}
           <h4 className='text-center'>Manage your Category</h4>
           <div className="grid grid-cols-2 gap-4 my-6 px-6">
             <input type="text" name='catName' placeholder="Category Name" className="col-span-2 form-layout" onChange={handlechange} value={categoryValues.catName}/>
             {(categoryErrors.category !== '') && (<div className='col-span-2'><span className = " text-red text-sm ml-1   ">{categoryErrors.category}</span></div>)} 

             <input type="number" name='catBudget' placeholder="Budget" className="form-layout" onChange={handlechange} value={categoryValues.catBudget}/>
             
             <select name="unit" onChange={handlechange} value={categoryValues.unit} id="unit" className=" form-layout">
               <option value="Select unit">Select unit</option>
               <option value="$">$</option> 
               <option value="Rs">Rs</option>     
             </select> 
             {(categoryErrors.amount !== '') && (<div><span className="text-red text-sm ml-1">{categoryErrors.amount}</span></div>)} 
             {(categoryErrors.unit !== '') && (<div><span className="text-red text-sm ml-1">{categoryErrors.unit}</span></div>)}  
             <button className="bg-green text-white col-span-2 p-2 mt-2" onClick={addCategory}>Add Category</button> 
                 
           </div>
           
         </form>   
        
     </>
   );
 
}
