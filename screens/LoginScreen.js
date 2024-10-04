import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';

const USERS = [
  { username: 'rebecca', password: '123', profilePic: require('../assets/rebecca.jpeg') },
  { username: 'lucy', password: '123', profilePic: require('../assets/lucy.jpeg') },
  { username: 'david', password: '123', profilePic: require('../assets/david.jpeg') },
];

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = USERS.find(user => user.username === username && user.password === password);
    if (user) {
      navigation.replace('Feed', { user });
    } else {
      Alert.alert('Login Inválido', 'Usuário ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo (2).png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  logo: {
    width: 500,
    height: 150,
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FCEE09',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default LoginScreen;
