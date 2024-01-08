import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy} from "passport-local";
import { usersManager } from './managers/users.managers.js';
import { hashData, compareData } from "./utils.js";

const SECRETJWT = 'jwtSecret';

passport.use(
    'signup', 
    new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true,
    }, 
    async(req, email, password, done) => {
    const { name } = req.body
    if (!name || !email || !password) {
        return done(null, false)
    }
    try {
        const hashedPassword = await hashData(password)
        const createdUser = await usersManager.createOne({
            ...req.body, 
            password: hashedPassword
        })
        done(null, createdUser)
    } catch (error) {
        done(error);
    }
}))

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
    }, async(email, password, done) => {
    if (!email || !password) {
        return done(null, false, {message: 'All fields are required'})
    }
    try {
        const user = await usersManager.getByEmail(email);
        if (!user) {
            return done(null, false, {message: 'Incorrect email or password'});
        }        
        const isPassValid = await compareData(password, user.password)
        if (!isPassValid) {
            return done(null, false, {message: 'Incorrect email or password'});
        }
        done(null, user);
    } catch (error) {
        done(error)
    }
}))

const fromCookies = (req) => {
    return req.cookies.token;
}
//Metodo para generar token
passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
    secretOrKey: SECRETJWT,
}, (jwt_payload, done) => {
    done(null, jwt_payload);
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await usersManager.finfById(id);
        done(null, user);
    } catch (error) {
        done(error)
    }
})