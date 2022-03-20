import {enablePromise, SQLiteDatabase} from 'react-native-sqlite-storage';
import {User} from '../types';
import * as Constants from '../constants';

// promise-based APIs in the library
enablePromise(true);

export const addUser = async (db: SQLiteDatabase, user: User) => {
  const insertQuery =
    'INSERT INTO Users(id, name, surname, email, password) values ' +
    `(${user.id}, '${user.name}', '${user.surname}', '${user.email}', '${user.password}')`;

  console.log(JSON.stringify(insertQuery));

  return db.executeSql(insertQuery);
};

export const getUserByEmail = async (
  db: SQLiteDatabase,
  email: string,
): Promise<User[]> => {
  return getUsersByQuery(
    db,
    `SELECT id, name, surname, email, password FROM Users WHERE email = '${email}'`,
  );
};

export const getAllUsers = async (db: SQLiteDatabase): Promise<User[]> => {
  return getUsersByQuery(
    db,
    'SELECT id, name, surname, email, password FROM Users',
  );
};

const getUsersByQuery = async (
  db: SQLiteDatabase,
  query: string,
): Promise<User[]> => {
  try {
    const users: User[] = [];
    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        users.push(result.rows.item(index));
      }
    });
    return users;
  } catch (error) {
    console.error(error);
    Constants.ShowSnackbarError(JSON.stringify(error));
    throw Error('Failed to get users');
  }
};
