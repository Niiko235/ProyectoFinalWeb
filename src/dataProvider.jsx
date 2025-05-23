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
    { id: 3, nombre: "Diana Rodríguez", rol: "coordinador", correo: "diana@edu.com" }
  ]
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dataProvider = {
  getList: async (resource) => {
    await delay(300);
    return {
      data: data[resource],
      total: data[resource].length,
    };
  },

  getOne: async (resource, { id }) => {
    await delay(200);
    return {
      data: data[resource].find(item => item.id === id),
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

  getMany: async (resource, { ids }) => {
    return {
      data: data[resource].filter(item => ids.includes(item.id)),
    };
  },

  getManyReference: async () => {
    return { data: [], total: 0 }; // puedes ampliar esto si necesitas relaciones
  }
};

export default dataProvider;
