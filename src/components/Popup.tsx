import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addExpActions } from "../Store/expenseSlice";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

interface Props {
  getShowData() : void;
}

interface Category {
  target : {
   name : string;
   value : string;
  } ;
} 

interface T {
  catName:string,
  catBudget : number,
  unit : string,
  myUUId : string,
 
}

interface expenseValues {
  expenseName : string,
    category : string,
    expenseDesc : string,
    expenseAmount : number,
    unit :string,
}

export const Popup = (props:Props) => {

  const categories = JSON.parse(localStorage.getItem("categories") as string) || [];
  
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
  console.log(expenseErrors.expense);
  console.log(expenseErrors.amount);

  const [expenseValues, setExpense] = useState({
    expenseName : "",
    category : "",
    expenseDesc : "",
    expenseAmount : 0,
    unit :"",
    });

    // useEffect(() => {
    //   setExpenseErrors({
    //     expense: "",
    //     category: "",
    //     desc: "",
    //     amount: "",
    //     unit: "",
    //   });
    //   setIsSubmit(false);
    // }, [props]);
  

    const dispatch = useDispatch();

    const handlechange = (e:Category) => {
    const { name, value } = e.target;
    setExpense({ ...expenseValues, [name]: value });
   
    }

  const handleClose = () => {
       props.getShowData();
       resetForm();
  }

  const todayDate = () => {
    const date = new Date();
    // console.log(date);
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

  // const reloadOnce = () => {
  //   useEffect(()=> {
  //        console.log("rendered again");
  //   },[]);
  // }

  const handleExpense = (e: React.FormEvent) => {
     e.preventDefault();
   

    const errors = validate(expenseValues);
    console.log(errors.amount);
    setExpenseErrors(errors);
    console.log(Object.values(expenseErrors));
    setIsSubmit(true);

    if(Object.values(errors).length === 0 ){
      setIsSubmit(true);
      console.log("added expense");
      let catId:string = "";
      for(let i = 0 ; i < categories.length ; i++  ){
        if(categories[i].catName === expenseValues.category){
        catId = categories[i].myUUID;    
        }
      }
     const dateDetails = todayDate();
     const currentDate = dateDetails[0];
     const currentMonth = dateDetails[1];
     dispatch(addExpActions.addExpense({...expenseValues,catId,currentDate,currentMonth}));

      resetForm();
      props.getShowData();
    }
    else if(Object.values(errors).length !== 0){
      setIsSubmit(false);
      console.log("not added expense");     
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
    if (values.expenseAmount == 0){ errors.amount = "Expense Amount is required!";
      
    }
    else if (values.expenseAmount < 0){ errors.amount = "Expense Amount cannot be negative!";
      
    }
    if (values.unit === ""){ errors.unit = "Expense unit is required!";
      
    }
    console.log(typeof(values.expenseAmount));
    console.log(errors.amount);
    return errors;
  }

  
  return (
    <>  
        <form className="max-w-xl py-4 px-4 rounded bg-white shadow-lg " id="myForm">
          <div className='flex justify-end gap-6'>
            <button onClick={handleClose} ><IoIosCloseCircle fontSize={20} fill='green'/></button>    
          </div>
          <h4 className='text-center'>Manage your Expense</h4>
          {/* {validationError && (
          <div className="text-red-500 text-sm mb-4">
            {validationError}
          </div>
        )} */}
          <div className="grid grid-cols-2 gap-4 my-6 px-6">
           {/* <div>
            
           </div> */}
           
            <input type="text" name="expenseName" value={expenseValues.expenseName} placeholder="Expense Name" className=" form-layout" onChange={handlechange}/>
            
            <select name="category" onChange={handlechange} value={expenseValues.category} className=" form-layout">
              <option value="Select">Select Category</option>
              {categories && 
               categories.map((item : T)=> (
                <option key={item.myUUId} value={item.catName}>{item.catName}</option>
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
            <button className="bg-green text-white col-span-2 p-2 mt-2" onClick={handleExpense}>Add Expense</button>
          </div>
        </form>    
    </>
  );
};
