import {  useState,useEffect, JSX } from 'react';

import axios from 'axios'
import CreatePost from './CreatePostForm';
import UserPostNumberCard from '../component/UserPostNumberCard';




function Dashboard() {
// for all
const user_role = localStorage.getItem('role')
const [dashboard,SetDashboard]=useState<JSX.Element>()
  // admin Dashboard
  const [numberOfUsers,setNumberOfUsers]=useState<number>()
  const [numberOfPost,setNumberOfPost]=useState<number>()
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  useEffect(()=>{
      axios.get('http://localhost:3002/user/show-user',).then(Response=>{
          setNumberOfUsers(Response.data.data.length)
      }).catch(err=>{
          console.log(err)
      })

      axios.post('http://localhost:3002/posts/explore-post',{'user_id':user_id},{
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      }).then(Response=>{
        setNumberOfPost(Response.data.data.length)
    }).catch(err=>{
        console.log(err)
    })
  },[numberOfUsers,numberOfPost])
  
  // ModeratorDashboard Dashboard or user
  var user_name = localStorage.getItem('name')

  useEffect(() => {
  if(user_role=='admin'){
      SetDashboard(
      <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main content */}
      <div className="flex-1 p-6">
        
          {/* Card for sho num of user and post*/}
            <UserPostNumberCard activenumberOfPost={numberOfPost} activenumberOfUser={numberOfUsers}/>
      
      </div>
        {/* component for add Post */}
     
    </div>)
  }
  if(user_role=='user'){
    SetDashboard(  <div>

      <div className='bg-slate-400 text-white mt-10 hover:scale-105 shadow-md duration-200 rounded-lg m-auto text-center w-1/3 p-8'>
        Welcome <span className='uppercase text-cyan-100 text-2xl'>{user_name} !</span> 
      </div>
  
      
      </div>)
  }
      if(user_role=='moderatora'){
    SetDashboard( <div>
      <div className='bg-slate-400 text-white mt-10 hover:scale-105 shadow-md duration-200 uppercase text-2xl font-bold rounded-lg m-auto text-center w-1/3 p-8'>
   Welcome moderatora {user_name} !
 </div>
 
 </div>)
    }
  },[numberOfUsers,numberOfPost])
   console.log(user_role)
  return (
    <div>
    {dashboard}
    <CreatePost/>
    </div>
  );
}

export default Dashboard;
