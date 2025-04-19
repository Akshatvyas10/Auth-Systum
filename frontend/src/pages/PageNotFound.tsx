import React, { useEffect } from 'react'

const PageNotFound = () => {
    useEffect(()=>{

        localStorage.clear()
    },[])
  return (
    <div className="flex items-center justify-center h-screen font-bold text-xl text-center">
    PageNotFound 404
  </div>
  
  )
}

export default PageNotFound