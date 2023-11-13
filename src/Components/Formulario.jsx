/* eslint-disable prettier/prettier */
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';

const Formulario = props => {
  const [paciente, setPaciente] = useState('');
  const [id, setId] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect( () => {
    if (Object.keys(props.pacienteObj).length > 0){
      setPaciente(props.pacienteObj.paciente);
      setId(props.pacienteObj.id);
      setPropietario(props.pacienteObj.propietario);
      setEmail(props.pacienteObj.email);
      setTelefono(props.pacienteObj.telefono);
      setSintomas(props.pacienteObj.sintomas);
      setFecha(props.pacienteObj.fecha);
    }
  }, [props.pacienteObj]);

  const handleCita = () => {
    if ([paciente, propietario, email, fecha, sintomas].includes('')){
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios.',
      );
      return;
    }
    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };
    if (id){
      nuevoPaciente.id = id;
      const pacientesActualizados = props.pacientes.map( pacienteState =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState);
        props.setPaciente(pacientesActualizados);
    } else {
      nuevoPaciente.id = Date.now();
      props.setPaciente([...props.pacientes, nuevoPaciente]);
    }
    props.setModalVisible(false);
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');
  };


  return (
    <Modal animationType="slide" visible={props.modalVisible}>
      <View style={style.contenido}>
        <ScrollView>
          <Text style={style.titulo}>
            Nueva {''}
            <Text>Cita</Text>
          </Text>

          <Pressable style={style.btnCancelar} onLongPress={() => props.setModalVisible(false)}>
            <Text style={style.btnCancelarText}>Cancelar</Text>
          </Pressable>

          <View style={style.campo}>
            <Text style={style.label}>Nombre Paciente</Text>
            <TextInput
              style={style.input}
              placeholder="Captain, Dobby"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={style.campo}>
            <Text style={style.label}>Nombre Propietario</Text>
            <TextInput
              style={style.input}
              placeholder="John Doe..."
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={style.campo}>
            <Text style={style.label}>Email Propietario</Text>
            <TextInput
              style={style.input}
              placeholder="somebody@mail.com"
              placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={style.campo}>
            <Text style={style.label}>Telefono Propietario</Text>
            <TextInput
              style={style.input}
              placeholder="555-5555"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              value={telefono}
              onChangeText={setTelefono}
              maxLength={11}
            />
          </View>

          <View style={style.campo}>
            <Text style={style.label}>Fecha Alta</Text>
            <View style={style.contenedorFecha}>
              <DatePicker
                date={fecha}
                locale="es"
                onDateChange={ (date) => setFecha(date)}/>
            </View>
          </View>

          <View style={style.campo}>
            <Text style={style.label}>Sintomas</Text>
            <TextInput
              style={[style.input, style.sintomasInput]}
              placeholder="He feels kinda down, do not want to eat"
              placeholderTextColor={'#666'}
              keyboardType="default"
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable
            style={style.btnAgregarPaciente}
            onPress={handleCita}
          >
            <Text style={style.btnAgregarPacienteText}>
              Agregar Paciente
            </Text>
          </Pressable>

        </ScrollView>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 30,
  },
  contenido: {
    backgroundColor: '#531157',
    padding: 20,
    flex: 1,
  },
  texto: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
  },
  sintomasInput: {
    height: 100,
  },
  contenedorFecha: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  btnCancelar: {
    padding: 15,
    backgroundColor: '#ff000070',
    borderRadius: 12,
    marginHorizontal: 50,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  btnCancelarText: {
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
  },
  btnAgregarPaciente: {
    paddingVertical: 20,
    backgroundColor: 'green',
    borderRadius: 12,
    marginHorizontal: 30,
    marginVertical: 30,
    borderWidth: 1,
    borderColor: '#fff',
  },
  btnAgregarPacienteText: {
   fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'white',
  },
});

export default Formulario;
