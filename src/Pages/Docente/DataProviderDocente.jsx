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

  delete: async (resource, params) => {

    // trae la coleccion de ese id
    const docRef = doc(db, resource, params.id);

    const docSnap = await getDoc(docRef);

    console.log(docSnap);
    
    // if (!docSnap.exists()) {
    //   throw new Error("Proyecto no encontrado");
    // }

    // const proyectoData = docSnap.data();

    // // 2. Recorrer el array de progresses y eliminar cada uno
    // if (proyectoData.progresses && Array.isArray(proyectoData.progresses)) {
    //   const progressesIds = proyectoData.progresses;

    //   // Usamos Promise.all para esperar a que se eliminen todos
    //   await Promise.all(
    //     progressesIds.map(async (progressId) => {
    //       const progressDocRef = doc(db, "progresses", progressId);
    //       await deleteDoc(progressDocRef);
    //     })
    //   );
    // }

    // // 3. Finalmente, eliminar el proyecto
    // await deleteDoc(docRef);

    // return { data: { id: params.id } };
  }
}); 

export default DataProviderDocente;