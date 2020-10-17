import React, { Component } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View, Text } from 'react-native';
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
            <View>
              <Text>Accounts</Text>
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