import React from 'react';
import { Mainheading } from '../components/Mainheading';
// Sample category data
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const categories = JSON.parse(localStorage.getItem("categories") as string) || [];

interface T {
    catName:string,
    catBudget : number,
    unit : string,
    myUUID : string,
    currentMonth : number,
    currentDate: string,
  }

const CategoryList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);

    if(currentUser){
      navigate("/CategoryList");
    }
    else {
      navigate("/Login");
    }
   
  }, [navigate]);
  return (
    <div className="container mx-auto px-4 py-8">
      <Mainheading mainheading="See All Categories"/>
      <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4 mb-2">
      {categories.map((category:T) => (
          <div key={category.myUUID} className="flex flex-col items-center bg-lightseagreen hover:bg-yellow rounded-full p-4 shadow-md hover:shadow-lg transition duration-700 ease-in-out">
            <div className=" text-white text-xl font-semibold rounded-full w-16 h-16 flex items-center justify-center mb-2">
              {category.catName} {/* Display first letter of category as icon */}
            </div>
            {/* <h2 className="text-md font-medium">{category.catBudget}</h2> */}
          </div>
        ))}
      </div>
     
        
     
    </div>
  );
};

export default CategoryList;
