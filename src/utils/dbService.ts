import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {User} from './types';
import * as Constants from '../utils/constants';
import Colors from '../themes/colors';
// promise-based APIs in the library
enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'tournaments.db', location: 'default'});
};

export const createUsersTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS Users(
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        surname TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const createTournamentsTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS Tournaments(
        name TEXT NOT NULL,
        country TEXT NOT NULL,
        city TEXT NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        user_id INTEGER NOT NULL
    );`;

  await db.executeSql(query);
};

export const createFavoritesTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS Favorites(
        tournament_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL
    );`;

  await db.executeSql(query);
};

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
