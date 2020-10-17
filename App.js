import React, { Component, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './src/components/Map.js';
import Login from './src/components/Login.js';
import Accounts from './src/components/Accounts.js';
import Report from './src/components/Report.js';
import User from './src/utils/User.js';
import Profile from './src/components/Profile.js';
import SignUp from './src/components/SignUp';
import { set } from 'react-native-reanimated';

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();


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
          activeTintColor: '#469F3D',
          inactiveTintColor: '#000000',
          indicatorStyle: {
            backgroundColor: '#469D3D'
          },
          style: {
            height: 75,
            display: 'flex',
            justifyContent: 'flex-end'
          }
        }}>
        <TopTab.Screen name="Map" component={Map} />
        <TopTab.Screen name="Accounts" component={Accounts} />
      </TopTab.Navigator>
    );
  }
}

export default App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      let res = await User.get();
      setUser(JSON.parse(res));
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {user ? (
          <Stack.Screen name="AuthorizedApp" children={(props) => (
            <BottomTab.Navigator {...props}>
              <BottomTab.Screen name="Home" children={(props) => <HomeScreen {...props} />} />
              <BottomTab.Screen name="Profile" children={(props) => <Profile {...props} setUser={setUser}/>} />
              <BottomTab.Screen name="Report" component={Report} />
            </BottomTab.Navigator>
          )}>
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="LogIn" children={(props) => <Login {...props} setUser={setUser} />}>
            </Stack.Screen>
            <Stack.Screen name="SignUp" children={(props) => <SignUp {...props} setUser={setUser} />}>
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
