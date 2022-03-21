import {User} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constants from './constants';

export const getStoredUserData = async (): Promise<User | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem(
      Constants.STORAGE_KEYS.USER_INFO,
    );

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error on receiving user info from storage');
    return undefined;
  }
};

export const storeUserData = async (user: User) => {
  await AsyncStorage.setItem(
    Constants.STORAGE_KEYS.USER_INFO,
    JSON.stringify(user),
  );
};
