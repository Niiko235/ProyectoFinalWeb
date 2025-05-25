import { Resource } from "react-admin";
import { db } from "../../Firebase/firabase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from "firebase/firestore";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const EstudiantedataProvider = (user) => ({

  getList: async (resource) => {
    let q = collection(db, resource);

    // Solo filtrar proyectos donde el estudiante pertenezca al equipo
    if (resource === "projects") {
      q = query(q, where("team", "array-contains", user.uid));
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
    const docsPromises = ids.map(id => getDoc(doc(db, resource, id)));
    const docsSnapshots = await Promise.all(docsPromises);
    const data = docsSnapshots
      .filter(docSnap => docSnap.exists())
      .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    return { data };
  }
});

export default EstudiantedataProvider;
