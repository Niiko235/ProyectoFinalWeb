import { Create, SimpleForm, TextInput, ReferenceArrayInput, SelectArrayInput } from 'react-admin';


const docenteProyectosCrear = () => {

  return (

    <Create>
      <SimpleForm>
        <TextInput source="title" label='Titulo' />
        <TextInput source="area" label='Area' />
        <TextInput multiline source="goals" label='Objetivos' />
        <TextInput multiline source="descripcion" label='Descripcion' />
        <TextInput source="price" label='Presupuesto'/>
        <TextInput source="institution" label='Institucion'/>

        <ReferenceArrayInput
          label="Estudiantes"
          source="team"
          reference="users"
          filter={{ rol: "estudiante" }}
        >
          <SelectArrayInput optionText={user => `${user.names} ${user.lastnames} (${user.dni})`} />
        </ReferenceArrayInput>

      </SimpleForm>
    </Create>
  );
};

export default docenteProyectosCrear;