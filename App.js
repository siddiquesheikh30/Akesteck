import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/Screens/HomePage';
import SplashScreen from './src/Screens/SplashScreen';
import ProductDetails from './src/Screens/ProductsDetails';
import Categories from './src/Screens/Categories';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetails} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Categories" component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
