import * as dbService from './dbService';
import * as userService from './userService';

const DBService = {
  ...dbService,
  ...userService,
};

export default DBService;
