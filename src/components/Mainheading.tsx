import React from 'react'

type Props = {
    mainheading :string,
  }

export const Mainheading : React.FC<Props> = (props) => {

  return (
    <>
    <h1 className='text-3xl font-normal text-darkGrey p-4 my-2'>{props.mainheading}</h1>
    </>
  )
}
