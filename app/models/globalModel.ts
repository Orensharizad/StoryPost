export interface Suggestion {
    _id: string,
    sex: string,
    firstName: string,
    lastName: string,
    lavatar: string,
    company?: string
}


export interface Post {
    _id: string;
    username: string;
    userImg: string;
    img: string;
    caption: string;

}