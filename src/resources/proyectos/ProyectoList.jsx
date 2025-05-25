import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';

const ProyectoList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="titulo" />
      <TextField source="area" />
      <ReferenceField source="docenteId" reference="docentes" />
      <TextField source="estado" />
      <EditButton />
    </Datagrid>
  </List>
);

export default ProyectoList;
