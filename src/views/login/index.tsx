import styles from './useStyles';
import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import {Input, Button as ButtonElement} from 'react-native-elements';

import Colors from '../../themes/colors';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState('');

  return (
    <View style={styles.container}>
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
        onChangeText={value => setEmail(value)}
        autoCompleteType={undefined}
      />

      <Input
        placeholder="Password"
        keyboardType="email-address"
        defaultValue={pass}
        label={'Password'}
        secureTextEntry={true}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'lock'} />}
        onChangeText={value => setPass(value)}
        autoCompleteType={undefined}
      />

      <View style={styles.buttonContainer}>
        <ButtonElement
          buttonStyle={styles.loginButton}
          title="Sign in"
          type="solid"
          onPress={() => {
            console.log('Logging in..');
          }}
        />

        <ButtonElement
          buttonStyle={styles.registerButton}
          title="Register"
          type="clear"
          onPress={() => {
            console.log('Registering..');
          }}
        />
      </View>
    </View>
  );
};

export default Login;
