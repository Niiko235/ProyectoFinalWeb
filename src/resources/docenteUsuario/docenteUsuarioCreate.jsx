import { Create, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput, 
    ReferenceArrayInput, SelectArrayInput, required } from 'react-admin';

const docenteUsuarioCreate = () => (
  <Create title="Crear Usuario">
    <SimpleForm>
      <TextInput source="nombre" />
      <TextInput source="apellido" />
      <TextInput source="documento" validate={required()} />
      <TextInput source="correo" validate={required()} />
      <TextInput source="telefono" />
      <TextInput source="usuario" />
      <TextInput source="contraseña" />
      <SelectInput
        source="rol"
        choices={[
          { id: '1', name: 'Estudiante' },
          { id: '2', name: 'Docente' },
        ]}
      />
    </SimpleForm>
  </Create>
);

export default docenteUsuarioCreate;