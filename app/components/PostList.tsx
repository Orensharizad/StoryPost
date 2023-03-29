import React from 'react'
import { Post } from '../models/globalModel'
import PostPreview from './PostPreview'


function PostList() {
    const posts: Post[] = [
        {
            _id: 'u101',
            username: 'OrenSharizad',
            userImg: 'https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674479066/main_aq4l31.jpg',
            img: 'https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674479066/main_aq4l31.jpg',
            caption: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore eius natus, doloremque beatae sit impedit!'

        }
    ]
    return (
        <section>
            {posts.map((post: Post) =>
                <PostPreview key={post._id} post={post} />
            )}
        </section>
    )
}

export default PostList