import React, { useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, Button } from 'react-native';
import styled from 'styled-components/native';
import API from '../utils/API';

const Input = styled.TextInput`
  height: 30px;
  width: 80%;
`;

const Card = styled.View`
  background-color: white;
  width: 80%;
  height: 30%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const initialCredentials = {
  username: "",
  password: ""
};

const Login = () => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const handleFieldChange = (field, val) => {
    setCredentials(prev => ({...prev, [field]: val}));
  }
  const handleSubmit = async () => {
    try {
      let res = await API.login(credentials);
      console.log(res.data);
    } catch(e) {
      console.log(e.message);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card>
          <Text>Welcome back!</Text>
          <Input placeholder="Username" value={credentials.username} onChangeText={(text) => handleFieldChange('username', text)}></Input>
          <Input placeholder="Password" secureTextEntry value={credentials.password} onChangeText={(text) => handleFieldChange('password', text)}></Input>
          <Button title="Login" onPress={handleSubmit}></Button>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Login;