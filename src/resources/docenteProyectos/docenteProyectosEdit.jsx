// src/resources/proyectos/ProyectoEdit.jsx

import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, DateInput, required, ReferenceArrayInput, SelectArrayInput } from 'react-admin';

const docenteProyectosEdit = () => (
    <Edit title="Editar Proyecto">
        <SimpleForm>
            {/* <TextInput disabled source="id" /> */}

            <TextInput source="title" validate={required()} />
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
                // parse={value => value || []}
                // format={value => value || []}
                // queryOptions={{
                //     enabled: true,
                //     refetchOnMount: "always" // Fuerza recarga completa
                // }}
            >
                <SelectArrayInput
                    optionText={user => `${user.names} ${user.lastnames} (${user.dni})`}
                    // disableCloseOnSelect
                    // resettable
                    // limitChoicesToValue={false} // ¡Esto evita el filtrado!
                    // filterToQuery={() => ({})} // Elimina cualquier filtrado interno
                    // sx={{ width: '100%' }}
                />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);

export default docenteProyectosEdit;
