import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';

const docenteProyectosList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="titulo" />
      <TextField source="area" />
      <TextField source="estado" />
      <EditButton />
    </Datagrid>
  </List>
);

export default docenteProyectosList;
