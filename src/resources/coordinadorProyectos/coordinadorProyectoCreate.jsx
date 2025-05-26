import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput} from 'react-admin';

const coordinadorProyectoCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label = 'Titulo'/>
      <TextInput source="area" label = 'Area'/>
      <TextInput multiline source="goals"  label='Objetivos'/>
      <TextInput multiline source="descripcion" label='Descripcion' />
      <TextInput source="price" label='Presupuesto' />
      <TextInput source="institution" label='Institucion'/>

      <ReferenceInput 
        label='Lider del proyecto'
        source="leader"
        reference="users" 

        filter={{ rol: "profesor" }}
        >
        <SelectInput optionText={user => `${user.names} ${user.lastnames} (${user.dni})`} />
      </ReferenceInput>
      <TextInput source="institution" label = 'Institucion' />

    </SimpleForm>
  </Create>
);

export default coordinadorProyectoCreate;