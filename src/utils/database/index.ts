import * as dbService from './dbService';
import * as userService from './userService';
import * as tournamentService from './tournamentService';

const DBService = {
  ...dbService,
  ...userService,
  ...tournamentService,
};

export default DBService;
