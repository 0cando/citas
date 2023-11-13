import React from 'react';
import {useState} from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Formulario from './src/Components/Formulario';
import Paciente from './src/Components/Paciente';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  const exitFormulario = () => {
    setModalVisible(false);
  };

  const editarPaciente = (id: any) => {
    const nuevoPaciente = pacientes.filter(pacienteE => pacienteE.id === id);
    setPaciente(nuevoPaciente[0]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Administrador de citas</Text>
      <Text style={styles.tituloBold}>Veterinaria</Text>

      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.btnNuevaCita}>
        <Text style={styles.btnCitaText}>Nueva Cita</Text>
      </Pressable>

      <Formulario
        modalVisible={modalVisible}
        styles={styles}
        btnExit={exitFormulario}
        setModalVisible={setModalVisible}
        setPaciente={setPacientes}
        pacientes={pacientes}
        pacienteObj={paciente}
      />

      {pacientes.length === 0 ? (
        <Text style={styles.noHayPacientesText}>No hay pacientes</Text>
      ) : (
        <FlatList
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                editarPaciente={editarPaciente}
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    fontSize: 35,
    color: '#777',
    fontWeight: 'bold',
    marginTop: 20,
  },
  tituloBold: {
    fontWeight: '600',
    color: '#c603fc',
    textAlign: 'center',
    fontSize: 35,
  },
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  btnNuevaCita: {
    padding: 20,
    backgroundColor: '#8e62f5',
    marginTop: 25,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  btnCitaText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noHayPacientesText: {
    marginVertical: 40,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '300',
  },
  hayPacientesText: {
    marginVertical: 40,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '300',
  },
});

export default App;
