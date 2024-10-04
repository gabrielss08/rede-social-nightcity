import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const SettingsScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [username, setUsername] = useState(user.username);

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Nome de Usuário"/>
      <Button title="Salvar Alterações" onPress={handleSave} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, margin: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  input: {
    height: 40,
    borderColor: '#FCEE09',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default SettingsScreen;
