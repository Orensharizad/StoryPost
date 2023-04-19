import React from 'react'
import { Post } from '@/models/globalModel'
import PostPreview from './PostPreview'

type Props = {
    posts: Post[]

}

function PostList({ posts }: Props) {
    return (
        <section>
            {posts.map((post: any) =>
                <PostPreview key={post._id} post={post} />
            )}
        </section>
    )
}

export default PostList