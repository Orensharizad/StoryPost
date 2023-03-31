export interface Suggestion {
    _id: string,
    sex: string,
    firstName: string,
    lastName: string,
    lavatar: string,
    company?: string
}




export interface Post {
    _id?: string;
    createdAt: number;
    postImgUrl: string
    postDesc: string
    createdBy: CreatedBy;
    comments: Comment[];
    likes: Like[];
}

export interface Like {
    _id: string;
    createdBy: CreatedBy;
}

export interface Comment {
    _id: string;
    createdAt: number;
    createdBy: CreatedBy;
    comment: string;
}

export interface CreatedBy {
    userId: string;
    fullname: string;
    userImg: string;
}

export interface User {
    _id?: string
    username: string
    fullname: string
    password?: number | string
    userImg: string;

}