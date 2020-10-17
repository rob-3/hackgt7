import React, { Component } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View, Text } from 'react-native';
import API from '../utils/API';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: null,
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const transactions = await API.getTransactions(105);
      console.log(transactions);
      this.setState({ transactions, loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;

    let components;
    if (!loading) {
      const sorted = [...this.state.transactions.data].sort((a, b) => new Date(b.date) - new Date(a.date));
      components = sorted.map(t => <Text key={t.id}>{`$${t.amount} ${t.date} ${t.place}`}</Text>);
    }

    return (
      <>
        {
          !loading ? (
            <View>
              {components}
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

export default Report;
