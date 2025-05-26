import { Resource } from "react-admin";
import { db } from "../../Firebase/firabase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, writeBatch, or } from "firebase/firestore";
import {createUserAsCoordinator} from "../../Context/authContext";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const DataProviderAdmin = {
    
    
    getList: async (resource, params) => {
        try {
            console
            await delay(300);

            let q = collection(db, resource);

            // Usa operador correcto para Firestore
            if(resource === "users") {
                if(params.filter.rol === "profesor") {
                    
                    
                    q = query(q, where("rol", "==", "profesor"));
                    const querySnapshot = await getDocs(q);
                    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    return { data, total: data.length };
                }else{
                     // profesores y estudiantes, excluyendo coordinadores
                    const profesoresSnap = await getDocs(query(collection(db, resource), where("rol", "==", "profesor")));
                    const estudiantesSnap = await getDocs(query(collection(db, resource), where("rol", "==", "estudiante")));

                    const profesores = profesoresSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    const estudiantes = estudiantesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                    const allUsers = [...profesores, ...estudiantes];

                    return {
                        data: allUsers,
                        total: allUsers.length,
                    };
                }
            }

            const querySnapshot = await getDocs(q);

            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            return {
                data,
                total: data.length,
            };
        } catch (error) {
            console.error("Error en getList:", error);
            return Promise.reject(error); 
        }
    },
    
   getOne: async (resource, params) => {
        try {
            const docRef = doc(db, resource, params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { data: { id: docSnap.id, ...docSnap.data() } };
            } else {
                return Promise.reject(new Error("Document not found")); 
            }
        } catch (error) {
            console.error("Error en getOne:", error);
            return Promise.reject(error); 
        }
    },
    getMany: async (resource, params) => {
        try {
            const collectionRef = collection(db, resource);
            const docs = await Promise.all(
                params.ids.map(id => getDoc(doc(collectionRef, id)))
            );

            const data = docs
                .filter(docSnap => docSnap.exists())
                .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));

            return { data };
        } catch (error) {
            console.error("Error en getMany:", error);
            return Promise.reject(error);
        }
    },
    
    create: async (resource, params) => {
        if(resource === "users") {
            try {
                const newUserId = await createUserAsCoordinator(
                    params.data.email,
                    params.data.password,
                    {
                        dni: parseInt(params.data.dni),
                        lastnames: params.data.lastnames,
                        names: params.data.names,
                        nickname: params.data.nickname,
                        phone: parseInt(params.data.phone),
                        rol: params.data.rol === '1' ? "estudiante" : "profesor",
                        email: params.data.email,
                        password: params.data.password,
                    }
                );

                return {
                    data: {
                        id: newUserId,
                        ...params.data,
                    },
                };
            } catch (error) {
                console.error("Error en create:", error);
                return Promise.reject(error); 
            }
        }else{
            try {
                const newDocRef = await addDoc(collection(db, resource), {
                    ...params.data,
                    status: 'Formulacion',
                    observaciones: 'Inicio del proyecto',
                    progress: [],
                    observacionesPrevias: [],
                    estadosPrevios: [],
                    team: [],
                    leader: params.data.leader,
                });

                return {
                    data: { id: newDocRef.id, ...params.data },
                };
            } catch (error) {
                console.error("Error en create:", error);
                return Promise.reject(error); 
            }
        }
    },
    
    update: async (resource, params) => {
       if(resource === "users") {
            const docRefOld = doc(db, resource, params.id);
    
            const oldSnapshot = await getDoc(docRefOld); 
            const oldData = oldSnapshot.data(); 

            

            const docRef = doc(db, resource, params.id);
            const nuevosDatos = {
                ...params.data,
                rol: params.data.rol === '1' ? "estudiante" : "profesor",
            };

            if(oldData.rol !== nuevosDatos.rol && oldData.rol == "profesor") {
                const proyectosRef = collection(db, "projects");
                const q = query(proyectosRef, where("leader", "==", params.id));

                const proyectosSnapshot = await getDocs(q);

                const batch = writeBatch(db); // Para eficiencia

                proyectosSnapshot.forEach((doc) => {
                // Opción 1: Eliminar proyecto completamente
                // batch.delete(doc.ref);

                // Opción 2: Solo remover al líder (dejar proyecto vivo)
                batch.update(doc.ref, { leader: "" });
                });
                await batch.commit();
            }
            await updateDoc(docRef, nuevosDatos);
            return { data: { id: params.id, ...nuevosDatos } };
        }else{
            const docRefOld = doc(db, resource, params.id);
    
            const oldSnapshot = await getDoc(docRefOld); 
            const oldData = oldSnapshot.data(); 

            const docRef = doc(db, resource, params.id);
            if(oldData.observaciones !== params.data.observaciones || oldData.status !== params.data.status) {
                 
                const nuevosDatos = {
                    ...params.data,
                    status: params.data.status,
                    observaciones: params.data.observaciones,
                    estadosPrevios: [...oldData.estadosPrevios, oldData.status],
                    observacionesPrevias: [...oldData.observacionesPrevias, oldData.observaciones],
                };
                await updateDoc(docRef, nuevosDatos);
                return { data: { id: params.id, ...nuevosDatos } };
            }
            throw new Error("No se han realizado cambios en el proyecto");
        }
    },
    
    delete: async (resource, params) => {
    const batch = writeBatch(db);

    const docRef = doc(db, resource, params.id);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();

    if (data.rol === "profesor") {
        const projectRef = collection(db, "projects");
        const q = query(projectRef, where("leader", "==", params.id));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((projectDoc) => {
            const progressArray = projectDoc.data().progress || [];

            progressArray.forEach((progresoId) => {
                batch.delete(doc(db, "progresses", progresoId));
            });

            batch.delete(doc(db, "projects", projectDoc.id));
        });
    }

    batch.delete(doc(db, resource, params.id));

    await batch.commit(); 

    return { data: { id: params.id } };
},
};


export default DataProviderAdmin;