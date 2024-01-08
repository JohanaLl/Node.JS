import express from "express";
import coursesRouter from './routes/courses.router.js';
import usersRouter from './routes/users.router.js';
import sessionsRouter from './routes/session.router.js';
import './db/dbConfig.js';
import cookieParser from "cookie-parser";
import passport from "passport";
import './passport.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(passport.initialize());

//routes
app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/sessions', sessionsRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});
