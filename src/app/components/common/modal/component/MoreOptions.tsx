import React, { MouseEventHandler } from 'react'

function MoreOptions({showMore}:{showMore:(data: boolean)=>void}) {
  return (
    <div  className='w-full  mt-3 flex justify-center items-center '>
       <span onClick={()=>showMore(true)} className='text-gray-400 hover:text-white tracking-wide text-sm cursor-pointer'>More Options...</span>
    </div>
  )
}

export default MoreOptions
