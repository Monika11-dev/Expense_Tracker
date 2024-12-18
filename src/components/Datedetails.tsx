import React from 'react';

type Props = {
    text : string;
}

export const Datedetails:React.FC<Props> = (props) => {
  return (
    <>
    <div className=''><span className='text-textGrey '>{props.text}</span></div>
    <form className=''>
            <input className="border border-slateGrey px-2 py-1 text-textGrey" type='date'/>
    </form>
    </>
  )
}
