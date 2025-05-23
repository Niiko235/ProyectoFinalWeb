// src/resources/proyectos/ProyectoEdit.jsx

import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, DateInput, required } from 'react-admin';

const ProyectoEdit = () => (
  <Edit title="Editar Proyecto">
    <SimpleForm>
      <TextInput disabled source="id" />

      <TextInput source="titulo" validate={required()} />
      <TextInput source="area" />
      <TextInput multiline source="objetivos" />
      <TextInput multiline source="cronograma" />
      <TextInput source="presupuesto" />
      <TextInput source="institucion" />

      {/* Referencia al docente que lo creó */}
      <ReferenceInput source="docenteId" reference="usuarios">
        <SelectInput optionText="nombre" />
      </ReferenceInput>

      {/* Observaciones o estado actual */}
      <TextInput multiline source="observaciones" />
      <SelectInput 
        source="estado"
        choices={[
          { id: 'Formulación', name: 'Formulación' },
          { id: 'Evaluación', name: 'Evaluación' },
          { id: 'Activo', name: 'Activo' },
          { id: 'Inactivo', name: 'Inactivo' },
          { id: 'Finalizado', name: 'Finalizado' },
        ]}
      />
    </SimpleForm>
  </Edit>
);

export default ProyectoEdit;
