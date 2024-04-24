import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Panel = () => {
  return (
    <div className='w-full lg:w-5/12 h-fit mx-1 bg-gray-900 rounded-md p-5 flex justify-center items-center'>
         <span className='w-fit h-fit'>
         <TailSpin
            visible={true}
            height="100px"
            width="100px"
            color="#ffffff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{borderRadius:'30px'}}
            wrapperClass=""
            />
         </span>
    </div>
  )
}

export default Panel
