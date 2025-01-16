import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import { Dashboard } from './Pages/Dashboard';
import { Expense } from './Pages/Expense';
import { Budget } from './Pages/Budget';
import { Register } from './Pages/Register';
import { Login } from './Pages/Login';
import { BudgetReport } from './Pages/BudgetReport';
import { ExpenseReport } from './Pages/ExpenseReport';
import  CategoryList  from './Pages/CategoryList';
import { Settings } from './Pages/Settings';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
        index
          element={<Dashboard />}
      />
      <Route path='Expense' element={<Expense/>}></Route>
      <Route path='Budget' element={<Budget/>}></Route>
      <Route path='BudgetReport' element={<BudgetReport/>}></Route>
      <Route path='ExpenseReport' element={<ExpenseReport/>}></Route>
      <Route path='CategoryList' element={<CategoryList/>}></Route>
      <Route path='Settings' element={<Settings/>}></Route>
      </Route>
      <Route path='Signup' element={<Register/>}></Route>
      <Route path='Login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
