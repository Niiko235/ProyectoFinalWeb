import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from 'react-admin';

const UsuarioList = () => (
  <List>
    <Datagrid>
      <TextField source="nombre" />
      <TextField source="rol" />
      <EmailField source="correo" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default UsuarioList;