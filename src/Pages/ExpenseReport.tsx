import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Mainheading } from '../components/Mainheading';
import { ApexOptions } from 'apexcharts';
import { useNavigate } from 'react-router-dom';

interface Expense {
  expenseName: string;
  category: string;
  expenseDesc: string;
  expenseAmount: number;
  unit: string;
  catId: string;
  currentDate: string;
  currentMonth: number;
}

export const ExpenseReport = () => {

  const navigate = useNavigate();

  // navigation access
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);

    if(currentUser){
      navigate("/ExpenseReport");
    }
    else {
      navigate("/Login");
    }
   
  }, [navigate]);

    const label : string[] = [];
    const amount : number[] = []; 

const [chartOptions,setChartOptions] =  useState<{ options: ApexOptions; series: number[]; }>({ options: { chart: { type: 'donut', }, labels: [], legend: { position: 'bottom', }, }, series: [], });   
const [barState, setBarState] = useState<{
    options: ApexOptions;
    series: {name:string;data:number[]}[];
  }>({
    options: {
      chart: {
        type: 'bar', 
      },
      title: {
        text: "Today's Expenses",
        align: 'center',
       
      },
      xaxis: {
        categories: [], 
      },
      legend: {
        position: 'bottom',
      },
    },
    series: [],
  });

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expense') || '[]');

    // Group expenses by category and calculate total for each
    const expenseMap = storedExpenses.reduce((acc: Record<string, number>, expense: Expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + +expense.expenseAmount;
      return acc;
    }, {});
    
    console.log(expenseMap);

    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];
    console.log(todayDate);

    const categories = Object.keys(expenseMap);
    const amounts : number[] = Object.values(expenseMap);

    const todaysExpenses: Expense[] = storedExpenses.filter((expense: Expense) => expense.currentDate === todayDate);
    const todayExpenseMap = todaysExpenses.reduce((acc: Record<string, number>, expense: Expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + +expense.expenseAmount;
        return acc;
      }, {});

    const todayCategories = Object.keys(todayExpenseMap);
    const todayAmounts = Object.values(todayExpenseMap);
    
    console.log(todayCategories);
    console.log(todayAmounts);

    
    setChartOptions({
      options: {
        chart: {
          type: 'donut' as const,
        },
        
        legend: {
          position: 'bottom',
        },
        labels: categories ,
  
      },
      
      series: amounts,
    });

    setBarState({
        options: {
          chart: {
            type: 'bar', 
          },
          title: {
            text: "Today's Expenses",
            align: 'center',
           
          },
          xaxis: {
            categories: todayCategories.length > 0 ? todayCategories : ['No Expenses'], 
          },
          legend: {
            position: 'bottom',
          },
        },
        series: [{
          name: 'Expense Amount',
          data:todayAmounts.length > 0 ? todayAmounts : [0], 
        }],
      });

    }, []);


  return (
    <div className='container mx-auto px-4'>
    <Mainheading mainheading="See your Expense Report"/>
    
    <div className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-4 mb-2'>
     {/* { chartOptions?.options?.chart?.type && ( */}
    <Chart options={chartOptions.options} series={chartOptions.series} type="donut" />
    <Chart options={barState.options} series={barState.series} type="bar" />

    {/* )} */}
    </div>
  </div>

  );
};
