import {StyleSheet} from 'react-native';
import Colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
    marginTop: 3,
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
  dateSelectionButton: {
    width: 180,
    height: 48,
  },
  dateSelectionContainer: {
    flexDirection: 'row',
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
  tournamentDate: {
    alignSelf: 'center',
    marginLeft: 7,
  },
  coverPhotoContainer: {
    height: 120,
    width: '100%',
    marginBottom: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: Colors.borderColor,
    borderWidth: 1.2,
  },
  coverPhoto: {
    height: 120,
    width: '100%',
  },
  errorMessage: {
    color: Colors.redColor,
  },
});

export default styles;
