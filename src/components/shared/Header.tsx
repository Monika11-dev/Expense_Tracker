import React from "react";
import { Dropdown } from "../Dropdown";


export const Header = () => {
  return (
    <>
    <div>
      <div className="bg-darkBlue flex items-center text-white px-4 py-4">
        <p className="flex-1 text-grey">Advance Budget & Expense Tracker System</p>
        <div>
            <Dropdown/>
        </div>
      </div>
      </div>
    </>
  );
};
