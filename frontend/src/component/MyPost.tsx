import { useQuery } from '@tanstack/react-query';
import {axiosInstance} from '../Interceptor/AxiosInterceptor';
import React, {  useEffect, useState } from 'react'

import PostCard from '../component/PostCard';


interface Posts {
    post_id: string
    post_content: string;
    post_image: string;
    created_at: string;
    like_count: number;
    addLike:any
}
interface addLike{
    'Like': number, 
    'user_id': string |null,
     'post_id': string 
  }

const MyPost:React.FC=()=> {
   
 
    const [isUpdate,setIsupdate]=useState(false)
    const user_id = localStorage.getItem('user_id');

    const addLike = (postLike: number, postId: string) => {
        const newLike = postLike + 1
        let data:addLike = { 'Like': newLike, 'user_id': user_id, 'post_id': postId }
        axiosInstance
            .put('http://localhost:3002/posts/add-like', data)
            .then((response) => {
                setIsupdate(p=>!p)
                console.log(response.data);

            })
            .catch((err) => {
                console.log(err);
            });
    }


   

    const myPost = async () => {
        const data = { user_id };
      
        try {
          const response = await axiosInstance.post('/posts/show-my-post', data );
          console.log(response.data);
          return response.data.data || []; 
        } 
        catch (err) {
          console.error(err);
          return []; 
        }
      };

      const { data = [] } = useQuery({
        queryKey: ['posts'],
        queryFn: myPost,
        // staleTime:10000c
      });
      
      useEffect(()=>{
        myPost
      },[isUpdate])
      
      console.log(data); // This will log the data returned from the myPost function
      

    return (
        <div className='bg-slate-50 h-screen'>
            <h2 className='text-center p-12 text-2xl font-semibold'>My Post</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-2">
            {data?.map((datas:Posts) => (
                
                    <PostCard  {...datas}  addLike={addLike}   />
                ))}
              {!data &&  <div className='text-center justify-center items-center'>
                <img src='../src/assets/no-posts-yet.png' className='h-full'/>
                </div>
            }
            

            </div>
           
        </div>

    );
}

export default MyPost;
