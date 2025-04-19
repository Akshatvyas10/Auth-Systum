import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';

interface postContent {
  image: File | null;
  content: string;
}

const CreatePost: React.FC = () => {
  const [token] = useState<any>(localStorage.getItem('token'));
  const [isActive, setIsActive] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const [postContent, setPostContent] = useState<postContent>({
    image: null,
    content: '',
  });

  // Handle input changes for both text content and image file
  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>|any) {
    const { name, value, files } = e.target;
    if(postContent.content==null)return setOutput('enter content')
    if (name === 'content') {
      setPostContent({
        ...postContent,
        [name]: value,
      });
    } else if (name ===  files && files[0]) {
      const file = files[0];
      setPostContent({
        ...postContent,
        image: file,
      });
    }
  }

  // Handle form submission
  function handleSubmit() {
    
    const user_id = localStorage.getItem('user_id');
    const user_name = localStorage.getItem('name');

    const formData = new FormData();
    formData.append('content', postContent.content);
    formData.append('user_id', user_id || '');
    formData.append('user_name', user_name || '');

    if (postContent.image) {
      formData.append('image', postContent.image);
    }

    axios
      .post('http://localhost:3002/posts/save-post', formData, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setIsActive(false);
        setPostContent({
          ...postContent,
          content: '',
        })
        console.log('Post created:', response.data);
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  }

  return (
    
    <div>
      <div className="bottom-0 right-0 fixed m-10">
        <button onClick={() => setIsActive(true)} type="button" className="bg-blue-500 p-2 rounded-xl hover:bg-blue-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
            <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
          </svg>
        </button>
      </div>

      {isActive && (
        <div className="z-20 text-slate-600 px-4 dark:text-gray-600 dark:bg-slate-950 dark:shadow-slate-900 bg-white md:w-1/2 lg:w-[600px] pb-8 mx-4 md:m-auto pt-10 fixed top-16 right-36 mb:right-[400px] lg:right-[450px] rounded-lg shadow-2xl">
          <div>Add Post</div>

          {/* Input for post image */}
          <div className="profile flex justify-center py-4">
            <label htmlFor="file-upload" className="cursor-pointer">
            
              <svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#434343">
                <path d="M440-438ZM106.67-120q-27 0-46.84-19.83Q40-159.67 40-186.67v-502q0-26.33 19.83-46.5 19.84-20.16 46.84-20.16h140L320-840h262.67v66.67H350.33l-73 84.66H106.67v502h666.66v-396H840v396q0 27-20.17 46.84Q799.67-120 773.33-120H106.67Zm666.66-569.33v-84h-84V-840h84v-84.67H840V-840h84.67v66.67H840v84h-66.67ZM439.67-264.67q73.33 0 123.5-50.16 50.16-50.17 50.16-123.5 0-73.34-50.16-123.17-50.17-49.83-123.5-49.83-73.34 0-123.17 49.83t-49.83 123.17q0 73.33 49.83 123.5 49.83 50.16 123.17 50.16Zm0-66.66q-45.67 0-76-30.67-30.34-30.67-30.34-76.33 0-45.67 30.34-76 30.33-30.34 76-30.34 45.66 0 76.33 30.34 30.67 30.33 30.67 76 0 45.66-30.67 76.33t-76.33 30.67Z" />
              </svg>

           
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                name="image"
                onChange={handleInputChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Textarea for post content */}
          <textarea
            name="content"
            className="w-full h-64 border-gray-800 mt-4 ring-2 p-2"
            placeholder="Write your post here..."
            value={postContent.content}
            onChange={handleInputChange}
          />
{output}
          {/* Submit Button */}
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              disabled={!postContent.content.trim() && !postContent.image}
            >
              Submit Post
            </button>
          </div>

          {/* Close button for post*/}
          <div className="top-0 right-0 m-1 absolute">
            <button
              type="button"
              onClick={() => setIsActive(false)}
              className="bg-transparent p-2 dark:text-gray-800 dark:hover:bg-gray-900 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="http://www.w3.org/2000/svg" width="22px" fill="#999999">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
