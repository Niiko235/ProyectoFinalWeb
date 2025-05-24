import React, {createContext, useContext, useEffect, useState} from 'react'
import { sendPasswordResetEmail ,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth, db} from '../Firebase/firabase'
import {doc, setDoc } from 'firebase/firestore';

export const authContext = createContext();


export const useAuth = () => {
    const context = useContext(authContext)
    if(!context) throw new Error('El context Auth-provider no esta funcionando bien')
    return context
}

export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // registrar 
    const signup = (email, password) => 
        createUserWithEmailAndPassword(auth, email, password);
    


    // escucha si un usuario sigue logeado aunque recargue la pagina
    // cuando se inicia sesion cambia directamente las credenciales
    useEffect(() => {  
        const unsubonscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);     
            setLoading(false);
        })
        
        // console.log(user);
        

        return () => unsubonscribe();
    }, [])


    //logearse
    const login =  async (email, password, user) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        
    }

    // const loginWithGoogle = () =>{
    //     const googleProvider = new GoogleAuthProvider();
    //     return signInWithPopup(auth, googleProvider);
    // }

    // const resetPassword = (email) => {
    //     sendPasswordResetEmail(auth, email);
    // }


    const registrarUsers = (name, lastname, dni, phone, UID, rol, nickname) =>
        setDoc(doc(db, "users", UID), {
            dni: parseInt(dni),
            lastnames: lastname,
            names: name,
            nickname: nickname,
            phone: parseInt(phone),
            rol: rol,
        });
    


    //salirse
    const logout = () =>  signOut(auth);
     

    return (
        <authContext.Provider value={{signup, login, user, logout, loading, registrarUsers}}> {/*, loginWithGoogle, resetPassword*/}
            {children}
        </authContext.Provider>
    )
}

