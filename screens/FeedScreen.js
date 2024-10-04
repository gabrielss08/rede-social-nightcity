import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DATA = [
  {
    id: '1',
    username: 'Rebecca',
    profilePic: require('../assets/rebecca.jpeg'),
    text: 'Meus novos brinquedinhos',
    image: require('../assets/post.jpg'),
    likes: 0,
    comments: [],
  },
  {
    id: '2',
    username: 'lucy',
    profilePic: require('../assets/lucy.jpeg'),
    text: '3 meses juntos <3',
    image: require('../assets/post1.jpg'),
    likes: 0,
    comments: [],
  },
  {
    id: '3',
    username: 'David',
    profilePic: require('../assets/david.jpeg'),
    text: 'Treino hoje rendeu familia :P',
    image: require('../assets/post2.jpg'),
    likes: 0,
    comments: [],
  },
];

const FeedScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [data, setData] = useState(DATA);

  const handleLike = (id) => {
    const newData = data.map(post => {
      if (post.id === id) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setData(newData);
  };

  const handleComment = (id, commentText) => {
    if (commentText.trim() === '') return;
    const newData = data.map(post => {
      if (post.id === id) {
        return {
          ...post,
          comments: [...post.comments, { text: commentText, username: 'Você' }],
        };
      }
      return post;
    });
    setData(newData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })}>
        <View style={styles.postHeader}>
          <Image source={item.profilePic} style={styles.profilePic} />
          <Text style={styles.username}>
            {item.username === user.username ? 'Você' : item.username}
          </Text>
          {item.verified && <Icon name="checkmark-circle" size={16} color="blue" style={styles.verifiedIcon} />}
        </View>
        <Text style={styles.postText}>{item.text}</Text>
        <Image source={item.image} style={styles.postImage} />
      </TouchableOpacity>
      <View style={styles.interaction}>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          <Text style={styles.likeButton}>Curtir ({item.likes})</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Adicione um comentário..."
          style={styles.commentInput}
          onSubmitEditing={({ nativeEvent }) => {
            handleComment(item.id, nativeEvent.text);
          }}
        />
      </View>
      <View>
        {item.comments.map((comment, index) => (
          <Text key={index} style={styles.commentText}>
            <Text style={styles.commentUsername}>{comment.username}:</Text> {comment.text}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Feed</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate('CreatePost', { setData })}
        >
          <Icon name="add" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userButton}
          onPress={() => navigation.navigate('Users', { user, userPosts: data })}
        >
          <Icon name="person" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#fff' },
  post: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center' },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: { fontWeight: 'bold' },
  verifiedIcon: { marginLeft: 5 },
  postText: { marginVertical: 10 },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  interaction: { marginTop: 10 },
  likeButton: { color: '#050A0E', marginBottom: 10 },
  commentInput: {
    borderColor: '#FCEE09',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  commentText: { marginTop: 5, fontStyle: 'italic' },
  commentUsername: { fontWeight: 'bold' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  floatingButton: {
    backgroundColor: '#FF003C',
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
  },
  userButton: {
    backgroundColor: '#00F0FF',
    borderRadius: 30,
    padding: 10,
  },
});

export default FeedScreen;
