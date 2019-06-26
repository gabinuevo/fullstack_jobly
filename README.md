More details coming to the readme in the future. 

In the meantime, to start the app, the steps post-cloning are:

1) Make sure you have one of the latest versions of npm installed on your computer. Then, in the terminal, in both the FRONTEND and the BACKEND folder, run `npm install` to install the dependencies.

2) This app uses a PostgreSQL database, so make sure you have it installed. Then in the BACKEND folder, run the compand `psql < data.sql` to seed the database.

3) In the BACKEND folder, run `nodemon server.js` to start the backend server.

4) In the FRONTEND folder, run `npm start` to start the frontend server. A new tab in your default browser will open up after 30 ish seconds where you can register as a new user and see the current features in the application. NOTE: Make sure that you are running on port 3000, as CORS has only been configured in the backend for that port specifically.