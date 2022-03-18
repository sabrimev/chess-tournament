import {Alert} from 'react-native';

export const ShowErrorDialog = (message: any) => {
  Alert.alert('Error', message, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
};
