import React, { useEffect, useState } from 'react'
import { AddPostIcon } from "../app/iconLibary";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { setIsOpenAddPostModal, setPosts } from '../store/userSlice';
import { postService } from '@/services/postService';
import { uploadService } from '@/services/upload.service';
import { Post } from '@/models/globalModel';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/hooks/stateHook';



type Props = {}

function AddPostModal({ }: Props) {

    const [post, setPost] = useState(postService.getEmptyPost())
    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const { posts } = useAppSelector((state) => state.user)


    useEffect(() => {
        loadEmptyPost()

    }, [])


    const loadEmptyPost = () => {
        if (!user) return
        const post = postService.getEmptyPost()
        const createdBy = {
            "userId": user?._id,
            "fullname": user?.fullname,
            "userImg": user?.userImg
        }
        post.createdBy = createdBy
        setPost(post)
    }




    const handleChangeImg = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const notification = toast.loading('loading...')

        try {
            const { secure_url } = await uploadService.uploadImg(ev)
            setPost((prev: Post) => ({ ...prev, postImgUrl: secure_url }))
            toast.success('Successfully !', {
                id: notification
            })
        } catch (err) {
            console.log('err cannot upload img:', err)
        }
    }

    const handleAddPost = async () => {
        if (!posts) return

        try {
            await postService.save(post)
            const updatedPosts = [post, ...posts]
            dispatch(setPosts(updatedPosts))
            handleCloseModal()
        } catch (err) {
            console.log('err: cannot upload post', err)

        }

    }
    const handleChangePostDesc = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name: filed } = ev.target
        setPost((prev: Post) => ({ ...prev, [filed]: value }))
    }

    const handleCloseModal = () => {
        dispatch(setIsOpenAddPostModal(false))

    }


    return (
        <section>
            <div onClick={handleCloseModal} className="black-screen"></div>
            <div className='modal w-full md:w-[850px] max-h-[80vh]  rounded-md'>
                <div>
                    <h3 className=' border border-b-slate-300 text-center py-2 text-[#262626]'>Create new post</h3>
                    {post.postImgUrl && <button onClick={handleAddPost} className='absolute top-3 right-4 text-[#0095f6] hover:text-[#1877f2]'>Share</button>}
                    {post.postImgUrl && <ArrowLeftIcon onClick={() => setPost((prev: Post) => ({ ...prev, postImgUrl: '' }))} className='absolute top-3 left-4 w-5 h-5 cursor-pointer' />
                    }
                </div>


                {!post.postImgUrl && <div className='flex flex-col items-center justify-center space-y-4 h-[70vh]'>
                    <AddPostIcon />
                    <h3>Drag photos and videos here</h3>
                    <label className='cursor-pointer' htmlFor="upload">
                        <p className='bg-[#0095f6] text-white rounded-lg py-1 px-4 border-none hover:bg-[#1877f2] font-semibold'>Select from computer</p>
                        <input onChange={(ev) => handleChangeImg(ev)} id='upload' className='hidden' type="file" />
                    </label>
                </div>}
                {(post.postImgUrl) &&
                    <div className='flex flex-col md:grid grid-cols-3 w-full md:w-[850px] max-h-[80vh]  '>
                        <img className='col-span-2 h-[70vh] object-contain    ' src={post.postImgUrl} alt="" />
                        <div className='col-span-1 '  >
                            <div className='flex items-center space-x-4 pt-4 pl-2'>
                                <img className='w-7 h-7 rounded-full ' src={user?.userImg} alt="" />
                                <p className='text-sm font-semibold'>{user?.fullname}</p>
                            </div>
                            <textarea name='postDesc' onChange={(ev) => handleChangePostDesc(ev)} className='border-none w-full py-4 mt-2 focus:ring-0' placeholder='Write a caption...' />

                        </div>
                    </div>}



            </div>
        </section>
    )
}

export default AddPostModal