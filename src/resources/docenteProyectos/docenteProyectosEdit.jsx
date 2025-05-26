// src/resources/proyectos/ProyectoEdit.jsx

import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, DateInput, required, ReferenceArrayInput, SelectArrayInput } from 'react-admin';
import HistorialModal from '../../Components/HistoriaModal/HistorialModal';
import Button from '@mui/material/Button';
import { useState } from 'react';


const docenteProyectosEdit = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const abrirModal = () => setModalOpen(true);
    const cerrarModal = () => setModalOpen(false);

    return (
        <Edit title="Editar Proyecto">
            <SimpleForm>
                {/* <TextInput disabled source="id" /> */}

                <TextInput source="title" validate={required()} label='Titulo' />
                <TextInput source="area" label='Area' />
                <TextInput multiline source="goals" label='Objetivos' />
                <TextInput multiline source="descripcion" label='Descripcion' />
                <TextInput source="price" label='Presupuesto' />
                <TextInput source="institution" label='Institucion' />
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
                <Button variant="contained" onClick={abrirModal} sx={{ mt: 2 }}>
                    Ver Historial de Estados
                </Button>
            </SimpleForm>

            {/* Modal con historial */}
            <HistorialModal
                open={modalOpen}
                onClose={cerrarModal}
            />
        </Edit>
    );
};

export default docenteProyectosEdit;
