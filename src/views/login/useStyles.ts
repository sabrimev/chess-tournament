import {StyleSheet} from 'react-native';
import Colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  loginButton: {
    width: '100%',
    height: 48,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
  },
  registerButton: {
    width: '100%',
    height: 48,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 30,
    marginBottom: 50,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.primaryTextColor,
  },
  buttonContainer: {
    marginTop: 30,
  },
  register: {
    alignSelf: 'center',
    marginTop: 18,
    color: Colors.softBlack,
  },
  appIcon: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  errorMessage: {
    color: Colors.redColor,
  },
});

export default styles;
