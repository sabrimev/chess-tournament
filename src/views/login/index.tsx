import styles from './useStyles';
import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import MDIcon from 'react-native-vector-icons/MaterialIcons';
import {Input, Button as ButtonElement} from 'react-native-elements';
//@ts-ignore lib issue
import Spinner from 'react-native-loading-spinner-overlay';

import Colors from '../../themes/colors';

interface Props {
  navigation: any;
}

const Login = (props: Props) => {
  const {navigation} = props;

  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsloading] = useState<boolean>(false);

  const onPressLogin = () => {
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
      navigation.navigate('TournamentList');
    }, 1200);
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
        onChangeText={value => setEmail(value)}
        autoCompleteType={'username'}
      />

      <Input
        placeholder="Password"
        defaultValue={pass}
        label={'Password'}
        secureTextEntry={true}
        leftIcon={<MDIcon size={24} color={Colors.softBlack} name={'lock'} />}
        onChangeText={value => setPass(value)}
        autoCompleteType={'password'}
      />

      <View style={styles.buttonContainer}>
        <ButtonElement
          buttonStyle={styles.loginButton}
          title="Sign in"
          type="solid"
          onPress={() => {
            console.log('Logging in..');
            onPressLogin();
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
