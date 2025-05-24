import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from 'react-admin';

const UsuariosList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="nombre" />
      <TextField source="rol" />
      <EmailField source="correo" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default UsuariosList;