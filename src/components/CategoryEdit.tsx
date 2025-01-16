import React from 'react';


type Props = {
    text : string;
    catId : string,
    getEditData(data:string) : void;
}

export const CategoryEdit = (props:Props) => {
 // calling getData to display add expense form in parent component

 const handleClick = () => {
   
    
      props.getEditData(props.catId);
    
  
}

return (
  <>
  <button onClick={handleClick} className="font-medium text-green  hover:underline mr-2 transition duration-700 ease-in-out">{props.text}</button>
  
</>
)
}
