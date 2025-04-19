import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import UpdatePost from './UpdatePostForm';
import { axiosInstance } from '../Interceptor/AxiosInterceptor';
import ExploreCard from './ExploreCard';
import Swal from 'sweetalert2';

interface Posts {
  post_id: string;
  post_content: string;
  post_image: string;
  created_at: string;
  like_count: number;
  by_user_name: string;
}

interface updateData {
  post_id: string;
  user_id: string | null;
  post_content: string;
}

const   Explore: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updatePostform, setUpdatePostform] = useState<string>('');
  const [updatePostId, setUpdatePostId] = useState<string>('');
  const [isUpdateProps, setIsUpdateProps] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<string | null>(null);
  const [posts, setPosts] = useState<Posts[]>([]);

  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('user_id');

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.post('posts/explore-post', { user_id });
      setPosts(response.data.data || []);
    } catch (err) {
      // console.log(err);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [isUpdate]);

  // Function to delete a post
  const deletePost = async (post_Id: string) => {
    Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete Post!"
        }).then(async(result) => {
          if (result.isConfirmed) {
    try {
       await axiosInstance.delete(`posts/delete-post/${post_Id}`);
      toast.success('User post deleted successfully');
      setIsUpdate(prev => !prev);
      setIsActive('');
       Swal.fire({
                  title: "Deleted!",
                  text: "Your user has been deleted.",
                  icon: "success"
                });
      // Remove deleted post from local state
      setPosts(prevPosts => prevPosts.filter(post => post.post_id !== post_Id));
    } catch (err) {
      // console.log(err);
      toast.error('User post not deleted');
      setIsUpdate(prev => !prev);
    }
  }
  })
  };

  // Function to handle post updates
  const handleUpdate = async () => {
    const updateData: updateData = {
      post_id: updatePostId,
      user_id: user_id,
      post_content: updatePostform
    };

    try {
      await axiosInstance.put(`posts/update-note`, updateData, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        }
      });
      toast.success('User post updated successfully');
      setIsUpdate(prev => !prev);
      setIsUpdateProps(false);
      setIsActive('');
    } catch (err) {
      console.log(err);
      toast.error('User post not updated');
    }
  };

  const onClickUpdate = (post_content: string, post_id: string) => {
    setIsActive('')
    setIsUpdateProps(prev => !prev);
    setUpdatePostId(post_id);
    setUpdatePostform(post_content);
  };

  return (
    <div onDoubleClick={()=>setIsActive('')}>
      <h2 className='text-center p-12 text-2xl font-semibold'>Explore</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-5 px-2">
        {posts.map((post: Posts) => (
          <ExploreCard
            key={post.post_id}
            post_id={post.post_id}
            post_content={post.post_content}
            post_image={post.post_image}
            created_at={post.created_at}
            by_user_name={post.by_user_name}
            like_count={post.like_count}
            deletemutate={() => deletePost(post.post_id)}
            isActive={isActive}
            onClickUpdate={() => onClickUpdate(post.post_content, post.post_id)}
            setIsActive={() => setIsActive(post.post_id)}
          />
        ))}
      </div>
      {isUpdateProps && (
        <UpdatePost
          anyUpdate={() => setIsUpdateProps(prev => !prev)}
          post_content={updatePostform}
          setPost_Content={(e: any) => setUpdatePostform(e.target.value)}
          handleSubmit={handleUpdate}
        />
      )}
    </div>
  );
};

export default Explore;
