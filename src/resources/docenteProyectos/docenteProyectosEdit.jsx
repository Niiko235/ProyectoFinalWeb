// src/resources/proyectos/ProyectoEdit.jsx

import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, DateInput, required, ReferenceArrayInput, SelectArrayInput } from 'react-admin';

const docenteProyectosEdit = () => (
    <Edit title="Editar Proyecto">
        <SimpleForm>
            <TextInput disabled source="id" />

            <TextInput source="title" validate={required()} />
            <TextInput source="area" />
            <TextInput multiline source="goals" />
            {/* <TextInput multiline source="cronograma" /> */}
            {/* <TextInput source="presupuesto" /> */}
            <TextInput source="institution" />
            {/* <ReferenceArrayInput
                label="Estudiantes"
                source="estudiantesIds"
                reference="estudiantes"
            >
                <SelectArrayInput optionText="nombre" />
            </ReferenceArrayInput> */}
        </SimpleForm>
    </Edit>
);

export default docenteProyectosEdit;
