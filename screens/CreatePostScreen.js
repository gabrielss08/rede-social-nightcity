import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const CreatePostScreen = ({ navigation, route }) => {
  const { setData } = route.params;
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    if (!content.trim() || !image) {
      alert('Por favor, preencha o conteúdo e selecione uma imagem.');
      return;
    }

    const newPost = {
      id: Math.random().toString(),
      username: 'Você',
      profilePic: require('../assets/rebecca.jpeg'),
      text: content,
      image: { uri: image },
      likes: 0,
      comments: [],
    };


    setData(prevData => [...prevData, newPost]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Postagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o conteúdo da postagem"
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
        <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar Postagem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  picker: { height: 50, width: '100%', marginBottom: 20 },
  imageButton: {
    backgroundColor: '#00F0FF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  imageButtonText: { color: '#fff', textAlign: 'center' },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FCEE09',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: { color: '#fff', textAlign: 'center' },
});

export default CreatePostScreen;
