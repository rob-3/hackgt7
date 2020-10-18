import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View, Text } from 'react-native';
import Maps from './src/components/Maps.js';
import Login from './src/components/Login.js';
import Accounts from './src/components/Accounts.js';
import Report from './src/components/Report.js';
import User from './src/utils/User.js';
import Profile from './src/components/Profile.js';
import SignUp from './src/components/SignUp';
import { HomeIcon } from './src/icons/HomeIcon';
import { ProfileIcon } from './src/icons/ProfileIcon';
import { SpeakerIcon } from './src/icons/SpeakerIcon';
import API from './src/utils/API';

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();


const HomeScreen = ({fraudulentTransactions}) => {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#469F3D',
        inactiveTintColor: '#3C3C43',
        indicatorStyle: {
          backgroundColor: '#469D3D'
        },
        style: {
          display: 'flex',
          justifyContent: 'flex-end'
        }
      }}>
      <TopTab.Screen name="Map">
        {props => <Maps {...props} fraudulentTransactions={fraudulentTransactions}/>}
      </TopTab.Screen>
      <TopTab.Screen name="Accounts" component={Accounts} />
    </TopTab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser();
  }, []);

  const [transactions, setTransactions] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const { data }= await API.getTransactions(105);
        setTransactions(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const fetchUser = async () => {
    try {
      let res = await User.get();
      setUser(JSON.parse(res));
    } catch (e) {
      console.log(e.message);
    }
  };

  const [fraudulentTransactions, setFraudulentTransactions] = useState(null);
  const updateMap = async () => {
    const { data } = await API.getFraudulentTransactions();
    setFraudulentTransactions(data);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitle: (
          <View>
            <Image source={require('./src/icons/NCRLogo.png')} style={{
              flex: 1,
              height: 30,
              width: 30,
              resizeMode: 'contain'
            }}/>
          </View>
        )
      }}
      >
        {user ? (
          <Stack.Screen name="AuthorizedApp" children={(props) => (
            <BottomTab.Navigator {...props} tabBarOptions={{
              activeTintColor: '#469F3D',
              inactiveTintColor: '#3C3C43',
              indicatorStyle: {
                backgroundColor: '#469D3D'
              },
            }}>
              <BottomTab.Screen name="Home" children={(props) => <HomeScreen {...props} fraudulentTransactions={fraudulentTransactions}/>} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <HomeIcon color={color} />
                ),
              }}/>
              <BottomTab.Screen name="Profile" children={(props) => <Profile {...props} setUser={setUser}/>} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                  <ProfileIcon color={color} />
                ),
              }}/>
              <BottomTab.Screen name="Report" options={{
                tabBarLabel: 'Report',
                tabBarIcon: ({ color, size }) => (
                  <SpeakerIcon color={color} />
                ),
              }}>
                {props => <Report {...props} transactions={transactions} cb={updateMap} />}
              </BottomTab.Screen>
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
