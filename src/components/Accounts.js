import React, { Component } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Card from './Card';
import API from '../utils/API';
import styled from 'styled-components/native';

const FlexSafeAreaView = styled.SafeAreaView`
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
`;

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      loading: true
    };
  }

  async componentDidMount() {
    const { data } = await API.getAccounts(105);
    this.setState({ loading: false, accounts: data });
  }

  render() {
    const { loading, accounts } = this.state;
    const components = accounts.map((account, index) => {
      return (
        <Card key={index} width="100%" style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, padding: 0, height: '20%' }}>
          <View>
            <Image source={index !== 1 ? require('../icons/CapitalOneLogo.jpg') : require('../icons/BOALogo.png')} style={{ height: 100, width: 100 }} />
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', width: '65%', marginLeft: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>xxxx - {account.accountNumber.substring(account.accountNumber.length - 5)}</Text>
            <Text>Current Balance: ${account.currentBalance.amount}</Text>
            <Text>Available Balance: ${account.availableBalance.amount}</Text>
            <Text>Description: {account.description}</Text>
          </View>
        </Card>
      );
    });

    return (
      <>
        {
          !loading ? (
            <FlexSafeAreaView>
              <ScrollView contentContainerStyle={{width: '90%', alignSelf: 'center'}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 20 }}>Hello HACKER105, welcome to Searchlight accounts</Text>
                <Card height="10%" width="100%">
                  <Image source={require('../../assets/circle-plus.png')}/>
                  <Text>Add Bank Card</Text>
                </Card>
                {components}
              </ScrollView>
            </FlexSafeAreaView>
          ) : (
            <View style={styles.indicatorStyle}>
              <ActivityIndicator size="large" />
            </View>
          )
        }
      </>
    );
  }
}

const styles = StyleSheet.create({
  indicatorStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 25,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
});

export default Accounts;