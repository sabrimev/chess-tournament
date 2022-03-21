import {enablePromise, SQLiteDatabase} from 'react-native-sqlite-storage';
import {TournamentDBType} from '../types';
import * as Constants from '../constants';

// promise-based APIs in the library
enablePromise(true);

export const addTournament = async (
  db: SQLiteDatabase,
  tournament: TournamentDBType,
) => {
  const insertQuery =
    'INSERT INTO Tournaments(id, name, country, city, start_date, end_date, cover_photo_base64, user_id) values ' +
    `(${tournament.id}, '${tournament.name}', '${tournament.country}', '${tournament.city}', '${tournament.start_date}', '${tournament.end_date}', '${tournament.cover_photo_base64}', ${tournament.user_id})`;

  console.log(JSON.stringify(insertQuery));

  return db.executeSql(insertQuery);
};

export const deleteTournament = async (
  db: SQLiteDatabase,
  tournamentId: number,
) => {
  const deleteQuery = `DELETE from Tournaments where id = ${tournamentId}`;
  await db.executeSql(deleteQuery);
};

export const getAllTournaments = async (
  db: SQLiteDatabase,
): Promise<TournamentDBType[]> => {
  return getTournamentsByQuery(
    db,
    'SELECT id, name, country, city, start_date, end_date, cover_photo_base64, user_id FROM Tournaments',
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
