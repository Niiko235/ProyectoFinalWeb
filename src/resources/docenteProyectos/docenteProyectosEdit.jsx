import { Edit, SimpleForm, TextInput, required, ReferenceArrayInput, SelectArrayInput } from 'react-admin';
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
                >
                    <SelectArrayInput
                        optionText={user => `${user.names} ${user.lastnames} (${user.dni})`}
                    />
                </ReferenceArrayInput>
            </SimpleForm>
            <HistorialModal
                open={modalOpen}
                onClose={cerrarModal}
            />
        </Edit>
    );
};

export default docenteProyectosEdit;
