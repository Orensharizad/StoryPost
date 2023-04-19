import React from 'react'
import { Comment } from '@/models/globalModel'
import Moment from 'react-moment'

type Props = {
    comment: Comment
}

function CommentPreview({ comment }: Props) {
    return (
        <article className='flex items-center space-x-2 mb-3'>
            <img className='h-8 w-8 rounded-full object-cover' src={comment.createdBy.userImg} alt="userImg" />
            <p className='text-sm flex-1'><span className='font-bold'>{comment.createdBy.fullname}</span>{" "}{comment.comment}</p>

            <Moment fromNow className='pr-5 text-xs'>
                {comment.createdAt}
            </Moment>

        </article>
    )
}

export default CommentPreview