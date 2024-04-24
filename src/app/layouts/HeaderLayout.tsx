'use client'
import React from 'react'
import PropTypes from 'prop-types'

const HeaderLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div  className='w-full h-fit py-2 flex items-center justify-between px-2'>
       {children}
    </div>
  )
}
export default HeaderLayout
