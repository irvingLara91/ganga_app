import {db} from "../dataBase/firebase";

import {
    doc,
    updateDoc
} from "firebase/firestore";
import {errorMessage, initialResponse} from "../utils/utils";

const updateUser = async (email, data) => {
    const userDocRef = doc(db, "users", email);
    return await updateDoc(userDocRef, data).then((re) => { return {success: true} }).catch((error) => {return { ...initialResponse, error: true, message: errorMessage(error.code) }})
};



const userService = {
    updateUser,
};

export default userService;
