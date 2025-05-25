import { Create, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput, 
    ReferenceArrayInput, SelectArrayInput, required, 
    NumberInput} from 'react-admin';

const docenteUsuarioCreate = () => (
  <Create title="Crear Usuario">
    <SimpleForm>
      <TextInput source="names" validate={required()} />
      <TextInput source="lastnames" validate={required()} />
      <NumberInput source="dni" validate={required()} min={40000000}/>
      <TextInput source="email" validate={required()} />
      <NumberInput source="phone" min={3000000000}/>
      <TextInput source="nickname" />
      <TextInput source="password" validate={required()} />
      <SelectInput
        source="rol"
        choices={[
          { id: '1', name: 'Estudiante' },
          { id: '2', name: 'Docente' },
        ]}
        validate={required()} 
      />
    </SimpleForm>
  </Create>
);

export default docenteUsuarioCreate;