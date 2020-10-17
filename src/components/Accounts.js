import React, { Component } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View, Text, Image } from 'react-native';
import Card from './Card';
// import API from '../utils/API';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: null,
      loading: true
    };
  }

  async componentDidMount() {
    // const transactions = await API.getTransactions();
    // console.log(transactions);
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    return (
      <>
        {
          !loading ? (
            <View style={{ flex: 1, alignItems: 'center', padding: '5%'}}>
              <Card height="10%">
                <Image source={require('../../assets/circle-plus.png')}/>
                <Text>Add Bank Card</Text>
              </Card>
            </View>
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

export default Accounts;
