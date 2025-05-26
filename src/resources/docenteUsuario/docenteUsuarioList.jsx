import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from 'react-admin';

const docenteUsuarioList = () => (
  <List>
    <Datagrid>
      <TextField source="names" />
      <TextField source="lastnames" />
      <TextField source="dni" />
      <TextField source="rol" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default docenteUsuarioList;