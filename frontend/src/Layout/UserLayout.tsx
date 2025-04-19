import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../component/Nav'

const userLayout:React.FC=() =>{
  return (
    <div>
     
      <Nav />
        <Outlet/>
    </div>
  )
}

export default userLayout