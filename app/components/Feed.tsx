'use client'

import React from 'react'
import MiniProfile from './MiniProfile'
import PostList from './PostList'
import StoryList from './StoryList'
import Suggestions from './Suggestions'
import useSWR from 'swr'
import { postService } from '../services/postService'
import Loader from './Loader'


function Feed() {

    const { data: posts, error, isLoading } = useSWR('posts', postService.query)


    if (!posts) return <Loader />
    return (
        <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-4xl mx-auto'>

            <section className='col-span-2'>
                <StoryList />
                <PostList posts={posts} />
            </section>

            <section className='hidden xl:inline-grid md:col-span-1'>
                <div className='fixed top-20'>
                    <MiniProfile />
                    <Suggestions />
                </div>
            </section>



        </main>
    )
}

export default Feed