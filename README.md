# Chess Tournament Management
## Features
* An authentication screen for signup and login.
* Create, edit and delete a tournament. tournament with start, end date, country and city.
* Add tournament to favorites.
* List all upcoming tournaments, tournaments in progress and tournaments that the user added to favorites.
* Search tournaments by name, country or city.
* Upload cover image for a tournament.

## How to run?

Navigate to project directory and continue with the following commands.

#### IOS
1.  `yarn`
2.  `cd ios`
3.  `pod install`
4.  `cd ..`
5.  `yarn ios`

#### Android
1.  `yarn`
5.  `yarn android`

#### Dev Dependencies
Typescript and eslint rules are applied to the project.

1.  `yarn eslint`  : Detect eslint issues.
2.  `yarn tsc`  : Detect typescript issues.

## Potential Improvements
1. Use of Redux to keep user information instead of async storage.
2. Create selectable component and different tables in SQLite for Country and City.
3. Check screen boundries for different type of devices.
4. Force user to create a strong password.
5. Encrypt password and save it.

## Screenshots

![Login](https://github.com/sabrimev/chess-tournament/blob/main/src/assets/screenshots/login.png?raw=true)
![Register](https://github.com/sabrimev/chess-tournament/blob/main/src/assets/screenshots/RegisterUser.png?raw=true)
![Edit Option](https://github.com/sabrimev/chess-tournament/blob/main/src/assets/screenshots/EditOptions.png?raw=true)
![Edit Tournament](https://github.com/sabrimev/chess-tournament/blob/main/src/assets/screenshots/EditTournament.png?raw=true)