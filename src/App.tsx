/**
 * Chess tournaments management
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Colors from './themes/colors';
import Login from './views/login';
import Register from './views/register';
import TournamentList from './views/tournamentList';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        translucent={true}
        backgroundColor={Colors.toolbarColor}
        animated
        barStyle="light-content"
      />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTintColor: Colors.pureWhite,
          headerStyle: {backgroundColor: Colors.primaryColor},
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name="Login"
          options={{title: 'Login', headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{title: 'Register'}}
          component={Register}
        />
        <Stack.Screen
          name="TournamentList"
          options={{title: 'Tournament List'}}
          component={TournamentList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
