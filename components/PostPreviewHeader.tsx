import React from 'react'
import { Post } from '@/models/globalModel'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

type Props = { post: Post }

function PostPreviewHeader({ post }: Props) {
    return (
        <div className='flex items-center py-3 '>
            <Link href={`/profile/${post.createdBy.userId}`}>
                <Image className='rounded-full h-8 w-8  border mr-3' width={48} height={48} src={post.createdBy.userImg} alt="" />
            </Link>
            <p className='text-sm flex-1 font-semibold '>{post.createdBy.fullname}</p>
            <EllipsisHorizontalIcon className='h-5' />
        </div>
    )
}

export default PostPreviewHeader