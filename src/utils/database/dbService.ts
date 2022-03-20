import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {User} from '../types';
import * as Constants from '../constants';
import Colors from '../../themes/colors';

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
