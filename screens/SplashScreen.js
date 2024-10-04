import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const timer = setTimeout(() => {
    navigation.replace('Login');
  }, 3000);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo (2).png')} style={styles.logo} />
      <Text style={[styles.title]}>
        Night city
      </Text>
    </View>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
  logo: { width: 500, height: 150, marginBottom: 20 },
  title: {
    fontSize: 32,
    color: '#00F0FF',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default SplashScreen;
