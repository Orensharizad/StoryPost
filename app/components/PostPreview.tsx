
import { BookmarkIcon, EllipsisHorizontalIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon, PaperAirplaneIcon, FaceSmileIcon } from '@heroicons/react/24/outline'

import { HeartIcon as HeartIconField } from "@heroicons/react/24/solid";
import { Post } from '../models/globalModel'

type Props = {
    post: Post
}

function PostPreview({ post }: Props) {
    return (
        <article className='bg-white my-7 border rounded-sm'>
            <div className='flex items-center p-5 '>
                <img className='rounded-full h-12 w-12 object-contain border p-1 mr-3' src={post.createdBy.userImg} alt="" />
                <p className='flex-1 font-bold '>{post.createdBy.fullname}</p>
                <EllipsisHorizontalIcon className='h-5' />
            </div>
            <img className='object-cover w-full' src={post.postImgUrl} alt="" />
            <div className='flex justify-between px-4 pt-4  '>
                <div className='flex space-x-4 '>
                    <HeartIcon className='btn-post' />
                    <ChatBubbleOvalLeftEllipsisIcon className='btn-post' />
                    <PaperAirplaneIcon className='btn-post rotate-[300deg]' />
                </div>
                <BookmarkIcon className='btn-post' />
            </div>
            <p className='p-5 truncate'>
                <span className='font-bold mr-1'>{post.createdBy.fullname}</span>
                {post.postDesc}
            </p>



            <form className='flex items-center p-4'>
                <FaceSmileIcon className='h-7' />
                <input className='border-none flex-1 focus:ring-0 outline-none' type="text" placeholder='Comment...' />
                <button className='font-semibold text-blue-400 '>Post</button>

            </form>


        </article>
    )
}

export default PostPreview