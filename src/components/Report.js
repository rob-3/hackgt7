import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Dimensions, ActivityIndicator, View, Text, Platform, TouchableOpacity } from 'react-native';
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
      <TouchableOpacity style={{ height : '25%', margin: 0 }} key={index} onPress={() => {
        navigation.navigate('Confirmation', { transaction: t });
      }}>
        <Card key={t.id} height='100%' width='100%' align="center" direction="row" justify="center">
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
