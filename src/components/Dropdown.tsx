import React from "react";
import { Link} from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Dropdown = () => {


  const navigate = useNavigate();

  // getting current user info logged in

  const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);

  // accessing dom element using useRef

  const profileElement = useRef<HTMLInputElement>(null);

  // handles profile dropdown

  const handleDropdown = () => {
    const dropdownElement = profileElement.current!;
    dropdownElement.classList.toggle('hidden');
  };

  // handles logout

  const handleLogout = () => {

    localStorage.removeItem("currentUser");
    alert("You have been logged out.");
    navigate("/Login");
  };

  return (
    <>
      <div className="relative">
        <button className="flex items-center gap-1" onClick={handleDropdown}>
          <span>{currentUser}</span>
          <span>
            <IoIosArrowDown />
          </span>
        </button>
        <div
          className="bg-blue text-white absolute top-8 right-4 hidden"
          ref={profileElement}
        >
          <ul>
            <li className="hover:bg-white hover:text-darkGrey px-4 py-1">
              <Link to="/Settings">Profile</Link>
            </li>
            {/* <li className="hover:bg-white hover:text-darkGrey px-4 py-1">
              <Link to="/Settings ">Settings</Link> */}
            {/* </li> */}
            <li className="hover:bg-white hover:text-darkGrey px-4 py-1">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
