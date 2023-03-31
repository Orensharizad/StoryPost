import { Post } from "../models/globalModel"
import { httpService } from "./httpService"



export const postService = {
    query,
    getById,
    save,
    remove,
    getEmptyPost

}

async function query() {
    const posts: Post[] = await httpService.get('post')
    return posts


}

function getById(postId: any) {
    return httpService.get('post/' + postId)

}

function save(post: Post) {
    if (post._id) {
        return httpService.put('post/' + post._id, post)
    } else {
        return httpService.post('post/', post)
    }
}

function remove(postId: any) {
    return httpService.delete('post/', postId)
}

function getEmptyPost(): Post {
    return {
        "createdAt": Date.now(),
        "postImgUrl": '',
        "postDesc": '',
        "createdBy": {
            "userId": '',
            "fullname": '',
            "userImg": ''
        },
        "comments": [
            {
                "_id": '',
                "createdAt": Date.now(),
                "createdBy": {
                    "userId": '',
                    "fullname": '',
                    "userImg": ''
                },
                "comment": ''

            }
        ],
        "likes": [
            {
                "_id": '',
                "createdBy": {
                    "userId": '',
                    "fullname": '',
                    "userImg": ''
                },

            }
        ]
    }
}



// {

//     "createdAt": 1680173900,
//         "postImgUrl": "https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674479066/main_aq4l31.jpg",
//             "postDesc": "Oren Sharizad in Dubai",
//                 "createdBy": {
//         "userId": "u101",
//             "fullname": "Oren Sharizad",
//                 "userImg": "https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674479066/main_aq4l31.jpg"
//     },
//     "comments": [
//         {
//             "_id": "c101",
//             "createdAt": 1680173900,
//             "createdBy": {
//                 "userId": "u101",
//                 "fullname": "Oren Sharizad",
//                 "userImg": "https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674479066/main_aq4l31.jpg"
//             },
//             "comment": 'WoW look amazing'

//         }
//     ],
//         "likes": [
//             {
//                 "_id": 'l101',
//                 "createdBy": {
//                     "userId": "u101",
//                     "fullname": "Oren Sharizad",
//                     "userImg": "https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674479066/main_aq4l31.jpg"
//                 },

//             }
//         ]
// }
