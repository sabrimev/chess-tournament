import styles from './useStyles';
import React, {useState} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import {Input, Button as ButtonElement} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Constants from '../../utils/constants';

import Colors from '../../themes/colors';
import * as DBService from '../../utils/dbService';
import {User} from '../../utils/types';

interface Props {
  navigation: any;
}

const Register = (props: Props) => {
  const {navigation} = props;

  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [passAgain, setPassAgain] = useState<string>('');
  const [isLoading, setIsloading] = useState<boolean>(false);

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

    await DBService.addUser(db, user);

    const storedUsers = await DBService.getAllUsers(db);
    console.log(JSON.stringify(storedUsers));

    setIsloading(false);

    registrationComplete();
  };

  const registrationComplete = () => {
    Alert.alert(
      'Registered',
      'You are registered. Use your credentials to login the app',
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
      />

      <Input
        placeholder="Reacher"
        defaultValue={surname}
        label={'Surname'}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'person'} />}
        onChangeText={value => setSurname(value)}
        autoCompleteType={'username'}
      />

      <Input
        placeholder="email@adress.com"
        keyboardType="email-address"
        defaultValue={email}
        label={'Email Address'}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'email'} />}
        onChangeText={value => setEmail(value)}
        autoCompleteType={'email'}
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
        errorStyle={{color: 'red'}}
        errorMessage={'Passwords do not match'}
      />

      <View style={styles.buttonContainer}>
        <ButtonElement
          buttonStyle={styles.loginButton}
          title="Register"
          type="solid"
          onPress={() => {
            console.log('Registring..');
            registerUser();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;
