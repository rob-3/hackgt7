import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Map from './src/components/Map.js';
import Login from './src/components/Login.js';
import Accounts from './src/components/Accounts.js';
import Report from './src/components/Report.js';

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();


class HomeScreen extends Component {
  render() {
    return (
      <TopTab.Navigator
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ focused, color, size }) => {
        //     let iconName;

        //     if (route.name === 'Home') {
        //       iconName = focused
        //         ? 'ios-information-circle'
        //         : 'ios-information-circle-outline';
        //     } else if (route.name === 'Settings') {
        //       iconName = focused ? 'ios-list-box' : 'ios-list';
        //     }

        //     // You can return any component that you like here!
        //     return <Ionicons name={iconName} size={size} color={color} />;
        //   },
        // })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          style: {
            height: 75,
            display: 'flex',
            justifyContent: 'flex-end'
          }
        }}>
        <TopTab.Screen name="Map" component={Map} />
        <TopTab.Screen name="Accounts" component={Accounts} />
        <BottomTab.Screen name="Report" component={Report} />
      </TopTab.Navigator>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTab.Navigator
          screenOptions={{
            headerShown: true
          }}
        >
          <BottomTab.Screen name="Home" component={HomeScreen} />
          <BottomTab.Screen name="Login" component={Login} />
        </BottomTab.Navigator>
      </NavigationContainer>
    );
  }
}
