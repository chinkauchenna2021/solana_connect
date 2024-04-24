'use client'
import React from 'react'

const ModalLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='z-[99999] w-full h-screen top-0 left-0 absolute flex justify-center items-center backdrop-blur-md bg-gray-600/30'>
       {children}
      
    </div>
  )
}
export default ModalLayout
