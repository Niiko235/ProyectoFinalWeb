import { Create, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput } from 'react-admin';
import { useAuth } from '../../Context/authContext'; // Asegúrate de importar correctamente
import { useEffect, useState } from 'react';


const docenteProyectosCrear = () => {

  useEffect(() => {
    if (user) {
      setInitialValues({
        docenteId: user.id, // Asegúrate que `user.id` esté disponible en tu authContext
      });
    }
  }, [user]);

  if (!initialValues) return null; // o un loading spinner

  return (

    <Create>
      <SimpleForm>
        <TextInput source="titulo" />
        <TextInput source="area" />
        <TextInput multiline source="objetivos" />
        <TextInput multiline source="cronograma" />
        <TextInput source="presupuesto" />
        <TextInput source="institucion" />

        <ReferenceArrayInput
          label="Estudiantes"
          source="estudiantesIds"
          reference="estudiantes"
        >
          <SelectArrayInput optionText="nombre" />
        </ReferenceArrayInput>

      </SimpleForm>
    </Create>
  );
};

export default docenteProyectosCrear;