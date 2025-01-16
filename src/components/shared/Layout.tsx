import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const Layout = () => {


  return (

    // creating dashboard Layout 

    <div className="flex h-screen overflow-hidden relative">
      <Sidebar/>
      <div className="flex-1 bg-lightGrey overflow-scroll">
        <Header/>
        <div className="p-4">{<Outlet/>}</div>
        
      </div>
    </div>
  );
};
