import React, { useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, Button, Modal, TouchableHighlight, Image } from 'react-native';
import styled from 'styled-components/native';
import API from '../utils/API';
import AsyncStorage from '@react-native-community/async-storage';

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

const StyledModal = styled.Modal`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SignUp = ({ setUser, navigation }) => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [showModal, setShowModal] = useState(false);
  const handleFieldChange = (field, val) => {
    setCredentials(prev => ({ ...prev, [field]: val }));
  }
  const handleSubmit = async () => {
    try {
      let res = await API.signup(credentials);
      if(res.code === 200){
        setShowModal(true);
      }

    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card>
          <Text>Create an account!</Text>
          <Input placeholder="Username" value={credentials.username} onChangeText={(text) => handleFieldChange('username', text)}></Input>
          <Input placeholder="Password" secureTextEntry value={credentials.password} onChangeText={(text) => handleFieldChange('password', text)}></Input>
          <TouchableHighlight onPress={() => navigation.navigate('LogIn')}>
            <Text>Already have an account? Log in!</Text>
          </TouchableHighlight>
          <Button title="Sign Up" onPress={handleSubmit}></Button>
        </Card>
        <StyledModal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            showModal(false)
          }}
        ><View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Card>
              <Image style={{ height: '50%', width: '50%' }} source={require("../../assets/check.gif")} />
              <Text>Account Created</Text>
              <TouchableHighlight onPress={() => navigation.navigate('LogIn')}>
                <Text>Go to Log In</Text>
              </TouchableHighlight>
            </Card>
          </View>
        </StyledModal>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SignUp;