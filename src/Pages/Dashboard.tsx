import React from "react";
import { Displaycard } from "../components/Displaycard";
import { SubHead } from "../components/SubHead";
import { Categorycard } from "../components/Categorycard";
import { Footer } from "../components/shared/Footer";
import { Button } from "../components/Button";
import { SearchCategory } from "../components/SearchCategory";
// import { Datedetails } from '../components/StartDate';
import { Popup } from "../components/Popup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mainheading } from "../components/Mainheading";
import { AddCategory } from "../components/AddCategory";
import { CategoryAdd } from "../components/CategoryAdd";
import { useState } from "react";
// import { StartDate } from '../components/StartDate';
// import { StartDate } from '../components/StartDate';
// import { EndDate } from '../components/EndDate';

export const Dashboard = () => {
  interface T {
    catName: string;
    catBudget: number;
    unit: string;
    myUUID: string;
    currentMonth: number;
    currentDate: string;
  }

  interface Date {
    target: {
      name: string;
      value: string;
    };
  }
  // interface Exp {
  //   expenseName : string,
  //   category :string,
  //   expenseDesc : string,
  //   expenseAmount :number,
  //   unit :string,
  //   catId :string;
  //   currentDate:string;
  //currentMonth : Number,
  // }

  const [TodayExpense, setTodayExpense] = useState(0);
  const [TotalBudget, setTotalBudget] = useState(0);
  const [TotalExpense, setTotalExpense] = useState(0);
  const [DateValues, setDate] = useState({ Startdate: "", Enddate: "" });
  // const [Enddate,setEndDate] = useState("");

  console.log(DateValues.Startdate);
  console.log(DateValues.Enddate);

  // console.log(TodayExpense);
  const navigate = useNavigate();

  // navigation access

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") as string
    );

    if (currentUser) {
      navigate("/");
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  const todayDate = () => {
    const date = new Date();
    console.log(date);
    const parts = {
      date: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    const formatDate = parts.year + "-" + parts.month + "-" + parts.date;
    const currentMonth = parts.month;
    const dateDetails = [formatDate, currentMonth];
    return dateDetails;
  };

  const dateDetails = todayDate();
  const currentDate = dateDetails[0];
  const currentMonth = dateDetails[1];
  console.log(currentDate);
  console.log(typeof currentDate);

  useEffect(() => {
    // Fetching ALL expense
    const allExpense =
      JSON.parse(localStorage.getItem("expense") as string) || [];

    // Find the desired expense of particular date

    const todayExpArr = [];
    for (let i = 0; i < allExpense.length; i++) {
      if (allExpense[i].currentDate === currentDate) {
        todayExpArr.push(allExpense[i].expenseAmount);
      }
    }
    console.log(todayExpArr);
    const todayExpense = todayExpArr.reduce(
      (sum: number, item: number) => +sum + +item,
      +0
    );

    // const sum = todayExpArr.reduce(myFunction);

    // function myFunction(total:number, value:number) {
    //   return 0 + value;
    // }
    setTodayExpense(todayExpense);
  }, [navigate]);

  useEffect(() => {
    // Fetching ALL categories budget
    const allBudget =
      JSON.parse(localStorage.getItem("categories") as string) || [];

    // Find the desired expense of particular date
    let Budget = 0;
    //  const totalbudgetArr = [];

    if (DateValues.Startdate && DateValues.Enddate) {
      for (let i = 0; i < allBudget.length; i++) {
        if (
          allBudget[i].currentDate >= DateValues.Startdate &&
          allBudget[i].currentDate <= DateValues.Enddate
        ) {
          Budget += +allBudget[i].catBudget;
        }
      }
    } else {
      for (let i = 0; i < allBudget.length; i++) {
        if (allBudget[i].currentMonth === currentMonth) {
          Budget += +allBudget[i].catBudget;
        }
      }
    }
    // console.log(Budget);
    setTotalBudget(Budget);
    console.log("I rendered");
  }, [DateValues]);

  useEffect(() => {
    // Fetching ALL categories budget
    const allExpense =
      JSON.parse(localStorage.getItem("expense") as string) || [];

    // Find the desired expense of particular date
    let totalExpense = 0;
    //  const totalbudgetArr = [];

    if (DateValues.Startdate && DateValues.Enddate) {
      for (let i = 0; i < allExpense.length; i++) {
        if (
          allExpense[i].currentDate >= DateValues.Startdate &&
          allExpense[i].currentDate <= DateValues.Enddate
        ) {
          totalExpense += +allExpense[i].expenseAmount;
        }
      }
    } else {
      for (let i = 0; i < allExpense.length; i++) {
        if (allExpense[i].currentMonth === currentMonth) {
          totalExpense += +allExpense[i].expenseAmount;
        }
      }
    }
    // console.log(Budget);
    setTotalExpense(totalExpense);
    console.log("I rendered total Expense");
  }, [DateValues]);

  // useEffect(() => {

  // const allBudget = JSON.parse(localStorage.getItem("categories") as string) || [];

  // let Budget = 0 ;

  // if(DateValues.Startdate && DateValues.Enddate){
  //   for(let i=0; i<allBudget.length ; i++){
  //     if(allBudget[i].currentDate >= DateValues.Startdate && allBudget[i].currentDate <= DateValues.Enddate ){
  //      Budget += (+allBudget[i].catBudget);
  //     }
  //  }
  // }

  // setTotalBudget(Budget);
  // console.log("I rendered according to date");
  // },[DateValues]);

  // show add expense form

  const getData = () => {
    document.getElementById("formPopup")!.classList.remove("hidden");
  };

  const getCatData = () => {
    document.getElementById("categoryPopup")!.classList.remove("hidden");
  };

  // close add expense form

  const getShowData = () => {
    document.getElementById("formPopup")!.classList.add("hidden");
  };
  const getCategoryData = () => {
    document.getElementById("categoryPopup")!.classList.add("hidden");
  };

  //
  // const getStartDate = (Data:string):void =>  {

  //   console.log(Data);
  //   console.log(currentDate);
  //   setStartDate(Data);
  //   if("2024-12-16" >= Data){
  //     console.log("worked");
  //   }
  //   setTotalBudget(5000);

  // }

  // const getEndDate = (Data:string):void =>  {
  //   console.log(Data);

  //   console.log(currentDate);
  //   setEndDate(Data);
  //   if(currentDate >= Data){
  //     console.log("worked");
  //   }
  //   setTotalBudget(6000);

  // }

  // getting categories from localStorage

  const handleDate = (e: Date) => {
    // const allBudget = JSON.parse(localStorage.getItem("categories") as string) || [];
    // let Budget = 0;

    const { name, value } = e.target;
    setDate({ ...DateValues, [name]: value });
    console.log(DateValues.Startdate);
    console.log(DateValues.Enddate);

    // setTotalBudget(Budget);
    // console.log("I rendered according to date");
  };
  // }

  const categories =
    JSON.parse(localStorage.getItem("categories") as string) || [];

  return (
    <div className="container mx-auto">
      <div className="flex flex-col mb-2 px-4"> 
        <SearchCategory />
      </div>

      <Mainheading mainheading="Manage your budget in easy steps" />

      <div className="flex justify-end mt-4 mb-8 px-4 gap-6">
        <div className="flex gap-2 items-center">
          <form className="">
            <label>From</label>
            <input
              className="border border-slateGrey px-2 py-1 text-textGrey mx-2"
              type="date"
              name="Startdate"
              onChange={handleDate}
            />
            <label>To</label>

            <input
              className="border border-slateGrey px-2 py-1 text-textGrey mx-2"
              type="date"
              name="Enddate"
              onChange={handleDate}
            />
          </form>
          {/* <StartDate text='From' getStartDate={getStartDate}/> */}
          {/* <EndDate text='To' getEndDate={getEndDate}/> */}
        </div>
        <Button text="Add Expense" getData={getData} />
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4 mb-2">
        <Displaycard heading="Today's Expense" expense={TodayExpense} />
        <Displaycard heading="Total Budget" expense={TotalBudget} />
        <Displaycard heading="Total Expense" expense={TotalExpense} />
        {/* <Displaycard/> */}
      </div>

      <SubHead heading="Current Budget in each Categories" />

      <div className="flex justify-end my-2 px-4 gap-6">
        <CategoryAdd text="Add Category" getCatData={getCatData} />
      </div>

      {categories && (
        <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8 mb-2 mx-4">
          {categories.map((item: T) => (
            <Categorycard
              key={item.catName}
              name={item.catName}
              budget={item.catBudget}
            />
          ))}
        </div>
      )}

      <div
        id="formPopup"
        className="mt-2 mb-8 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden"
      >
        <Popup getShowData={getShowData} />
      </div>
      <div
        id="categoryPopup"
        className="mt-2 mb-8 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden"
      >
        <AddCategory getCategoryData={getCategoryData} />
      </div>

      <Footer />
    </div>
  );
};
