import React from 'react'
interface propsInterface{
    activenumberOfUser:Number|any;
    activenumberOfPost:Number|any;
}

    const UserPostNumberCard: React.FC<propsInterface> = (props) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold">Total Users</h2>
    <p className="text-xl mt-4">{props.activenumberOfUser}</p>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold">Total Post</h2>
    <p className="text-xl mt-4">{props.activenumberOfPost}</p>
  </div>
    </div>
  )
}

export default UserPostNumberCard