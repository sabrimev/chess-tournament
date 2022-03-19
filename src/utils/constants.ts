import {Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Colors from '../themes/colors';

export const ShowErrorDialog = (message: string) => {
  Alert.alert('Error', message, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
};

export const ShowInfoDialog = (title: string, message: string, action: any) => {
  Alert.alert(title, message, [
    {
      text: 'OK',
      onPress: () => {
        action();
      },
    },
  ]);
};

export const ShowSnackbarInfo = (text: string) => {
  Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: Colors.greenPrimary,
    numberOfLines: 2,
  });
};

export const ShowSnackbarError = (text: string) => {
  Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_INDEFINITE,
    backgroundColor: Colors.errorColor,
    numberOfLines: 4,
    action: {
      text: 'CLOSE',
      textColor: Colors.pureWhite,
    },
  });
};
