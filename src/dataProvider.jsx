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
      docenteId: 3,
      observaciones: "Primera etapa completada",
      estado: "Activo",
      team: [{
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
      }, {
        id: 2,
        nombre: "Ana",
        apellido: "García",
      }]
    },
    {
      id: 2,
      titulo: "Robótica escolar",
      area: "Tecnología",
      objetivos: "Diseñar un robot para competencias",
      cronograma: "Abril - Julio 2025",
      presupuesto: "800000",
      institucion: "I.E. Moderna",
      docenteId: 4,
      observaciones: "A la espera de aprobación",
      estado: "Formulación",
      team: [{
        id: 2,
        nombre: "AnA",
        apellido: "Pérez",
      }]
    }
  ],
  usuarios: [
    {
      id: 1, nombre: "Cristian",
      apellido: "Aristizabal",
      documento: 1006511397,
      correo: "cristianalejo2407@gmail.com",
      telefono: 3143924897,
      usuario: "cristian",
      contraseña: "1234",
      rol: "Estudiante"
    },
    {
      id: 2, nombre: "Carlos",
      apellido: "Pérez",
      documento: 1025487632,
      correo: "carlos@edu.com",
      telefono: 3114456789,
      usuario: "cperez",
      contraseña: "docente123",
      rol: "Estudiante"
    },
    {
      id: 3, nombre: "Laura",
      apellido: "Gómez",
      documento: 1002233445,
      correo: "laura@edu.com",
      telefono: 3123345566,
      usuario: "lgomez",
      contraseña: "laura2024",
      rol: "Docente"
    },
    {
      id: 4, nombre: "Diana",
      apellido: "Rodríguez",
      documento: 1098765432,
      correo: "diana@edu.com",
      telefono: 3137788990,
      usuario: "drodriguez",
      contraseña: "coord456",
      rol: "Docente"
    },
    {
      id: 5, nombre: "José",
      apellido: "Martínez",
      documento: 1054321876,
      correo: "jose@edu.com",
      telefono: 3109988776,
      usuario: "jmartinez",
      contraseña: "est123",
      rol: "Estudiante"
    },
    {
      id: 6, nombre: "Ana",
      apellido: "Ruiz",
      documento: 1045678901,
      correo: "ana@edu.com",
      telefono: 3176655443,
      usuario: "aruiz",
      contraseña: "ana456",
      rol: "Estudiante"
    }
  ]
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dataProvider = {

  getList: async (resource, params) => {
    await delay(300);

    // Filtrar estudiantes
    if (resource === "estudiantes") {
      const estudiantes = data.usuarios.filter(u => u.rol === "estudiante");
      return { data: estudiantes, total: estudiantes.length };
    }

    // Filtrar docentes
    if (resource === "docentes") {
      const docentes = data.usuarios.filter(u => u.rol === "docente");
      return { data: docentes, total: docentes.length };
    }

    // Si es un recurso general
    if (data[resource]) {
      let items = data[resource];
      const filter = params?.filter || {};

      // Aplicar filtros personalizados
      if (resource === "proyectos") {
        if (filter.titulo) {
          const keywords = filter.titulo.toLowerCase().split(' ');

          items = items.filter(p => {
            const texto = `${p.titulo} ${p.objetivos} ${p.area} ${p.institucion}`.toLowerCase();
            return keywords.every(kw => texto.includes(kw));
          });
        }

        if (filter.institucion) {
          items = items.filter(p =>
            p.institucion.toLowerCase().includes(filter.institucion.toLowerCase())
          );
        }

        if (filter.estado) {
          items = items.filter(p => p.estado === filter.estado);
        }

        if (filter.teamId) {
          items = items.filter(p =>
            p.team.some(miembro => miembro.id === Number(filter.teamId))
          );
        }

        // if (filter.docenteId) {
        //   if (filter.teamId) {
        //     items = items.filter(p =>
        //       p.team.some(miembro => miembro.id === Number(filter.teamId))
        //     );
        //   }
        // }
      }


      return { data: items, total: items.length };
    }

    // Recurso no reconocido
    return { data: [], total: 0 };
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
