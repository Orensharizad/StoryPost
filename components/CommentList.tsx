import React from 'react'
import { Comment } from '@/models/globalModel'
import CommentPreview from './CommentPreview'

type Props = {
    comments: Comment[]
}

function CommentList({ comments }: Props) {
    return (
        <section className='px-4 max-h-20 md:max-h-[22rem] overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
            {comments.map((comment: Comment) =>
                <CommentPreview key={comment?._id} comment={comment} />

            )}
        </section>
    )
}

export default CommentList