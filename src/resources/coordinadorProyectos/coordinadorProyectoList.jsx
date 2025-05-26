import { List, Datagrid, TextField,
   ReferenceField, EditButton, TextInput,
   ReferenceInput, SelectInput } from 'react-admin';

const proyectoFilters = [
  <TextInput label="Buscar por título" source="titulo" alwaysOn />,
  <TextInput label="Institución" source="institucion" />,
  <ReferenceInput label="Docente" source="docenteId" reference="usuarios">
    <SelectInput optionText="nombre" />
  </ReferenceInput>,
  <SelectInput
    label="Estado"
    source="estado"
    choices={[
      { id: 'Activo', name: 'Activo' },
      { id: 'Formulación', name: 'Formulación' },
      { id: 'Evaluación', name: 'Evaluación' },
      { id: 'Finalizado', name: 'Finalizado' },
      { id: 'Inactivo', name: 'Inactivo' },
    ]}
  />
];

const coordinadorProyectoList = () => (
  <List filters={proyectoFilters} bulkActionButtons={false} title="Proyectos" >
    <Datagrid rowClick={(id) => `/admin/proyectos/${id}/vista`}>
      <TextField source="title" />
      <TextField source="area" />
      <ReferenceField source="leader" reference="users">
        <TextField source="names" />
      </ReferenceField>

      <TextField source="status" />
      <EditButton />
    </Datagrid>
  </List>
);

export default coordinadorProyectoList;
