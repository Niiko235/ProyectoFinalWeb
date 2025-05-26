import {
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    RichTextField,
    ReferenceField,
    ChipField
} from 'react-admin';

const docenteProyectosShow = () => (
    <Show title="Detalle del Proyecto">
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="titulo" label="Título del Proyecto" />
            <TextField source="area" />
            <TextField source="objetivos" />
            <TextField source="cronograma" />
            <TextField source="presupuesto" />
            <TextField source="institucion" />
            <ReferenceField
                label="Docente Responsable"
                source="docenteId"
                reference="usuarios"
            >
                <TextField source="nombre" />
            </ReferenceField>
            <TextField source="observaciones" />
            <ChipField source="estado" />
        </SimpleShowLayout>
    </Show>
);

export default docenteProyectosShow;
