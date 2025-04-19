import React from 'react';
import { IoMdHeart } from 'react-icons/io';

interface Posts {
    post_id: string;
    post_content: string;
    post_image: string;
    created_at: string;
    like_count: number;
    addLike: (like_count: number, post_id: string) => void;
}

const PostCard: React.FC<Posts> = (props) => {
    const user_name = localStorage.getItem('name');

    return (
        <div className="bg-slate-100 p-4 pb-10 rounded-lg hover:scale-105 duration-500 relative">
            <div className="pb-2 uppercase font-semibold">
                {user_name} <span className="bg-slate-400 ml-5 px-2 rounded-lg">you</span>
            </div>
            <div className="border-t-2">
                <p className="mb-7 text-sm font-semibold mt-4">{props.post_content}</p>
                <div
                    className="absolute bottom-4 right-4 flex items-center space-x-12 cursor-pointer"
                    onClick={() => props.addLike(props.like_count,props.post_id)}
                >
                    <p className="text-sm text-gray-700 hover:text-orange-800">
                        Post Created At: {props.created_at}
                    </p>

                    <div className="flex">
                        <IoMdHeart className="text-red-500 text-3xl" />
                        {props.like_count}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
