import { AiFillDashboard } from "react-icons/ai";
import { SiActualbudget } from "react-icons/si";
import { GiExpense } from "react-icons/gi";
import { TbFileReport } from "react-icons/tb";
import { BiSolidReport } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";


type T = {
  key:number,
  label:string,
  path:string,
  icon:JSX.Element,
}

// List of nav links

export const navItems : T[]= [
    {
      key: 1,
      label: 'Dashboard',
      path: '/',
      icon: <AiFillDashboard fontSize={20}/>,
    },
    {
      key: 2,
      label: 'Budget Management',
      path: '/Budget',
      icon: <SiActualbudget fontSize={20}/>,
    },
    {
      key: 3,
      label: 'Expense Management',
      path: '/Expense',
      icon: <GiExpense fontSize={20}/>,
    },
   
  ];

  export const reportItems : T[] = [
    {
      key: 1,
      label: 'Budget Report',
      path: '/BudgetReport',
      icon: <TbFileReport fontSize={20}/>,
    },
    {
      key: 2,
      label: 'Expense Report',
      path: '/ExpenseReport',
      icon: <BiSolidReport fontSize={20}/>,
    },
   
  ];

  export const maintainItems : T[] = [
    {
      key: 1,
      label: 'Category List',
      path: '/CategoryList',
      icon: <FaListUl fontSize={20}/>,
    },
    {
      key: 2,
      label: 'Settings',
      path: '/Settings',
      icon: <CiSettings fontSize={20}/>,
    },
   
  ];