import {auth, db, storage} from "../dataBase/firebase";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";

export const regWithEmail = (email, password) => {
    let response =   createUserWithEmailAndPassword(auth, email, password)
        .then(async ({user}) => {
            try {
                const userRef = doc(db, "users", user.email);
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    verified: user.emailVerified,
                    role: "User",
                    isAnonymous: user.isAnonymous,
                    date: new Date().getTime(),
                    provider: "e-mail",
                    logins: 1,
                    lastLogin: new Date().getTime(),
                };
                await setDoc(userRef, userData);

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent!
                        // ...

                        return { status:"success",message:"Registro exitoso"}
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        })
        .catch((error) => {
            console.log(error);
            return { status:"error",message:error.code}
        });

    return response
};

export const login = async (email, password) => {

    let response = signInWithEmailAndPassword(auth, email, password)
    .then(async () => {
      const userRef = doc(db, "creators", email);
      const userFirestore = await getDoc(userRef);
      if (userFirestore.exists()) {
        const logins = userFirestore.data().logins;
        await updateDoc(userRef, {
          lastLogin: new Date().getTime(),
          logins: logins + 1,
        });
      }
        return { status:"success",message:"bien"}
    })
    .catch((error) => {
      console.log("sss",error.code);
        return { status:"error",message:error.code}

    });

    return  response;
};

export const logout = async () => {
    signOut(auth)
        .then(() => {
            console.log("Success Logout");
        })
        .catch((error) => {
            console.log(error);
        });
};
