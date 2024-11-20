import { initializeApp } from "firebase/app";

import { createUserWithEmailAndPassword,getAuth,signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { addDoc,getFirestore,collection } from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyD70lNEI3Egz9lv6dszZJLsa2Fa2f0DRlk",
    authDomain: "netflix-clone-418d5.firebaseapp.com",
    projectId: "netflix-clone-418d5",
    storageBucket: "netflix-clone-418d5.firebasestorage.app",
    messagingSenderId: "664040677718",
    appId: "1:664040677718:web:9b9719c216b121cbd376f7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,'user'),{
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email,password) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth,db,login,signup,logout};