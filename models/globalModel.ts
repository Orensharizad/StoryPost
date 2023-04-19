export interface Suggestion {
    _id: string,
    sex: string,
    firstName: string,
    lastName: string,
    lavatar: string,
    company?: string
}




export interface Post {
    _id?: any;
    createdAt: number;
    postImgUrl: string
    postDesc: string
    createdBy: CreatedBy;
    comments: Comment[];
    likes: Like[];
    savedBy: string[];
}

export interface Like {
    _id: string;
    createdBy: CreatedBy;
}

export interface Comment {
    _id: any;
    createdAt: any;
    createdBy: CreatedBy;
    comment: any;
}

export interface CreatedBy {
    userId: any;
    fullname: string;
    userImg: string;
}

export interface User {
    _id?: any
    username: string
    fullname: string
    password?: number | string
    userImg: string;

}

export interface SavedBy {
    userId: any

}

export interface Message {
    id: any
    user: User
    message: string
    date: Date
}