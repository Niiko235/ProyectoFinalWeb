import { Create, SimpleForm, TextInput, DateInput, ReferenceInput, 
    SelectInput, ReferenceArrayInput, SelectArrayInput, required,  
    Edit} from 'react-admin';

const docenteUsuarioEdit = () => (
  <Edit title="Editar Usuario">
    <SimpleForm>
      <TextInput source="nombre" />
      <TextInput source="apellido" />
      <TextInput source="documento" validate={required()} />
      <TextInput source="correo" validate={required()} />
      <TextInput source="telefono" />
      <TextInput source="usuario" validate={required()}/>
      <TextInput source="contraseña" validate={required()}/>
      <SelectInput
        source="rol"
        choices={[
          { id: '1', name: 'Estudiante' },
          { id: '2', name: 'Docente' },
        ]}
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);

export default docenteUsuarioEdit ;