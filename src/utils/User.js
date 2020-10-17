import AsyncStorage from '@react-native-community/async-storage';

const User = {
  get: () => AsyncStorage.getItem('User'),
};

export default User;