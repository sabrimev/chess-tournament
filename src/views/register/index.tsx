import styles from './useStyles';
import React, {useState} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import {Input, Button as ButtonElement} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Constants from '../../utils/constants';

import Colors from '../../themes/colors';
import {User} from '../../utils/types';
import DBService from '../../utils/database';

interface Props {
  navigation: any;
}

const Register = (props: Props) => {
  const {navigation} = props;

  const [name, setName] = useState<string>('');
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');

  const [surname, setSurname] = useState<string>('');
  const [surnameErrorMessage, setSurnameErrorMessage] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

  const [pass, setPass] = useState<string>('');
  const [passAgain, setPassAgain] = useState<string>('');
  const [passErrorMessage, setPassErrorMessage] = useState<string>('');

  const [isLoading, setIsloading] = useState<boolean>(false);

  const validateInputs = async () => {
    let isNotcomplete = false;

    if (name.length === 0) {
      setNameErrorMessage('Name cannot be empty');
      isNotcomplete = true;
    } else {
      setNameErrorMessage('');
    }

    if (surname.length === 0) {
      setSurnameErrorMessage('Surname cannot be empty');
      isNotcomplete = true;
    } else {
      setSurnameErrorMessage('');
    }

    if (!Constants.IsValidEmail(email)) {
      setEmailErrorMessage('Email is not valid');
      isNotcomplete = true;
    } else {
      setEmailErrorMessage('');
    }

    if (pass.length === 0) {
      setPassErrorMessage('Password cannot be empty');
      isNotcomplete = true;
    } else if (pass !== passAgain) {
      setPassErrorMessage('Passwords do not match');
      isNotcomplete = true;
    } else {
      setPassErrorMessage('');
    }

    if (!isNotcomplete) {
      await registerUser();
    }
  };

  const registerUser = async () => {
    setIsloading(true);

    const user: User = {
      id: Date.now(),
      name: name,
      surname: surname,
      email: email,
      password: pass,
    };

    const db = await DBService.getDBConnection();
    await DBService.createUsersTable(db);

    const users: User[] = await DBService.getUserByEmail(db, email);
    if (users.length > 0) {
      Constants.ShowSnackbarError('User with the same email is already exist.');
      setIsloading(false);
      return;
    }

    await DBService.addUser(db, user);

    // TODO Log purpose - Remove later
    const storedUsers = await DBService.getAllUsers(db);
    console.log(JSON.stringify(storedUsers));

    // Better user experience as local db is quite fast
    setTimeout(() => {
      setIsloading(false);
      registrationComplete();
    }, 900);
  };

  const registrationComplete = () => {
    Alert.alert(
      'Registration Completed',
      'Use your credentials to login the app.',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading} />
      <Input
        placeholder="Jack"
        defaultValue={name}
        label={'Name'}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'person'} />}
        onChangeText={value => setName(value)}
        autoCompleteType={'username'}
        errorStyle={styles.errorMessage}
        errorMessage={nameErrorMessage}
      />

      <Input
        placeholder="Reacher"
        defaultValue={surname}
        label={'Surname'}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'person'} />}
        onChangeText={value => setSurname(value)}
        autoCompleteType={'username'}
        errorStyle={styles.errorMessage}
        errorMessage={surnameErrorMessage}
      />

      <Input
        placeholder="email@adress.com"
        keyboardType="email-address"
        defaultValue={email}
        label={'Email Address'}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'email'} />}
        onChangeText={value => setEmail(value.toLowerCase())}
        autoCompleteType={'email'}
        errorStyle={styles.errorMessage}
        errorMessage={emailErrorMessage}
      />

      <Input
        placeholder="***"
        defaultValue={pass}
        label={'Password'}
        secureTextEntry={true}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'lock'} />}
        onChangeText={value => setPass(value)}
        autoCompleteType={'password'}
      />

      <Input
        placeholder="***"
        defaultValue={passAgain}
        label={'Retype Password'}
        secureTextEntry={true}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'lock'} />}
        onChangeText={value => setPassAgain(value)}
        autoCompleteType={'password'}
        errorStyle={styles.errorMessage}
        errorMessage={passErrorMessage}
      />

      <View style={styles.buttonContainer}>
        <ButtonElement
          buttonStyle={styles.loginButton}
          title="Register"
          type="solid"
          onPress={() => {
            console.log('Registring..');
            validateInputs();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;
