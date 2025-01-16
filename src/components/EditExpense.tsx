import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { addCatActions } from '../Store/category-slice';
// import { v4 as uuid } from 'uuid';
// import { useSelector } from 'react-redux';
// import { RootState } from '../Store';
// import { useCallback } from 'react';
// import { useEffect } from 'react';
import { editDataActions } from '../Store/editDataSlice';
 
// interface Exp {
//   expenseName : string,
//   category :string,
//   expenseDesc : string,
//   expenseAmount :number,
//   unit :string,
//   catId :string;
//   currentDate:string;
// currentMonth : number,
// }
 
interface T {
    catName:string,
    catBudget : number,
    unit : string,
    myUUID : string,
    currentMonth : number,
    currentDate: string,
  }

  interface expenseValues {
    expenseName : string,
      category : string,
      expenseDesc : string,
      expenseAmount : number,
      unit :string,
  }

type Props = {
    catId : string,
    getCategoryData() : void;
  }

interface Category {
    target : {
     name : string;
     value : string;
    } ;
} 

export const EditExpense = (props:Props) => {

    // const [catId,setCatId] = useState(1);
    // const Id = useSelector((state:RootState) => state.editData.myUUID);
 
    const categories = JSON.parse(localStorage.getItem("categories") as string) || [];
    const [expenseValues, setExpense] = useState({
        expenseName : "",
        category : "",
        expenseDesc : "",
        expenseAmount : 0,
        unit :"",
        });

        const resetForm = () => {
          setExpense({
            expenseName: "",
            category: "",
            expenseDesc: "",
            expenseAmount: 0,
            unit: "",
          });
        };

        const expenseError = {     
          expense : '',
          category:'',
          desc : '',
          amount : '',
          unit:'',     
        };

  const [expenseErrors, setExpenseErrors] = useState(expenseError);
  const [isSubmit,setIsSubmit] = useState(false);
  console.log(isSubmit);
    
    console.log("sent" + props.catId);
    
    // const expense = JSON.parse(localStorage.getItem("expense") as string) || [];
    // const existingExp = expense.find((item:Exp) => item.catId === props.catId) || {};
     
    // console.log(existingCat);

    // setCategory((prev)=>{
    //        return{...prev, catName :  existingCat.catName, catBudget :  existingCat.catBudget , unit :  existingCat.unit}});
       

    // const add = useCallback(() => {
    //   setCategory((prev)=>{
    //     return{...prev, catName :  existingCat.catName, catBudget :  existingCat.catBudget , unit :  existingCat.unit}})
    // }, [categories]);
    
    
    // useEffect(()=> {
    //   setCategory((prev)=>{
    //     return{...prev, catName :  existingCat.catName, catBudget :  existingCat.catBudget , unit :  existingCat.unit}})
    // },[]);
    
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   // console.log(catId);

    const handleClose = () => {
        props.getCategoryData();
        resetForm();
   }

   const handlechange = (e:Category) => {
    const { name, value } = e.target;
    setExpense({ ...expenseValues, [name]: value });
    }

    
  // console.log("outside add category" + catId);

//   const todayDate = () => {
//     const date = new Date();
//     console.log(date);
//     const parts = {
//       date : date.getDate(),
//       month : date.getMonth() + 1 ,
//       year : date.getFullYear(),
//     }
//     const formatDate = parts.year + "-" + parts.month + "-" + parts.date;
//     const currentMonth = parts.month;
//     const dateDetails = [formatDate,currentMonth];
//     return dateDetails;
//   }

   const editExpense = (e: React.FormEvent) => { 
    e.preventDefault();

    const errors = validate(expenseValues);
   
    setExpenseErrors(errors);
   
    setIsSubmit(true);

    if(Object.values(errors).length === 0 ){
      setIsSubmit(true);
      const id = props.catId
      dispatch(editDataActions.editExpense({...expenseValues,id}))
      resetForm();
      props.getCategoryData();
      navigate("/Expense");
   }
   else if(Object.values(errors).length !== 0){
    setIsSubmit(false);
       
  }
  return;
  
  }

  const validate = (values:expenseValues) => { 

    const errors: any = {};

    if (values.expenseName === ""){
       errors.expense = "Expense Name is required!";
       
    }

    if (values.category === "") {
      errors.category = "Expense Category is required!";
      
    }
    if (values.expenseDesc === "") 
      {errors.desc = "Expense Description is required!";
        
      }
    if (values.expenseAmount === 0){ errors.amount = "Expense Amount is required!";
      
    }
    else if (values.expenseAmount < 0){ errors.amount = "Expense Amount cannot be negative!";
      
    }
    if (values.unit === ""){ errors.unit = "Expense unit is required!";
      
    }
    console.log(errors);
    return errors;
  }

    // const add = () => setCatId((catId) => catId + 1 );
    
   return (
    <>  
    <form className="max-w-xl py-4 px-4 rounded bg-white shadow-lg ">
      <div className='flex justify-end gap-6'>
        <button onClick={handleClose} ><IoIosCloseCircle fontSize={20} fill='green'/></button>    
      </div>
      <h4 className='text-center'>Manage your Expense</h4>
      <div className="grid grid-cols-2 gap-4 my-6 px-6">
        <input type="text" name="expenseName" value={expenseValues.expenseName} placeholder="Expense Name" className=" form-layout" onChange={handlechange}/>
  
        <select name="category" onChange={handlechange} value={expenseValues.category} className=" form-layout">
          <option value="Select">Select Category</option>
          {categories && 
           categories.map((item : T)=> (
            <option key={item.myUUID} value={item.catName}>{item.catName}</option>
           ))}                
        </select>
        {(expenseErrors.expense !== '') && (<div><span className="text-red text-sm ml-1">{expenseErrors.expense}</span></div>)} 
            {(expenseErrors.category !== '') && (<div><span className="text-red text-sm ml-1">{expenseErrors.category}</span></div>)}
        <textarea
          className="col-span-2 form-layout"
          placeholder="Description" name="expenseDesc" value={expenseValues.expenseDesc} onChange={handlechange}
        ></textarea>
         {(expenseErrors.desc !== '') && (<div className="col-span-2"><span className="text-red text-sm ml-1 ">{expenseErrors.desc}</span></div>)} 
        <input type="number" onChange={handlechange} name="expenseAmount" value={expenseValues.expenseAmount} placeholder="Amount spend" className="form-layout"/>
        <select name="unit" onChange={handlechange} value={expenseValues.unit} className=" form-layout">
           <option value="Select unit">Select unit</option>
           <option value="$">$</option> 
           <option value="Rs">Rs</option>     
         </select>  
         {(expenseErrors.amount !== '') && (<div className=""><span className="text-red text-sm ml-1 ">{expenseErrors.amount}</span></div>)}
         {(expenseErrors.unit !== '') && (<div className=""><span className="text-red text-sm ml-1 ">{expenseErrors.unit}</span></div>)}  
         <button className="bg-green text-white col-span-2 p-2 mt-2" onClick={editExpense}>Save & Update Category</button> 
             
      </div>
    </form>    
</>
   );
 
}
