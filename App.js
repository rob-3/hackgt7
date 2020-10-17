import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Map from './src/components/Map.js';
import Login from './src/components/Login.js';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: true
          }}
        >
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
