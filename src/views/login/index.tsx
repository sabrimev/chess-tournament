import styles from './useStyles';
import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import {Input, Button as ButtonElement} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import Colors from '../../themes/colors';
import * as Constants from '../../utils/constants';
import DBService from '../../utils/database';
import {User} from '../../utils/types';
interface Props {
  navigation: any;
}

const Login = (props: Props) => {
  const {navigation} = props;

  const [email, setEmail] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

  const [pass, setPass] = useState<string>('');
  const [passErrorMessage, setPassErrorMessage] = useState<string>('');

  const [isLoading, setIsloading] = useState<boolean>(false);

  const validateInputs = async () => {
    let isNotcomplete = false;

    if (!Constants.IsValidEmail(email)) {
      setEmailErrorMessage('Email is not valid');
      isNotcomplete = true;
    } else {
      setEmailErrorMessage('');
    }

    if (pass.length === 0) {
      setPassErrorMessage('Password cannot be empty');
      isNotcomplete = true;
    } else {
      setPassErrorMessage('');
    }

    if (!isNotcomplete) {
      await onPressLogin();
    }
  };

  const onPressLogin = async () => {
    setIsloading(true);

    const db = await DBService.getDBConnection();
    await DBService.createUsersTable(db);

    const users: User[] = await DBService.getUserByEmail(db, email);
    const user: User = users[0];
    if (user && user.password === pass.trim()) {
      navigateToTournaments(user);
    } else {
      setIsloading(false);
      Constants.ShowSnackbarError('Invalid credentials');
    }
  };

  const navigateToTournaments = (user: User) => {
    // Better ux
    setTimeout(() => {
      setIsloading(false);
      navigation.navigate('TournamentList', {
        userInfo: user,
      });
    }, 700);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Image
        style={styles.appIcon}
        source={require('../../assets/app_icon.png')}
      />
      <Text style={styles.appTitle}>Chess Tournaments{'\n'} Management</Text>
      <Input
        placeholder="email@adress.com"
        keyboardType="email-address"
        defaultValue={email}
        label={'Email Address'}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'email'} />}
        onChangeText={value => setEmail(value.toLowerCase())}
        autoCompleteType={'username'}
        errorStyle={styles.errorMessage}
        errorMessage={emailErrorMessage}
      />

      <Input
        placeholder="Password"
        defaultValue={pass}
        label={'Password'}
        secureTextEntry={true}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'lock'} />}
        onChangeText={value => setPass(value)}
        autoCompleteType={'password'}
        errorStyle={styles.errorMessage}
        errorMessage={passErrorMessage}
      />

      <View style={styles.buttonContainer}>
        <ButtonElement
          buttonStyle={styles.loginButton}
          title="Sign in"
          type="solid"
          onPress={() => {
            console.log('Logging in..');
            validateInputs();
          }}
        />

        <ButtonElement
          buttonStyle={styles.registerButton}
          title="Register"
          type="clear"
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
    </View>
  );
};

export default Login;
