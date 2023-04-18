import { FaceSmileIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, FormEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../Hooks/stateHook"
import { utilService } from "@/services/utilService"
import { Post } from "../models/globalModel"
import { postService } from "@/services/postService"
import useSWR from 'swr'
import { setPosts } from "@/store/userSlice"


type Props = { post: Post }

function AddComment({ post }: Props) {
    const [comment, setComment] = useState<string>('')
    const { user } = useAppSelector((state) => state.user)
    const { posts } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()




    const handleAddComment = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (!user || !comment) return
        const updatedPost = structuredClone(post)

        const createdBy = {
            userId: user._id,
            fullname: user.fullname,
            userImg: user.userImg
        }
        const newComment = {
            _id: utilService.makeId(),
            createdAt: Date.now(),
            createdBy,
            comment
        }

        updatedPost.comments.push(newComment)
        console.log('updatedPost: ', updatedPost);

        onUpdatePost(updatedPost)
        setComment('')

    }

    const onUpdatePost = async (updatedPost: Post) => {
        if (!posts) return
        const newPosts = posts.map((post: Post) => post._id === updatedPost._id ? updatedPost : post)
        try {
            await postService.save(updatedPost)
            dispatch(setPosts(newPosts))

        } catch (err) {
            console.log('err from fronted:', err)

        }
    }

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value
        setComment(value)

    }

    return (
        <form onSubmit={(ev) => handleAddComment(ev)} className='flex items-center p-4'>
            <FaceSmileIcon className='h-7' />
            <input value={comment} onChange={(ev) => handleChange(ev)} className='border-none flex-1 focus:ring-0 outline-none' type="text" placeholder='Comment...' />
            <button className='font-semibold text-blue-400 '>Post</button>
        </form>
    )
}

export default AddComment