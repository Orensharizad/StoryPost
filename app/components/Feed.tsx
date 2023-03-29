import React from 'react'
import StoryList from './StoryList'

function Feed() {
    return (
        <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto'>
            <section className='col-span-2'>
                <StoryList />
            </section>
            <section></section>
            <section></section>



        </main>
    )
}

export default Feed