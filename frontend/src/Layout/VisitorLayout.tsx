import React from 'react'
import { Outlet } from 'react-router-dom'

const VisitorLayout:React.FC=()=> {
  return (
    <div>
        
        <Outlet/>
    </div>
  )
}

export default VisitorLayout