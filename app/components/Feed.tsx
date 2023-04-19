'use client'
import PostList from './PostList'
import StoryList from './StoryList'
import AddPostModal from './AddPostModal'
import { useAppDispatch, useAppSelector } from '@/hooks/stateHook';
import { postService } from '@/services/postService'
import { setPosts, setSideBarType } from '@/store/userSlice'
import { useEffect, useState } from 'react'
import PostLoader from './PostLoader'
import SearchModal from './SearchModal'



function Feed() {

    const { posts, isOpenSearchModal } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const { isOpenAddPostModal } = useAppSelector((state) => state.user)
    useEffect(() => {
        loadPosts()
        dispatch(setSideBarType('home'))

        return () => {
            dispatch(setPosts([]))
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


    return (
        <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-2xl mx-auto'>
            <section className='col-span-3'>
                <StoryList />
                {!posts.length ? <PostLoader /> : <PostList posts={posts} />}
            </section>
        </main>
    )
}

export default Feed