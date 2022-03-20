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

export const IsValidEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
