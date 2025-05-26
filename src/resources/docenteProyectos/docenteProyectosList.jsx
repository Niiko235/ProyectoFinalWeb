import { List, Datagrid, TextField, EditButton } from 'react-admin';

const docenteProyectosList = () => (
  <List>
    <Datagrid rowClick={(id) => `/docente/proyects/${id}/vista`}>
      <TextField source="title" />
      <TextField source="area" />
      <TextField source="status" />
      <EditButton />
    </Datagrid>
  </List>
);

export default docenteProyectosList;
