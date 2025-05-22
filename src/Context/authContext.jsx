import React, {createContext, useContext, useEffect, useState} from 'react'
import { sendPasswordResetEmail ,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from '../Firebase/firabase'

export const authContext = createContext();


export const useAuth = () => {
    const context = useContext(authContext)
    if(!context) throw new Error('El context Auth-provider no esta funcionando bien')
    return context
}

export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => 
        createUserWithEmailAndPassword(auth, email, password);

    useEffect(() => {
        const unsubonscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);     
            setLoading(false);
        })
        

        return () => unsubonscribe();
    }, [])

    const login =  async (email, password, user) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = () =>{
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email);
    }


    const logout = () =>  signOut(auth);
     

    return (
        <authContext.Provider value={{signup, login, user, logout, loading, loginWithGoogle, resetPassword}}>
            {children}
        </authContext.Provider>
    )
}