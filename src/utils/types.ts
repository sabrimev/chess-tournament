export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface TournamentDBType {
  id: number;
  name: string;
  country: string;
  city: string;
  start_date: string;
  end_date: string;
  cover_photo_base64: string;
  user_id: number;
}

export interface Favorite {
  id: number;
  user_id: number;
  tournament_id: number;
}
