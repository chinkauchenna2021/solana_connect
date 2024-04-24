'use client'
import React from 'react'
import PropTypes from 'prop-types'

const BodyLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div  className='w-full lg:w-3/6 min-h-screen border-b'>
       {children}
    </div>
  )
}
export default BodyLayout
