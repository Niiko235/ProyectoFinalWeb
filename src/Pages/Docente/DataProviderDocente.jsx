import { Resource } from "react-admin";
import { db } from "../../Firebase/firabase";
import {collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where} from "firebase/firestore";
import { useAuth } from "../../Context/authContext";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const DataProviderDocente = (user) =>({


  getList: async (resource) => {

    
    let q = collection(db, resource);

      q = query(q, where("leader", "==", user.uid));
    

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
        

    return {
      data,
      total: data.length,
    };
  },
  getOne: async (resource, { id }) => {
    await delay(200);
    const docRef = doc(db, resource, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      throw new Error("Documento no encontrado");
    }
  },


  getMany: async (resource, { ids }) => {
  try {
    // 1. Crear un array de promesas para obtener cada documento
    const docsPromises = ids.map(id => 
      getDoc(doc(db, resource, id))
    );

    // 2. Ejecutar todas las consultas en paralelo
    const docsSnapshots = await Promise.all(docsPromises);

    // 3. Procesar resultados
    const data = docsSnapshots.map((docSnap, index) => {
      if (!docSnap.exists()) {
        throw new Error(`Documento ${ids[index]} no encontrado`);
      }
      return { id: docSnap.id, ...docSnap.data() };
    });

    return { data };
  } catch (error) {
    console.error(`Error en getMany (${resource}):`, error);
    throw error;
  }
  },
  // ,
  // delete: async (resource, {id}) => {
  //     await delay(200);
  //     const docRef = doc(db, resource, id);

  //     await deleteDoc(docRef);
  //     console.log("eliminado");
      
  //     return { data: { id: id } }; 
  // }
  
  delete: async (resource, { id }) => {
        try {
            console.log(`Eliminando ${resource}/${id}`); // Debug
            const docRef = doc(db, resource, id);
            
            // Verificación opcional de existencia
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                throw new Error("Documento no encontrado");
            }

            await deleteDoc(docRef);
            return { data: { id } }; // Formato correcto
            
        } catch (error) {
            console.error("Error en delete:", error);
            throw error;
        }
    }
}); 

export default DataProviderDocente;