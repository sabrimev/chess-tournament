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
    'INSERT OR REPLACE INTO Tournaments(id, name, country, city, start_date, end_date, cover_photo_base64, user_id) values ' +
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
  userId: number | undefined,
): Promise<TournamentDBType[]> => {
  return getTournamentsByQuery(
    db,
    `SELECT Tournaments.id, Tournaments.name, Tournaments.country, 
      Tournaments.city, Tournaments.start_date, Tournaments.end_date, 
      Tournaments.cover_photo_base64, Tournaments.user_id,
      CASE 
        WHEN Favorites.user_id > 0 
            THEN true 
        ELSE false 
      END is_favorite 
    FROM Tournaments LEFT JOIN Favorites 
    ON Favorites.tournament_id = Tournaments.id AND Favorites.user_id = ${userId}`,
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
