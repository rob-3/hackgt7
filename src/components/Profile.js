import React, { useEffect } from 'react';
import { Button, View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Profile = ({user, setUser}) => {
  const logOut = async () => {
    console.log(user, setUser);
    setUser(null);
    await AsyncStorage.removeItem('User');
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Log out" onPress={logOut}/>
    </View>
  );
};

export default Profile;