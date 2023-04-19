'use client'
import { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar'
import { useAppDispatch, useAppSelector } from '@/hooks/stateHook';
import { Post, User } from '../../models/globalModel'
import { postService } from '@/services/postService'
import { HeartIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { PostIcon, SavedIcon, TaggIcon } from '../../iconLibary'
import ProfileFollowers from '../../components/ProfileFollowers'
import { userService } from '@/services/userService'
import ImgDetailsModal from '@/app/components/ImgDetailsModal'
import { setPosts, setSideBarType } from '@/store/userSlice'
import AddPostModal from '@/app/components/AddPostModal'
import ProfileImgsLoader from '@/app/components/ProfileImgsLoader'
import ProfileHeaderLoader from '@/app/components/ProfileHeaderLoader'



function Profile({ params: { id } }: any) {

    const { user: loggdinUser } = useAppSelector((state) => state.user)
    const [user, setUser] = useState<User | null>(null)
    const [allUserPosts, setAllUserPosts] = useState<Post[]>([])
    const { posts } = useAppSelector((state) => state.user)
    const { isOpenAddPostModal } = useAppSelector((state) => state.user)
    const [selectedPost, setSelectePost] = useState<null | Post>(null)
    const [type, setType] = useState<string>('posts')
    const [idx, setIdx] = useState<number>(0)
    const dispatch = useAppDispatch()




    useEffect(() => {
        loadUser()
        dispatch(setSideBarType('profile'))

    }, [])


    const loadUser = async () => {
        try {
            let user: User = await userService.getById(id)
            setUser(user)
            loadPosts(user)

        } catch (err) {
            console.log('err: cannot load user', err)
        }

    }

    const loadPosts = async (user: User) => {
        try {
            const posts = await postService.query()
            const userPosts = posts.filter((post: Post) => post.createdBy.userId === user?._id)
            dispatch(setPosts(userPosts))
            setAllUserPosts(userPosts)

        } catch (err) {
            console.log('err:', err)
        }


    }

    const onChangeImg = (diff: number) => {
        if (diff === 1 && idx >= posts.length - 1 || (diff === -1 && idx === 0)) return
        setSelectePost(posts[idx + diff])
        setIdx(prev => prev + diff)
        console.log('idx:', idx)
    }

    const onChangeType = async (type: string) => {
        setType(type)
        if (!user) return
        try {
            if (type === 'posts') {
                dispatch(setPosts(allUserPosts))
            }
            else if (type === 'saved') {
                const savedPosts = posts.filter((post: Post) => post.savedBy.includes(user._id))
                dispatch(setPosts(savedPosts))
            }

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





    return (
        <div className='grid grid-cols-6 md:h-screen'>
            <section className='col-span-1 md:border md:border-r-slate-200 '>
                <SideBar />
            </section>
            <section className='  md:mt-8 col-span-6 md:col-span-5 md:w-6xl mx-auto p-3 md:p-0 '>
                {!user ? <ProfileHeaderLoader /> :
                    <div className='flex items-center space-x-12 pb-4 '>
                        <img className='w-20 h-20 md:w-36 md:h-36  rounded-full object-cover ' src={user?.userImg} alt="" />
                        <div>
                            <div className='flex  items-start gap-2  md:mb-6'>
                                <h3 className='md:text-xl font-semibold'>{user?.fullname}</h3>
                                {(loggdinUser?._id === user._id) && <Link href={'profile/edit'} className='bg-[#efefef] px-3 py-1 rounded-md font-semibold text-sm md:text-base'>Edit Profile</Link>}
                            </div>
                            <section className='hidden md:inline-flex'>
                                <ProfileFollowers postsLength={posts.length} />
                            </section>

                        </div>
                    </div>
                }

                <section className='md:hidden'>
                    <ProfileFollowers postsLength={posts.length} />
                </section>

                <hr className='py-2' />

                <div className='flex items-center justify-around md:justify-center space-x-6 text-sm text-[#737373] font-semibold'>
                    <div onClick={() => onChangeType('posts')} className={`flex items-center space-x-2 cursor-pointer hover:text-black ${type === 'posts' && 'text-black'}`}> <PostIcon /> <p className='hidden md:inline-block'>POSTS</p></div>

                    {loggdinUser?._id === user?._id && <div onClick={() => onChangeType('saved')} className={`flex items-center space-x-2 cursor-pointer hover:text-black ${type === 'saved' && 'text-black'}`}> <SavedIcon /> <p className='hidden md:inline-block'>SAVED</p></div>}

                    <div className='flex items-center space-x-2 cursor-pointer hover:text-black'> <TaggIcon /> <p className='hidden md:inline-block'>TAGGED</p></div>
                </div>


                {!posts.length ? <ProfileImgsLoader /> :

                    <div className='grid grid-cols-3 gap-1 my-6 '>
                        {posts.map((post: Post) =>
                            <div onClick={() => onSetSelectedPost(post._id)} key={post._id} className='cursor-pointer relative'>
                                <img className='w-32 h-32 md:w-72 md:h-72 object-cover shadow-xl' src={post.postImgUrl} alt="" />
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
                {!posts &&
                    <div>
                        <h3>Dont Post Yet</h3>
                    </div>}

                {posts && selectedPost && <ImgDetailsModal post={posts[idx]} setSelectePost={setSelectePost} onChangeImg={onChangeImg} />}



            </section >

        </div >
    )
}

export default Profile