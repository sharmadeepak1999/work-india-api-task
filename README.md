# Work India - API Task

## Technologies Used
- Node.js
- Express.js
- Nodemon
- Jwt
- Bcryptjs
- Joi
- Dotenv
- Mysql2
- Postman

## Install Dependencies
Make sure you have Node.js installed in your system. If yes, then navigate to the project folder and open the terminal and run the following commands.
```
npm install
```

## Setting up the Database
```
1. Rename the `.env.example` file to `.env`.
2. Open the `.env` file using a text editor.
3. Update the values for the following variables with your database details:
   - `DB_HOST`: The hostname of your MySQL database server.
   - `DB_USER`: The username used to connect to your MySQL database.
   - `DB_PASSWORD`: The password used to connect to your MySQL database.
   - `DB_NAME`: The name of your MySQL database.
4. Save the changes to the `.env` file.
5. In your Mysql database, create a db using the same name as you give in .env
```

### Compiles and Hot-Reloads for development using nodemon

```
npm run dev
```


### Postman Collection File
```
- Use the WorkIndia.postman_collection.json file to test the API using Postman.
- Import the collection into postman and run the api server, and then start testing the api. Make sure you are passing the authorisation details while using authenticated routes.
```