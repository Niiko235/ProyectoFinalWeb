import React, { createContext, useContext, useEffect, useState } from 'react'
import { sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../Firebase/firabase'
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';

export const authContext = createContext();


export const createUserAsCoordinator = async (email, password, userData) => {
    try {
        // 1. Guardar las credenciales del coordinador actual ANTES de crear el nuevo usuario
        const coordinatorUid = auth.currentUser.uid;
        const docref = doc(db, "users", coordinatorUid);
        const docSnap = await getDoc(docref);

        if (!docSnap.exists()) {
            throw new Error("No se encontró el documento de usuario coordinador -- METODO CREATEUSERASCOORDINATOR");
        }

        const coordinatorEmail = docSnap.data().email;
        const coordinatorPassword = docSnap.data().password;

        // 2. Crear el nuevo usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUserId = userCredential.user.uid;

        // 3. Guardar datos adicionales en Firestore con UID nuevo
        await setDoc(doc(db, "users", newUserId), {
            ...userData,
        });

        // 4. Reautenticar al coordinador para mantener su sesión
        await signInWithEmailAndPassword(auth, coordinatorEmail, coordinatorPassword);

        return newUserId;
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
};


export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error('El context Auth-provider no esta funcionando bien')
    return context
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rol, setRol] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();


    // registrar 
    const signup = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);



    // escucha si un usuario sigue logeado aunque recargue la pagina
    // cuando se inicia sesion cambia directamente las credenciales
    useEffect(() => {
    const unsubonscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);

        if (currentUser) {
            const ref = doc(db, 'users', currentUser.uid);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                const data = snap.data();
                setRol(data.rol || null);
                
                if (data.rol && location.pathname === '/login') {
                    if (data.rol === "coordinador") navigate('/admin');
                    else if (data.rol === "profesor") navigate('/docente');
                    else if (data.rol === "estudiante") navigate('/estudiante');
                }
            } else {
                setRol(null);
                // console.warn('No se encontró el documento de usuario');
            }
        } else {
            setRol(null);
        }

        setLoading(false);
    });

    return () => unsubonscribe();
}, []);


    //logearse
    const login = async (email, password, user) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        // console.log('location.pathname', location.pathname);
        if (rol && location.pathname === '/login') {
            if (rol === "coordinador") navigate('/admin');
            else if (rol === "profesor") navigate('/docente');
            else if (rol === "estudiante") navigate('/estudiante');
        }

    }

    // const loginWithGoogle = () =>{
    //     const googleProvider = new GoogleAuthProvider();
    //     return signInWithPopup(auth, googleProvider);
    // }

    // const resetPassword = (email) => {
    //     sendPasswordResetEmail(auth, email);
    // }


    const registrarUsers = (name, lastname, dni, phone, UID, rol, nickname, email, password) =>
        setDoc(doc(db, "users", UID), {
            dni: parseInt(dni),
            lastnames: lastname,
            names: name,
            nickname: nickname,
            phone: parseInt(phone),
            rol: rol,
            email: email,
            password: password,
        });



    //salirse
    const logout = () => signOut(auth);


    return (
        <authContext.Provider value={{ signup, login, user, logout, loading, registrarUsers, rol, createUserAsCoordinator }}> {/*, loginWithGoogle, resetPassword*/}
            {children}
        </authContext.Provider>
    )
}

