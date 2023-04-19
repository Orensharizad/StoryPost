'use client'
import { BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/stateHook';
import { Like, Post } from '@/models/globalModel'
import { utilService } from '@/services/utilService'
import { postService } from '@/services/postService'
import { setPosts } from '@/store/userSlice'

type Props = {
    post: Post
}

function PostIcons({ post }: Props) {
    const { user } = useAppSelector((state) => state.user)
    const [isLike, setIsLike] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const { posts } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const isLike = CheckIsLike()
        const isSave = CheckIsSaved()
        setIsLike(isLike)
        setIsSaved(isSave)

    }, [])


    const CheckIsLike = () => {
        return post.likes.some((like: Like) => like.createdBy.userId === user?._id)

    }
    const CheckIsSaved = () => {
        return post.savedBy?.some((savedBy: string) => savedBy === user?._id)

    }

    const handleToggleLike = () => {
        if (!user) return
        const updatedPost = structuredClone(post)

        const like = {
            _id: utilService.makeId(),
            createdBy: {
                userId: user._id,
                fullname: user.fullname,
                userImg: user.userImg
            }
        }
        if (isLike) {
            const removeLike = post.likes.filter((like: Like) => like.createdBy.userId !== user?._id)
            updatedPost.likes = removeLike
            setIsLike(false)
            return onUpdatePost(updatedPost)

        }
        else {
            setIsLike(true)
            updatedPost.likes.push(like)
            return onUpdatePost(updatedPost)
        }

    }

    const handleToggleSave = () => {
        if (!user) return

        if (isSaved) {
            setIsSaved(false)
            const removeSave = post.savedBy.filter((savedBy: string) => savedBy !== user?._id)
            const updatedPost = { ...post, savedBy: removeSave }
            return onUpdatePost(updatedPost)

        }
        else {
            setIsSaved(true)
            const updatedPost = structuredClone(post)
            updatedPost.savedBy.push(user._id)
            return onUpdatePost(updatedPost)
        }

    }

    const onUpdatePost = async (updatedPost: Post) => {
        console.log('updatedPost: ', updatedPost);
        if (!posts) return
        const newPosts = posts.map((post: Post) => post._id === updatedPost._id ? updatedPost : post)
        try {
            await postService.save(updatedPost)
            dispatch(setPosts(newPosts))

        } catch (err) {
            console.log('err from fronted:', err)

        }
    }


    return (
        <div className='flex justify-between px-4 pt-4  '>
            <div className='flex space-x-4 '>
                <HeartIcon onClick={handleToggleLike} className={`btn-post ${isLike && 'fill-red-500 stroke-red-500'}  `} />
                <ChatBubbleOvalLeftEllipsisIcon className='btn-post' />
                <PaperAirplaneIcon className='btn-post rotate-[300deg]' />
            </div>
            <BookmarkIcon onClick={handleToggleSave} className={`btn-post ${isSaved && 'fill-black stroke-black'}  `} />
        </div>
    )
}

export default PostIcons