import { SimpleForm, TextInput, 
    SelectInput, required,  
    Edit} from 'react-admin';

const docenteUsuarioEdit = () => (
  <Edit title="Editar Usuario">
    <SimpleForm>
      <TextInput source="names" />
      <TextInput source="lastnames" />
      <TextInput source="dni" validate={required()} />
      <TextInput source="phone" />
      <TextInput source="nickname" validate={required()}/>
      <SelectInput
        source="rol"
        choices={[
          { id: '1', name: 'estudiante' },
          { id: '2', name: 'profesor' },
        ]}
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);

export default docenteUsuarioEdit ;