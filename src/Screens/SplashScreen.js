import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(NavigateToHome, 1500);
  }, []);

  NavigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image
        style={{width: 200, height: 230}}
        source={require('../assets/logo.png')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e02a52',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
