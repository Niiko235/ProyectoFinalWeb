import { Resource } from "react-admin";
import { db } from "../../Firebase/firabase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, writeBatch } from "firebase/firestore";


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



const DataProviderDocente = (user) => ({


  getList: async (resource) => {


    let q = collection(db, resource);

    if (resource === "users") {
      q = query(q, where("rol", "==", "estudiante"));
    }
    // Si es otro recurso (por ejemplo, proyectos), filtra por leader
    else if (resource !== "users") {
      q = query(q, where("leader", "==", user.uid));
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
    if (resource === "users") {
      // Trae los usuarios por sus IDs
      const docsPromises = ids.map(id => getDoc(doc(db, "users", id)));
      const docsSnapshots = await Promise.all(docsPromises);
      const data = docsSnapshots
        .filter(docSnap => docSnap.exists())
        .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      return { data };
    }
    else {
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
    }
  },


  deleteMany: async (resource, { ids }) => {
    try {
      // 1. Obtener todos los proyectos primero
      const projectsSnap = await Promise.all(
        ids.map(id => getDoc(doc(db, resource, id)))
      );

      // 2. Preparar todas las operaciones de eliminación
      const batch = writeBatch(db);


      projectsSnap.forEach((docSnap, index) => {
        if (!docSnap.exists()) return;

        // Eliminar el proyecto
        batch.delete(doc(db, resource, ids[index]));

        // Eliminar sus progresses
        const progressesIds = docSnap.data().progress || [];
        progressesIds.forEach(progressId => {
          batch.delete(doc(db, "progresses", progressId));
        });
      });

      // 3. Ejecutar TODAS las eliminaciones en una sola transacción
      await batch.commit();

      // console.log(`Eliminados ${ids.length} proyectos y ${totalProgresses} avances`);
      return { data: ids.map(id => ({ id })) };

    } catch (error) {
      console.error("Error en deleteMany:", error);
      throw error;
    }
  },

  delete: async (resource, { id }) => {
    try {
      const batch = writeBatch(db);
      const projectRef = doc(db, resource, id);

      // 1. Obtener el proyecto primero para sacar los progressesIds
      const projectSnap = await getDoc(projectRef);

      if (!projectSnap.exists()) {
        throw new Error("Proyecto no encontrado");
      }

      const progressesIds = projectSnap.data().progress || [];

      // 2. Añadir eliminación de TODOS los avances al batch
      progressesIds.forEach(progressId => {
        const progressRef = doc(db, "progresses", progressId);
        batch.delete(progressRef);
      });

      // 3. Añadir eliminación del proyecto al batch
      batch.delete(projectRef);

      // 4. Ejecutar transacción atómica
      await batch.commit();

      return { data: { id } };

    } catch (error) {
      throw new Error(`No se pudo eliminar: ${error.message}`);
    }
  },

  update: async (resource, { id, data, previousData }) => {
    try {
    // Pequeño delay para evitar flickering en la UI (opcional)
    await delay(300); 
    
    if (!id) {
      throw new Error("No se puede actualizar un documento sin ID");
    }

    const docRef = doc(db, resource, id);
    
    // 1. Verificar que el documento existe
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`Documento ${id} no encontrado en ${resource}`);
    }

    // 2. Preparar datos para actualización
    const updateData = { ...data };
    
    // Manejo especial para arrays (como team)
    if (resource === 'projects' && data.team) {
      if(Array.isArray(data.team) && data.team.length === 0) {
        delete updateData.team; // Eliminar el campo team si está vacío
      }else {updateData.team = data.team;}
      // updateData.team = Array.isArray(data.team) && data.team.length == 0 ?  : delete updateData.team;
    }

    // 3. Actualizar documento
    await updateDoc(docRef, updateData);
    
    // 4. Retornar datos actualizados (incluyendo el ID)
    return { 
      data: { 
        ...previousData, // Datos anteriores
        ...updateData,  // Nuevos datos
        id              // ID del documento
      } 
    };

  } catch (error) {
    console.error(`Error al actualizar ${resource}/${id}:`, error);
    throw new Error(`Error de actualización: ${error.message}`);
  }
  },

  create: async (resource, { data }) => {
    await delay(300);

    if(Array.isArray(data.team) && data.team.length === 0) {
      delete data.team; // Eliminar el campo team si está vacío
    }

    const docRef = await addDoc(collection(db, resource), {
      ...data,
      leader: user.uid, // Asignar el ID del docente como líder
    });
    return { data: { id: docRef.id, ...data, leader: user.uid } };
  }
});

export default DataProviderDocente;