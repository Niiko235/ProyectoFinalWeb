import { Create, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput } from 'react-admin';
import { useAuth } from '../../Context/authContext'; // Asegúrate de importar correctamente
import { useEffect, useState } from 'react';


const docenteProyectosCrear = () => {

  // useEffect(() => {
  //   if (user) {
  //     setInitialValues({
  //       docenteId: user.id, // Asegúrate que `user.id` esté disponible en tu authContext
  //     });
  //   }
  // }, [user]);

  // if (!initialValues) return null; // o un loading spinner

  return (

    <Create>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="area" />
        <TextInput multiline source="goals" />
        {/* <TextInput multiline source="cronograma" /> */}
        <TextInput source="price" />
        <TextInput source="institution" />

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