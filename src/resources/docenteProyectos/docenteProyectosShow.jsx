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


            {/* Mostrar nombre del docente usando la referencia */}
            <ReferenceField
                label="Docente Responsable"
                source="docenteId"
                reference="usuarios"
            >
                <TextField source="nombre" />
            </ReferenceField>

            <TextField source="observaciones" />

            {/* Estado con etiqueta visual */}
            <ChipField source="estado" />
        </SimpleShowLayout>
    </Show>
);

export default docenteProyectosShow;
