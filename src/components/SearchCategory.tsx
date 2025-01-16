import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { addSearchActions } from '../Store/searchSlice';
import { Categorycard } from './Categorycard';

interface T {
  catName:string,
  catBudget : number,
  unit : string,
  myUUId : string,
  currentMonth : number,
  currentDate: string,
}

export const SearchCategory = () => {
   
  const dispatch = useDispatch();
  
  const searchText : string = useSelector((state:RootState) => state.search.searchText);
  
  const onAddSearchText = (e:{target : {name:string,value:string}}) => {
    dispatch(addSearchActions.doSearch(e.target.value));
  }
  const categories = JSON.parse(localStorage.getItem("categories") as string) || [];

  const filteredCategory = categories.filter((item:T)=>{
   
    if(searchText !== ""){
      return item.catName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
    }
    
  });

  console.log(filteredCategory);

  return (
    <>
      <div className='flex justify-end'>
        <form className=' border border-r-0 border-slateGrey'>
            <input className="py-1 px-8 text-sm" type='text' name="searchCategory" placeholder='Search Category...' value={searchText} onChange={onAddSearchText} />

        </form>
        <button className='px-2 border border-slateGrey'><FaSearch fill="slateGrey"/></button>

      </div>
      {filteredCategory &&  <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8 mb-2 mx-4">
      {filteredCategory.map((item : T) => (
              <Categorycard
                key={item.catName} name={item.catName} budget={item.catBudget}
             />      
            ))}
       
      </div>}
    </>
  )
}
