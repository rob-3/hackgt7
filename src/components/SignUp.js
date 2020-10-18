import React, { useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, Button, Modal, TouchableHighlight, Image } from 'react-native';
import styled from 'styled-components/native';
import API from '../utils/API';
import Card from './Card';

const Input = styled.TextInput`
  height: 40px;
  width: 80%;
  background-color: white;
  border: 1px solid rgba(60, 60, 67, 0.29);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
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

const SignupButton = styled.TouchableOpacity`
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

const LoginButton = styled.TouchableHighlight`
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
const SignUp = ({ setUser, navigation }) => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [showModal, setShowModal] = useState(false);
  const handleFieldChange = (field, val) => {
    setCredentials(prev => ({ ...prev, [field]: val }));
  }
  const handleSubmit = async () => {
    try {
      let res = await API.signup(credentials);
      if(res.status === 200){
        setShowModal(true);
      }

    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#2E7DF7', paddingTop: 40 }}>
      <Image source={require('../../assets/searchlight.png')} style={{marginBottom: 40}}/>
          <Input placeholder="Username" value={credentials.username} onChangeText={(text) => handleFieldChange('username', text)}></Input>
          <Input placeholder="Password" secureTextEntry value={credentials.password} onChangeText={(text) => handleFieldChange('password', text)}></Input>
          <Text style={{color: 'white', width: '80%', textAlign: 'center', marginBottom: 10}}>By Signing up, I agree to the TERMS OF USE and PRIVACY POLICY</Text>
          <SignupButton onPress={handleSubmit}>
            <Text style={{color: '#2E7DF7'}}>Sign Up</Text>
          </SignupButton>
          <View style={{borderBottomColor: 'white', width: '80%', borderBottomWidth: 1, marginBottom: 20}}></View>
          <Text style={{color: 'white'}}>Already have an account?</Text>
          <LoginButton onPress={() => navigation.navigate('LogIn')}>
            <Text style={{color: 'white'}}>Login</Text>
          </LoginButton>
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