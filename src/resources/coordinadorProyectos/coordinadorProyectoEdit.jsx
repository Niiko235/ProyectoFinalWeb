// src/resources/proyectos/ProyectoEdit.jsx

import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, DateInput, required, ReferenceArrayInput, SelectArrayInput } from 'react-admin';

const coordinadorProyectoEdit = () => (
  <Edit title="Cambiar estado del proyecto">
    <SimpleForm>
      {/* <TextInput disabled source="id" />

      <TextInput source="titulo" validate={required()} />
      <TextInput source="area" />
      <TextInput multiline source="objetivos" />
      <TextInput multiline source="cronograma" />
      <TextInput source="presupuesto" />
      <TextInput source="institucion" /> */}

      {/* Referencia al docente que lo creó */}
      {/* <ReferenceInput source="docenteId" reference="usuarios">
        <SelectInput optionText="nombre" />
      </ReferenceInput> */}

      {/* Observaciones o estado actual */}
      <SelectInput
        source="status"
        choices={[
          { id: 'Formulacion', name: 'Formulacion' },
          { id: 'Evaluacion', name: 'Evaluacion' },
          { id: 'Activo', name: 'Activo' },
          { id: 'Inactivo', name: 'Inactivo' },
          { id: 'Finalizado', name: 'Finalizado' },
        ]}
        validate={required()}
      />
      <TextInput multiline source="observaciones" />
      
      {/* <ReferenceArrayInput
        label="Estudiantes"
        source="estudiantesIds"
        reference="estudiantes"
      >
        <SelectArrayInput optionText="nombre" />
      </ReferenceArrayInput> */}
    </SimpleForm>
  </Edit>
);

export default coordinadorProyectoEdit;
