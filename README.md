# Server for todos-goals app (my first SERN stack app)

## Information about the server
- the server was built using express.js
- it was built by typescript
- Authentication and Authoriziation are handled using JWTs
- The server is composed of three apps (users, todos, goals)
- tests are made using jasmine and supertest to test every route and functionality in the server

### first instructions
#### first: 
make `.env` file and store in the following variables:
- POSTGRES_HOST=
- POSTGRES_PORT=
- POSTGRES_DB=
- POSTGRES_TEST_DB=
- POSTGRES_USER=
- POSTGRES_PASS=

- PORT=
- ENV=

- BCRYPT_PASSWORD=
- SALT_ROUNDS=
- TOKEN_SECRET=

- EMAIL_ACCOUNT=
- EMAIL_APP_PASSWORD=

#### second:
- run: `npm install` to install all dependincies
- then run `npm run build_db` to run migrations and 
- then run `npm run build` to build your application
- then run `node build/server` to start the server


### Migrations
build up and down 4 tables
- users
- todos
- goals
- tokens

### Routes
#### /api/users

- `/register` post request
- data in request body: `{name, gender, email, pswd, cpswd, picurl}` 
- return if success: `{user, refresh, browser, access}` 
- 
-  `/login` post request
- data in request body: `{email, pswd}`
- return if success: `{user, refresh, browser, access}` 
- 
- `/verify/:verify` get request - to verify the user, the link is sent to user via email
- 
- `/sendverify` get request with authorization - to send verification email to user
- 
- `/getcsrf` get request with authorization - to get csrf token for forms to prevent csrf attacks
- 
- `/update` put request with authorization and csrf token 
- data in request body; `{name, gender, picurl}`
- return if success: `{user, refresh, access}`
- 
- `/changepassword` put request with authorization and csrf token
- data in request body: `{opswd, pswd, cpswd}`
- return status `200` if success
- 
- `/forgetpassword` post request - data in request body is `email`, return `200` if success and email is sent with link
- 
- `/recoverpassword/:code` get request - return form to enter the new password
- 
- `/recoverpassword` put request
- data in request body: `{pswd, cpswd}`
- return `200` if success
- 
- `/refresh` get request with authorization - return new `{refresh, access}` tokens if success
- 
- `/getaccess` get request with authorization - return `access` token if success
- 
- `/logout` delete requet with authorization to logout from single browser - return `200` if success
- 
- `/logoutall` delete requet with authorization to logout from all browsers - return `200` if success
- 
- `/delete` delete requet with authorization to delete user
- data in request body: `{pswd, confirmMsg}`
- return `200` if success
- 
- 
- user object `{id: number, name: string, email: string, picurl: string , date: Date, verified: boolean}`

#### /api/todos
- `get` request to get all todos owned by user - return `[todos]` array of todos objects
- `post` request to add todo - data: `{todo}` name return `todo` object
- `put` request to toggle todo completion - data: `{id}` todo id - return `todo` object
- `delete` request to delete todo - data: `{id}` todo id - return `200` if success
- 
- todo object: `{id: number, todo: string, complete: boolean, date:Date}`
- all todo routes require authorization and the user to be verified

#### /api/goals
- `get` request to get all goals owned by user - return `[goals]` array of goals objects
- `post` request to add goal - data: `{goal}` name return `goal` object
- `delete` request to delete goal - data: `{id}` goal id - return `200` if success
- 
- goal object: `{id: number, todo: string, date:Date}`
- all goal routes require authorization and the user to be verified

