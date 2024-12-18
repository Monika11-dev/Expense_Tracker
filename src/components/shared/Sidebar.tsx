import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeatMap } from "react-icons/ai";
import { navItems, reportItems, maintainItems } from "../../Database/Navlinks";
export const Sidebar : React.FC = () => {

  type T = {
    key:number,
    label:string,
    path:string,
    icon: ReactElement,
  }

  return (
    <>
      <div className="bg-darkBlue w-72 flex flex-col text-white">
        <div className="flex items-center gap-2 bg-blue py-3 px-4">
          <Link to="/" className="text-white">
            <AiOutlineHeatMap fontSize={40} />
          </Link>
          <span className="text-lg">Expense Tracker</span>
        </div>
        <div className="px-4 py-4">
          <div className="mb-8">
            {navItems.map((item : T) => (
              <Link
                key={item.key}
                to={item.path}
                className="flex gap-2 items-center py-2 px-2 hover:bg-green"
              >
                {item.icon}

                <span className="text-base"> {item.label} </span>
              </Link>
            ))}
          </div>
          <div className="mb-8">
            <h2 className="mb-4 text-lg">Reports</h2>
            <div>
              {reportItems.map((item : T) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className=" flex gap-2 items-center py-2 px-2 hover:bg-green"
                >
                  {item.icon}

                  <span className="text-base"> {item.label} </span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-lg">Maintainence</h2>
            <div>
              {maintainItems.map((item : T) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="flex gap-2 items-center py-2 px-2 hover:bg-green"
                >
                  {item.icon}

                  <span className="text-base"> {item.label} </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
