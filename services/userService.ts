import { User } from "@/app/models/globalModel"
import { httpService } from "./httpService"
import { utilService } from "./utilService"



export const userService = {
    login,
    signup,
    getUsers,
    getById,
    update,
    getEmptyUser
}



function getUsers() {
    return httpService.get(`users`)
}


async function getById(userId: any) {
    return httpService.get('user/' + userId)

}



async function update(newUser: any) {

    return httpService.put(`user`, newUser)


}

async function login(userCred: User) {
    return httpService.get(`user`, userCred)
}
async function signup(userCred: User) {
    if (!userCred.userImg) userCred.userImg = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    return httpService.post(`user`, userCred)


}


function getEmptyUser(): User {

    return {
        username: "",
        fullname: "",
        password: "",
        userImg: "",
    }

}



