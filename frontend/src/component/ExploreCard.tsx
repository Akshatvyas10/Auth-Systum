import React from 'react'
import { BsIncognito, BsThreeDots } from 'react-icons/bs';
import { IoMdHeart } from 'react-icons/io';
import { VscVerifiedFilled } from 'react-icons/vsc';

interface Posts {
    post_id?: string|any;
    post_content?: string|any;
    post_image?: string;
    created_at?: string;
    like_count?: number|any;
    by_user_name?: string;
    // addLike?:(like_count:number,post_id:string)=>void
    deletemutate:(post_id:string)=>void
    isActive:string|null;
    onClickUpdate:(post_content:string, post_id:string)=>void
    setIsActive:React.Dispatch<React.SetStateAction<number | null>>;
    
  }
const ExploreCard:React.FC<Posts> = (post) => {
    const role = localStorage.getItem('role')
  return (
          <div key={post.post_id} className="bg-slate-100 p-4 pb-10 border-2 rounded-lg hover:scale-105 duration-500 px-2 relative">
                    <div className='pb-2 uppercase font-semibold flex'>
                      {post.by_user_name}
                      <span className='text-blue-700 inline rounded-lg'>
                        {post.by_user_name === 'Akshat vyas' ? <VscVerifiedFilled /> : ''}
                        {post.by_user_name === 'anand' ? <BsIncognito /> : ''}
                      </span>
                    </div>
                    <div className='border-t-2'>
                      <p className='mb-7 text-sm font-semibold mt-4'>{post.post_content}</p>
            
                      <div className='absolute bottom-4 right-4 flex items-center space-x-12 cursor-pointer'>
                        <p className='text-sm text-gray-700 hover:text-orange-800'>Post Created At: {post.created_at}</p>
                        <div className='flex'>
                          {/* Change the color conditionally based on whether the ppst is liked */}
                          <IoMdHeart
                            // onClick={() => post.addLike(post.like_count,post.post_id)}
                            // className={`${likedPosts.has(post.post_id) ? 'text-red-600' : 'text-slate-400'} text-3xl`}
                          />
                        </div>
                      </div>
            
                         {/* {post.isActive == post.post_id ?<div>hello</div>:null}  */}
                    {/* Three dots and optiom */}
                     <div>
                                  {role == 'moderatora' || role == 'admin' ? (
                                      <div className='absolute top-4 right-4 flex items-center space-x-12 cursor-pointer'  onClick={() => post.setIsActive(prev => (prev === post.post_id ? null : post.post_id))}>
                                      <BsThreeDots />
                                    </div>
                                  ) : null}

                                  {post.isActive == post.post_id &&  (
                                      <ul className='absolute top-8 right-4 flex flex-col space-y-2 border-2 bg-white cursor-pointer rounded-lg shadow-lg p-2'>
                                      <li onClick={() => post.onClickUpdate(post.post_content, post.post_id)}>Update</li>
                                      {role == 'admin' && <li onClick={() => post.deletemutate(post.post_id)}>Delete</li>}
                                    </ul>
                                  )}
                                </div> 
                                  </div>
                   
                  </div>
  )
}

export default ExploreCard