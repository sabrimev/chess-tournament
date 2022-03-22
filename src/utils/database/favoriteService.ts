import {enablePromise, SQLiteDatabase} from 'react-native-sqlite-storage';
import {Favorite} from '../types';
import * as Constants from '../constants';

// promise-based APIs in the library
enablePromise(true);

export const addFavorite = async (db: SQLiteDatabase, user: Favorite) => {
  const insertQuery =
    'INSERT INTO Favorites(tournament_id, user_id) values ' +
    `(${user.tournament_id}, ${user.user_id})`;

  return db.executeSql(insertQuery);
};

export const deleteFavorite = async (
  db: SQLiteDatabase,
  tournamentId?: number,
  userId?: number,
) => {
  const deleteQuery = `DELETE from Favorites WHERE tournament_id = ${tournamentId} AND user_id =  ${userId}`;

  await db.executeSql(deleteQuery);
};

export const getFavorites = async (
  db: SQLiteDatabase,
  tournamentId?: number,
  userId?: number,
): Promise<Favorite[]> => {
  return getFavoritesByQuery(
    db,
    `SELECT tournament_id, user_id FROM Favorites WHERE tournament_id = ${tournamentId} AND user_id =  ${userId}`,
  );
};

const getFavoritesByQuery = async (
  db: SQLiteDatabase,
  query: string,
): Promise<Favorite[]> => {
  try {
    const users: Favorite[] = [];
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
