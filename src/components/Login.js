import React, { useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, Button, TouchableHighlight, Image } from 'react-native';
import styled from 'styled-components/native';
import API from '../utils/API';
import AsyncStorage from '@react-native-community/async-storage';

const Input = styled.TextInput`
  height: 40px;
  width: 80%;
  background-color: white;
  border: 1px solid rgba(60, 60, 67, 0.29);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #FFFEFE;
  color: white;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SignupButton = styled.TouchableHighlight`
  background-color: #000000;
  color: white;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  margin-top: 10px;
  border-radius: 10px;
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
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#2E7DF7', paddingTop: 40 }}>
        <Image source={require('../../assets/searchlight.png')} style={{marginBottom: 40}}/>
          <Input placeholder="Username" value={credentials.username} onChangeText={(text) => handleFieldChange('username', text)}></Input>
          <Input placeholder="Password" secureTextEntry value={credentials.password} onChangeText={(text) => handleFieldChange('password', text)}></Input>
          <Text style={{color: 'white', width: '80%', textAlign: 'center', marginBottom: 10}}>By clicking Login, I agree to the TERMS OF USE and PRIVACY POLICY</Text>
          <LoginButton onPress={handleSubmit}>
            <Text style={{color: '#2E7DF7'}}>Login</Text>
          </LoginButton>
          <View style={{borderBottomColor: 'white', width: '80%', borderBottomWidth: 1, marginBottom: 20}}></View>
          <Text style={{color: 'white'}}>Don't have an account?</Text>
          <SignupButton onPress={()=> navigation.navigate('SignUp')}>
            <Text style={{color: 'white'}}>Sign Up</Text>
          </SignupButton>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;