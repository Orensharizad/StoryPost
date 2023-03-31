import { User } from "../models/globalModel"
import { CheckAuth } from "../mongoDB/user.service"
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
    return httpService.get(`user`)
}


async function getById(userId: any) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}



async function update(newUser: any) {

    const user = await httpService.put(`user`, newUser)
    // Handle case in which admin updates other user's details
    // if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
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



