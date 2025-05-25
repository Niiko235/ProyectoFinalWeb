import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from 'react-admin';

const docenteUsuarioList = () => (
  <List>
    <Datagrid>
      <TextField source="nombre" />
      <TextField source="apellido" />
      <TextField source="documento" />
      <TextField source="rol" />
      <EmailField source="correo" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default docenteUsuarioList;