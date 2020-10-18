import React, { Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Dimensions, ActivityIndicator, View, Text, SafeAreaView } from 'react-native';
import API from '../utils/API';
import Card from './Card';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const Report = () => {
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

  return (
    transactions !== null ? (
      <Stack.Navigator initialRouteName='Landing'>
        <Stack.Screen name='Landing'>
          {props => <Landing {...props} transactions={transactions}/>}
        </Stack.Screen>
        <Stack.Screen name='Confirmation' component={Confirmation}></Stack.Screen>
      </Stack.Navigator>
    ) : <Text>Loading</Text>
  );
};

const Landing = ({ navigation, transactions }) => {
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  const components = sorted.map(t => 
    <Card key={t.id} height='10%' width='100%'>
      <Text onPress={() => navigation.navigate('Confirmation', { transaction: t })}>{`$${t.amount} ${t.date} ${t.place.name}`}</Text>
    </Card>);
  return (
    <>
      {components}
    </>
  );
};

const Confirmation = ({ route, navigation }) => {
  const { transaction: t } = route.params;

  const handler = () => {
    API.createFraudulentTransaction(t);
    navigation.navigate('Home');
  };

  return (
    <Card height='10%' width='100%'>
      <Text>{`$${t.amount} ${t.date} ${t.place.name}`}</Text>
      <Button title='Report fraud!' onPress={handler}/>
    </Card>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  indicatorStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Report;
