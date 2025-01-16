import React,{useEffect, useState} from 'react';
import Chart from "react-apexcharts";
import { Mainheading } from '../components/Mainheading';
import { ApexOptions } from 'apexcharts';
import { useNavigate } from 'react-router-dom';

interface T {
    catName:string,
    catBudget : number,
    unit : string,
    myUUID : string,
    currentMonth : number,
    currentDate: string,
  }

  interface Exp {
    expenseName : string,
    category :string,
    expenseDesc : string,
    expenseAmount :number,
    unit :string,
    catId :string;
    currentDate:string;
    currentMonth : number,
  }

export const BudgetReport = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);

    if(currentUser){
      navigate("/BudgetReport");
    }
    else {
      navigate("/Login");
    }
   
  }, [navigate]);

    const [categories, setCategories] =useState<T[]>([]);
    const [expenses, setExpenses] =useState<Exp[]>([]);
    const [totalBudget, setTotalBudget] =useState<number>(0);
    const [totalExpense, setTotalExpense] =useState<number>(0);


    const Categories : string[] = [];
    const Data : number[] = [];
    // const Type : string = "pie";
    
    
    const [state,setState] = useState({
        options: {
           chart: {
             id: "basic-bar"
           },
           xaxis: {
             categories:Categories,
           }
         },
         series: [
           {
             name: "Category Budget",
             data: Data,
           },
           {
            name: "Category Expenses",
            data: Data,
          }
         ],});

         const [pieState,setPieState] = useState<{ options: ApexOptions; series: number[]; }>({
         
         options: {
            chart: {
              type: 'pie'
            },
             labels : ['Total Budget', 'Total Expense'],
             legend : {
              position : 'bottom',
             },
           },
           series: [0,0 ],});


         useEffect(() => {

    const storedCategories = JSON.parse(localStorage.getItem("categories") as string) || [];
    const storedExpenses = JSON.parse(localStorage.getItem("expense") as string) || [];

    const currentMonthIndex = new Date().getMonth();
    const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ]; 
    const currentMonthName = monthNames[currentMonthIndex];
    const currentMonth = currentMonthIndex + 1;
    // console.log(currentMonthName);


    const filteredCategories = storedCategories.filter((cat:T) => cat.currentMonth === currentMonth);
    const filteredExpenses = storedExpenses.filter((exp:Exp)=> exp.currentMonth === currentMonth);
    

    const monthBudget:number = storedCategories.filter((cat:T)=> cat.currentMonth === currentMonth).reduce((sum:number, cat:T) => +sum + +cat.catBudget,0);
    const monthExpenses:number = storedExpenses.filter((exp:Exp)=> exp.currentMonth === currentMonth).reduce((sum:number, exp:Exp) => +sum + +exp.expenseAmount,0);
    
    setCategories(filteredCategories);
    setExpenses(filteredExpenses);
    setTotalBudget(monthBudget);
    setTotalExpense(monthExpenses);

    // console.log(filteredCategories);
    // console.log(filteredExpenses );

    const categoryNames : string[] = [];
    const categoryBudgets : number[] = [];
    const categoryExpenses : {[key : string] : number} = {};

    filteredExpenses.forEach((exp : Exp) => {
      if(!categoryExpenses[exp.category]){
        categoryExpenses[exp.category] = 0;
      }
      categoryExpenses[exp.category] += +exp.expenseAmount;

    });

    filteredCategories.forEach((cat:T)=> {
      categoryNames.push(cat.catName);
      categoryBudgets.push(cat.catBudget);
    });

    const expenseData = categoryNames.map((catName)=> categoryExpenses[catName]|| 0);

    setState({
      options: {
         
        ...state.options,
        
         xaxis: {
           categories: categoryNames,
         }
       },
       series: [
         {
           name: "Budget for " + currentMonthName,
           data: categoryBudgets,
         },
         {
          name: "Expenses for" + currentMonthName,
          data: expenseData,
        },
       ],});


       setPieState((prev)=>({
        ...prev,
        series : [monthBudget,monthExpenses],
       }));

         },[]);
   console.log(pieState);
  return (
    <div className='container mx-auto px-4'>
    <Mainheading mainheading="See Your Budget Reports"/>
    
    <div className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-4 mb-2'>
     
           <Chart
              options={state.options}
              series={state.series}
              type="bar"
            
            />
            
            <Chart 
           
            options = {pieState.options}
            series ={pieState.series} 
            type="pie"
            />

    </div>
  </div>
  )
}

