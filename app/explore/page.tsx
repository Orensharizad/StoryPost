'use client'
import React, { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar'
import { useAppDispatch, useAppSelector } from '@/hooks/stateHook';
import { setPosts, setSideBarType } from '@/store/userSlice'
import { postService } from '@/services/postService'
import { Post } from '@/models/globalModel'
import { HeartIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'
import ExploreLoader from '../../components/ExploreLoader'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import ImgDetailsModal from '../../components/ImgDetailsModal'
import AddPostModal from '../../components/AddPostModal'
import SearchUsers from '../../components/SearchUsers'

function Explore() {
    const [selectedPost, setSelectePost] = useState<null | Post>(null)
    const [search, setSearch] = useState<string>('')
    const [idx, setIdx] = useState<number>(0)
    const { posts } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const { isOpenAddPostModal } = useAppSelector((state) => state.user)

    useEffect(() => {
        dispatch(setSideBarType('explore'))
        loadPosts()

        return () => {
            dispatch(setPosts(null))
        }

    }, [])


    const loadPosts = async () => {
        try {
            const posts = await postService.query()
            dispatch(setPosts(posts))

        } catch (err) {
            console.log('err: cannot load posts', err)
        }

    }

    const onSetSelectedPost = (id: any) => {
        if (!posts) return
        const postIdx = posts?.findIndex((post: Post) => post._id === id)
        setIdx(postIdx)
        setSelectePost(posts[postIdx])
    }

    const onChangeImg = (diff: number) => {
        if (!posts) return
        if (diff === 1 && idx >= posts.length - 1 || (diff === -1 && idx === 0)) return
        setSelectePost(posts[idx + diff])
        setIdx(prev => prev + diff)
        console.log('idx:', idx)
    }

    const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target
        setSearch(value)

    }




    return (
        <div className='grid grid-cols-6 md:h-screen'>
            <section className='col-span-1 md:border md:border-r-slate-200 '>
                <SideBar />
            </section>

            {

                !posts?.length ? <ExploreLoader /> :
                    <section className='md:mt-8 col-span-6 md:col-span-5 md:max-w-[1350px] mx-auto p-3 md:p-0 '>

                        <div className="relative mt-1  rounded-md ">
                            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none h-10">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                            </div>
                            <input onChange={(ev) => handleSearch(ev)} className="bg-[#efefef] block w-full pl-10 sm:text-sm shadow-sm border-none  focus:outline-none focus:ring-0 rounded-md" type="text" placeholder="Search" />
                        </div>


                        {search ? <SearchUsers search={search} /> :
                            <div className='grid grid-cols-3 gap-2 my-6 '>
                                {posts.map((post: Post) =>
                                    <div onClick={() => onSetSelectedPost(post._id)} key={post._id} className='cursor-pointer relative'>
                                        <img className='w-32 h-32 md:w-80 md:h-80 object-cover shadow-xl' src={post.postImgUrl} alt="" />
                                        <div className='absolute top-0 flex items-center justify-center opacity-0 hover:opacity-100 w-full h-full hover:black-bg text-white font-semibold space-x-6'>
                                            <div className='flex items-center space-x-1 '>
                                                <HeartIcon className='w-5 h-5 fill-white' />
                                                <span>{post.likes.length}</span>
                                            </div>
                                            <div className='flex items-center  space-x-1'>
                                                <ChatBubbleOvalLeftIcon className='w-5 h-5 fill-white' />
                                                <span>{post.comments.length}</span>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>}
                    </section >
            }

            {posts && selectedPost && <ImgDetailsModal post={posts[idx]} setSelectePost={setSelectePost} onChangeImg={onChangeImg} />}

            {isOpenAddPostModal && <AddPostModal />}

        </div >
    )
}


export default Explore