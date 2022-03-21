import * as dbService from './dbService';
import * as userService from './userService';
import * as tournamentService from './tournamentService';
import * as favoriteService from './favoriteService';

const DBService = {
  ...dbService,
  ...userService,
  ...tournamentService,
  ...favoriteService,
};

export default DBService;
