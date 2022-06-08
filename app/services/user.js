import {auth, db} from "../dataBase/firebase";
import { updatePassword } from "firebase/auth";

import {
    doc,
    updateDoc
} from "firebase/firestore";
import {errorMessage, initialResponse} from "../utils/utils";

const updateUser = async (email, data) => {
    const userDocRef = doc(db, "users", email);
    return await updateDoc(userDocRef, data).then((re) => { return {success: true} }).catch((error) => {return { ...initialResponse, error: true, message: errorMessage(error.code) }})
};


const updateUserPassword = async(newPassword) => {
    const { currentUser } = auth;

    return await updatePassword(currentUser, newPassword).then(() => {
        return {
            success: true
        }
    }).catch((error) => {
        return { ...initialResponse, error: true, message: errorMessage(error.code) };
    });
}



const userService = {
    updateUser,
    updateUserPassword
};

export default userService;
