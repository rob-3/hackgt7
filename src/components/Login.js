import React, { useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, Button, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import API from '../utils/API';
import AsyncStorage from '@react-native-community/async-storage';
import Card from './Card';

const Input = styled.TextInput`
  height: 30px;
  width: 80%;
`;

const initialCredentials = {
  username: '',
  password: ''
};

const Login = ({setUser, navigation}) => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const handleFieldChange = (field, val) => {
    setCredentials(prev => ({...prev, [field]: val}));
  };

  const handleSubmit = async () => {
    try {
      let res = await API.login(credentials);
      setUser(res.data);
      await AsyncStorage.setItem('User', JSON.stringify(res.data));
    } catch(e) {
      console.log(e.message);
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card>
          <Text>Welcome back!</Text>
          <Input placeholder="Username" value={credentials.username} onChangeText={(text) => handleFieldChange('username', text)}></Input>
          <Input placeholder="Password" secureTextEntry value={credentials.password} onChangeText={(text) => handleFieldChange('password', text)}></Input>
          <TouchableHighlight onPress={()=> navigation.navigate('SignUp')}>
            <Text>Don't have an account? Sign Up!</Text>
          </TouchableHighlight>
          <Button title="Login" onPress={handleSubmit}></Button>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;