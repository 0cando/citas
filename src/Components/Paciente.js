import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';

const Paciente = ({item, setModalVisible, editarPaciente}) => {
  const {paciente, fecha, id} = item;

  const formatearFecha = varFecha => {
    const nuevaFecha = new Date(varFecha);
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return nuevaFecha.toLocaleDateString('es-ES', opciones);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Paciente:</Text>
      <Text style={styles.paciente}>{paciente}</Text>
      <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>

      <View style={styles.contenedorBotones}>
        <Pressable
          style={[styles.btn, styles.btnEditar]}
          onLongPress={() => {
            setModalVisible(true);
            editarPaciente(id);
          }}>
          <Text style={styles.btnTexto}>Editar</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnEliminar]}>
          <Text style={styles.btnTexto}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginVertical: 10,
    borderBottomColor: '#444',
    borderBottomWidth: 1.5,
  },
  label: {
    color: '#666',
    fontSize: 20,
    textTransform: 'uppercase',
    marginBottom: 5,
    fontWeight: '600',
  },
  paciente: {
    color: '#c603fc',
    fontSize: 24,
    fontWeight: '500',
  },
  fecha: {
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.7,
    color: '#c603fc',
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: '#F59E0B',
  },
  btnEliminar: {
    backgroundColor: '#EF4444',
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 12,
    color: '#FFF',
  },
});
export default Paciente;
