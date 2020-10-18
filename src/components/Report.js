import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View, Text, Platform, TouchableOpacity, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import API from '../utils/API';
import Card from './Card';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


const FlexSafeAreaView = styled.SafeAreaView`
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
`;
const Report = ({transactions}) => {

  return (
    transactions !== null ? (
      <Stack.Navigator initialRouteName='Landing'>
        <Stack.Screen name='Landing'>
          {props => <Landing {...props} transactions={transactions}/>}
        </Stack.Screen>
        <Stack.Screen name='Confirmation' component={Confirmation}></Stack.Screen>
      </Stack.Navigator>
    ) : (
      <View style={styles.indicatorStyle}>
        <ActivityIndicator size="large" />
      </View>
    )
  );
};

const Landing = ({ navigation, transactions }) => {
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  const components = sorted.map((t, index) => {
    return (
      <TouchableOpacity style={{ height : '25%' }} key={index} onPress={() => {
        navigation.navigate('Confirmation', { transaction: t });
      }}>
        <Card key={t.id} margin={10} height='100%' width='100%' align="center" direction="row" justify="center" style={{ paddingHorizontal: 10 }}>
          <View style={{width: '70%'}}>
            <Text>{new Date(t.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
            <Text>{t.place.name}</Text>
          </View>
          <View style={{width: '30%', padding: 10}}>
            <Text style={{color: '#EE586B'}}>-${t.amount}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  });

  return (
    <FlexSafeAreaView>
      <View style={{
        height: '25%', justifyContent: 'center', alignItems: 'center', ...(Platform.OS !== 'android' && {
          zIndex: 10
        })
      }}>
        <Text style={{ marginBottom: 15 }}>Report Credit Card Fraud</Text>
        <DropDownPicker
          items={[
            { label: 'Account 0443', value: 'Account 0443', icon: () => <Icon name="credit-card" size={18} color="#000" /> },
            { label: 'Account 9433', value: 'Account 9433', icon: () => <Icon name="credit-card" size={18} color="#000" /> },
          ]}
          containerStyle={{ height: 40, width: 200 }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => console.log(item)}
        />
      </View>
      <ScrollView contentContainerStyle={{width: '90%', alignSelf: 'center'}}>
        <View style={{ backgroundColor: '#EFEFF4', height: 30, padding: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
          <Text>Recent Transactions</Text>
        </View>
        {components}
      </ScrollView>
    </FlexSafeAreaView>
  );
};

const Confirmation = ({ route, navigation }) => {
  const { transaction: t } = route.params;

  const handler = async () => {
    await API.createFraudulentTransaction(t);
    navigation.goBack();
    navigation.navigate('Home');
  };

  return (
    <FlexSafeAreaView>
      <View style={{ padding: 20, paddingTop: 50 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{t.place.name}</Text>
        <Text style={{ fontSize: 18 }}>1984 Andromeda Lane, Weston, Florida, 33327</Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Amount:</Text>
          <Text style={{ fontSize: 18, color: '#FF3B30' }}>{`$${t.amount}`}</Text>  
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Transaction Date:</Text>
          <Text style={{ fontSize: 18, color: '#C4C4C4' }}>{`$${t.date}`}</Text>  
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
          <TouchableHighlight onPress={handler} style={styles.reportButton}>
            <Text style={{ color: 'white', fontSize: 18 }}>Report Fraud</Text>
          </TouchableHighlight>
          <TouchableOpacity onPress={() => {}} style={styles.contactButton}>
            <Text style={{ color: '#FF3B30', fontSize: 18 }}>Contact Store</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FlexSafeAreaView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  indicatorStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportButton: {
    width: '48%',
    backgroundColor: '#FF3B30',
    color: 'white',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 10,
    borderColor: '#FF3B30',
    borderWidth: 1,
    marginRight: '2%',
  },
  contactButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    color: 'white',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 10,
    borderColor: '#FF3B30',
    borderWidth: 1,
    marginLeft: '2%'
  }
});

export default Report;
