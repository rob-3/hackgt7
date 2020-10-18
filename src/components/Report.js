import React, { Component } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View, Text, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import API from '../utils/API';
import Card from './Card';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';


const FlexSafeAreaView = styled.SafeAreaView`
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
`;
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
      components = sorted.map(t =>
        <Card key={t.id} height='25%' width='100%' align="center" direction="row" justify="center" onPress={() => {
          API.createFraudulentTransaction(t.place);
        }}>
          <View style={{width: '70%'}}>
          <Text>{new Date(t.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
          <Text>{t.place.name}</Text>
          </View>
          <View style={{width: '30%', padding: 10}}>
            <Text style={{color: '#EE586B'}}>-${t.amount}</Text>
          </View>
        </Card>);
    }

    return (
      <>
        {
          !loading ? (
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
                  defaultValue={this.state.country}
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
                <View style={{ backgroundColor: '#EFEFF4', height: 30, padding: 5, borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                  <Text>Recent Transactions</Text>
                </View>
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
