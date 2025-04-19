import React from 'react';

interface SetProps {
  anyUpdate: () => void;
  post_content: string;
  setPost_Content: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
}

const UpdatePost: React.FC<SetProps> = (props) => {
  return (
    <div className="z-20 text-slate-600 px-4 border-2 bg-white md:w-1/2 lg:w-[600px] pb-8 mx-4 md:m-auto pt-10 fixed top-32 right-36 md:right-[450px] rounded-lg shadow-2xl">
      <div>Update Post Content</div>

      <textarea
        name="content"
        className="w-full h-14 border-gray-800 mt-4 ring-2 p-2"
        placeholder="Write your post here..."
        value={props.post_content}
        onChange={props.setPost_Content}
      />

      <div className="mt-4">
        <button
          onClick={() => props.handleSubmit()}  // Fix the onClick handler to call the function
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Update Post
        </button>
      </div>

      <div className="top-0 right-0 m-1 absolute">
        <button
          type="button"
          onClick={props.anyUpdate}
          className="bg-transparent p-2 dark:text-gray-800 dark:hover:bg-gray-900 rounded-xl hover:bg-gray-100 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#999999">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UpdatePost;
