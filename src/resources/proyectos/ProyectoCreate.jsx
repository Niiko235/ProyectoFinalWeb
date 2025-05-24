import { Create, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput } from 'react-admin';

const ProyectoCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="titulo" />
      <TextInput source="area" />
      <TextInput multiline source="objetivos" />
      <TextInput multiline source="cronograma" />
      <TextInput source="presupuesto" />

      <ReferenceInput source="docenteId" reference="docentes">
        <SelectInput optionText="nombre" />
      </ReferenceInput>
      <TextInput source="institucion" />

    </SimpleForm>
  </Create>
);

export default ProyectoCreate;