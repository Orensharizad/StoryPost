'use client'
import { Post } from '../models/globalModel'
import CommentList from './CommentList';
import PostPreview from './PostPreview';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import AddComment from './AddComment';
import PostIcons from './PostIcons';
import { useState } from 'react';
import LikeModal from './LikeModal';



type Props = {
    post: Post,
    setSelectePost: React.Dispatch<React.SetStateAction<Post | null>>
    onChangeImg: Function
}

function ImgDetailsModal({ post, setSelectePost, onChangeImg }: Props) {
    const [isOpenLikeModal, setIsOpenLikeModal] = useState(false)
    return (
        <>
            <div onClick={() => onChangeImg(-1)} className='hidden sm:inline-flex absolute left-8 bg-white rounded-full top-[50%]  z-50 p-[3px] cursor-pointer shadow-2xl  items-center justify-center hover:scale-105'>
                <ChevronLeftIcon className='w-5 h-5  ' />
            </div>

            <section className='md:hidden w-full h-full  modal'>
                <div className='text-center font-semibold '>
                    <h3 className='py-3'>Post</h3>
                    <ChevronLeftIcon onClick={() => setSelectePost(null)} className='w-6 h-6 absolute top-3 left-2' />
                </div>
                <PostPreview post={post} />
            </section>


            <section className='hidden md:inline-block '>
                <div onClick={() => setSelectePost(null)} className="black-screen"></div>
                <section className='modal w-[70%] h-[70%] md:h-[90%]  grid grid-cols-2 rounded-lg '>
                    <img className=' max-h-[90%] min-h-[100%]  col-span-1' src={post.postImgUrl} alt="" />
                    <div className='w-full col-span-1'>
                        <div className='flex items-center space-x-2 p-4'>
                            <img className='h-8 w-8 rounded-full object-cover' src={post.createdBy.userImg} alt="" />
                            <p className='font-semibold'>{post.createdBy.fullname}</p>
                        </div>
                        <hr className='mb-4' />
                        <section className='grid grid-rows-5 h-full'>

                            <div className='row-span-3'>
                                <CommentList comments={post.comments} />
                            </div>
                            <div className='row-span-2'>
                                <PostIcons post={post} />
                                <div className='p-3 truncate flex flex-col'>
                                    <span onClick={() => setIsOpenLikeModal(prev => !prev)} className='font-bold mb-1 cursor-pointer'>{post.likes.length} likes</span>
                                    <div className='break-text flex flex-wrap items-center truncate'>
                                        <span className='font-bold mr-1'>{post.createdBy.fullname}</span>
                                        <span className='text-sm break-text'>{post.postDesc}</span>

                                    </div>
                                </div>

                                <AddComment post={post} />
                            </div>

                        </section>
                    </div>


                </section>

            </section>
            {(isOpenLikeModal && post.likes.length > 0) && <LikeModal likes={post.likes} setIsOpenLikeModal={setIsOpenLikeModal} />}

            <div onClick={() => onChangeImg(1)} className='hidden sm:inline-flex absolute right-20 bg-white rounded-full top-[50%]  z-50 p-[3px] cursor-pointer shadow-2xl  items-center justify-center hover:scale-105'>
                <ChevronRightIcon className='w-5 h-5 ' />

            </div>

        </>
    )
}

export default ImgDetailsModal