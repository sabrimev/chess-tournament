import {enablePromise, SQLiteDatabase} from 'react-native-sqlite-storage';
import {TournamentDBType} from '../types';
import * as Constants from '../constants';

// promise-based APIs in the library
enablePromise(true);

export const addTournament = async (
  db: SQLiteDatabase,
  user: TournamentDBType,
) => {
  const insertQuery =
    'INSERT INTO Tournaments(id, name, country, city, start_date, end_date, user_id) values ' +
    `(${user.id}, '${user.name}', '${user.country}', '${user.city}', '${user.start_date}', '${user.end_date}', ${user.user_id})`;

  console.log(JSON.stringify(insertQuery));

  return db.executeSql(insertQuery);
};

export const getAllTournaments = async (
  db: SQLiteDatabase,
): Promise<TournamentDBType[]> => {
  return getTournamentsByQuery(
    db,
    'SELECT id, name, country, city, start_date, end_date, user_id FROM Tournaments',
  );
};

const getTournamentsByQuery = async (
  db: SQLiteDatabase,
  query: string,
): Promise<TournamentDBType[]> => {
  try {
    const users: TournamentDBType[] = [];
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
    throw Error('Failed to get tournaments');
  }
};
