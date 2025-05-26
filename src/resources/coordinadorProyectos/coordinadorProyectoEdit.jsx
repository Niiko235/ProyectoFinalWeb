import HistorialModal from '../../Components/HistoriaModal/HistorialModal';
import { Edit, SimpleForm, TextInput, SelectInput, required} from 'react-admin';

const coordinadorProyectoEdit = () => (
  <Edit title="Cambiar estado del proyecto">
    <SimpleForm>
      <SelectInput
        source="status"
        choices={[
          { id: 'Formulacion', name: 'Formulacion' },
          { id: 'Evaluacion', name: 'Evaluacion' },
          { id: 'Activo', name: 'Activo' },
          { id: 'Inactivo', name: 'Inactivo' },
          { id: 'Finalizado', name: 'Finalizado' },
        ]}
        validate={required()}
      />
      <TextInput multiline source="observaciones" />
    </SimpleForm>
  </Edit>
);

export default coordinadorProyectoEdit;
