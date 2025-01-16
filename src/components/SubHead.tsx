import React from 'react';

type Props = {
    heading :string,
  }

export const SubHead= (props:Props) => {

  return (
       <>
         <h2 className='text-2xl mt-7 mb-4 text-textGrey font-light'>{props.heading}</h2>
       </>
  )
}
