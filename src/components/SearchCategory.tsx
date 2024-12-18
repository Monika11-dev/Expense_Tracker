import React from 'react';
import { FaSearch } from "react-icons/fa";

export const SearchCategory = () => {
  return (
    <>
      <div className='flex'>
        <form className=' border border-r-0 border-slateGrey'>
            <input className="py-1 px-8 text-sm" type='text' placeholder='Search Category...'></input>
        </form>
        <button className='px-2 border border-slateGrey'><FaSearch fill="slateGrey"/></button>
      </div>
    </>
  )
}
