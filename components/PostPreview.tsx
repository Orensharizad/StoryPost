
import { Post } from '@/models/globalModel'
import { useState } from 'react';
import CommentList from './CommentList';
import Image from 'next/image';
import LikeModal from './LikeModal';
import PostIcons from './PostIcons';
import AddComment from './AddComment';
import PostPreviewHeader from './PostPreviewHeader';


type Props = {
    post: Post
}

function PostPreview({ post }: Props) {

    const [isOpenLikeModal, setIsOpenLikeModal] = useState(false)




    return (
        <article className='bg-white  rounded-sm mb-16 md:max-w-[80%] mx-auto'>
            <PostPreviewHeader post={post} />
            <Image className='object-contain max-h-[515px]' width={536} height={300} src={post.postImgUrl} alt="img" />
            <PostIcons post={post} />

            <div className='p-3 truncate flex flex-col'>
                <span onClick={() => setIsOpenLikeModal(prev => !prev)} className='font-bold mb-1 cursor-pointer'>{post.likes.length} likes</span>
                <div className='break-text flex flex-wrap items-center'>
                    <span className='font-bold mr-1'>{post.createdBy.fullname}</span>
                    <span className='break-text text-xs md:text-sm'>{post.postDesc}</span>
                </div>
            </div>

            {post.comments.length > 0 && < CommentList comments={post.comments} />}
            <AddComment post={post} />

            {(isOpenLikeModal && post.likes.length > 0) && <LikeModal likes={post.likes} setIsOpenLikeModal={setIsOpenLikeModal} />}
            <hr />


        </article>
    )
}

export default PostPreview