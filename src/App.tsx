import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import { Dashboard } from './Pages/Dashboard';
import { Expense } from './components/Expense';
import { Register } from './Pages/Register';
import { Login } from './Pages/Login';

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
      </Route>
      <Route path='Signup' element={<Register/>}></Route>
      <Route path='Login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
