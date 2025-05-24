// src/dataProvider.js

const data = {
  proyectos: [
    {
      id: 1,
      titulo: "Proyecto Energía Solar",
      area: "Ciencias",
      objetivos: "Investigar el uso de energía solar en zonas rurales",
      cronograma: "Marzo - Junio 2025",
      presupuesto: "500000",
      institucion: "I.E. Central",
      docenteId: 1,
      observaciones: "Primera etapa completada",
      estado: "Activo"
    },
    {
      id: 2,
      titulo: "Robótica escolar",
      area: "Tecnología",
      objetivos: "Diseñar un robot para competencias",
      cronograma: "Abril - Julio 2025",
      presupuesto: "800000",
      institucion: "I.E. Moderna",
      docenteId: 2,
      observaciones: "A la espera de aprobación",
      estado: "Formulación"
    }
  ],
  usuarios: [
    { id: 1, nombre: "Carlos Pérez", rol: "docente", correo: "carlos@edu.com" },
    { id: 2, nombre: "Laura Gómez", rol: "docente", correo: "laura@edu.com" },
    { id: 3, nombre: "Diana Rodríguez", rol: "coordinador", correo: "diana@edu.com" },
    { id: 4, nombre: "José Martínez", rol: "estudiante", correo: "jose@edu.com" },
    { id: 5, nombre: "Ana Ruiz", rol: "estudiante", correo: "ana@edu.com" }
  ]
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dataProvider = {
  
  getList: async (resource) => {
    await delay(300);

    if (resource === "estudiantes") {
      const estudiantes = data.usuarios.filter(u => u.rol === "estudiante");
      return { data: estudiantes, total: estudiantes.length };
    }

    if (resource === "docentes") {
      const docentes = data.usuarios.filter(u => u.rol === "docente");
      return { data: docentes, total: docentes.length };
    }

    if (data[resource]) {
      return { data: data[resource], total: data[resource].length };
    }
  },

  getOne: async (resource, { id }) => {
    await delay(200);

    if (resource === "estudiantes") {
      const estudiante = data.usuarios.find(u => u.rol === "estudiante" && u.id === Number(id));
      if (!estudiante) throw new Error('No encontrado');
      return { data: estudiante };
    }

    if (resource === "docentes") {
      const docente = data.usuarios.find(u => u.rol === "docente" && u.id === Number(id));
      if (!docente) throw new Error('No encontrado');
      return { data: docente };
    }

    const found = data[resource]?.find(item => item.id === Number(id));
    if (!found) throw new Error('Elemento no encontrado');
    return { data: found };
  },

  getMany: async (resource, { ids }) => {
    await delay(100);

    if (resource === "estudiantes") {
      const estudiantes = data.usuarios.filter(u => u.rol === "estudiante" && ids.includes(u.id));
      return { data: estudiantes };
    }

    if (resource === "docentes") {
      const docentes = data.usuarios.filter(u => u.rol === "docente" && ids.includes(u.id));
      return { data: docentes };
    }

    return {
      data: data[resource]?.filter(item => ids.includes(item.id)) || []
    };
  },

  create: async (resource, { data: newData }) => {
    await delay(300);
    const id = Math.max(...data[resource].map(i => i.id)) + 1;
    const created = { ...newData, id };
    data[resource].push(created);
    return { data: created };
  },

  update: async (resource, { id, data: updatedData }) => {
    await delay(300);
    const index = data[resource].findIndex(item => item.id === id);
    data[resource][index] = { ...updatedData, id };
    return { data: data[resource][index] };
  },

  delete: async (resource, { id }) => {
    await delay(200);
    data[resource] = data[resource].filter(item => item.id !== id);
    return { data: { id } };
  },

  getManyReference: async () => {
    return { data: [], total: 0 }; // puedes ampliar esto si necesitas relaciones
  }
};

export default dataProvider;
