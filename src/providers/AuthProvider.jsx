import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from './../firebase/firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const registerUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserInfo = (name, image) => {
        setLoading(false)
        return updateProfile(auth.currentUser, 
            {
                displayName: name, 
                photoURL: image
            })
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            const Email = currentUser?.email || user?.email;
            const loggedMail = {email: Email};
            setUser(currentUser);
            
            if(currentUser){
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        })
        return ()=> unsubscribe();
    },[])

    const logOut = () =>{
        return signOut(auth);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const AuthInfo = {
        user,
        registerUser,
        login,
        googleLogin,
        logOut,
        loading,
        updateUserInfo,
        setUser,
        setLoading
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;