import passport from "passport";
import { userManager } from "./managers/users.manager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { compareData, hashData } from "./utils.js";

//local
passport.use(
    'signup', 
    new LocalStrategy(
        //request passReqToCallback: true 
        //=> de esta forma passport le pasa el obj req a esta función
        { passReqToCallback: true, usernameField: 'email' }, 
        async(req, email, password, done) => {
        const { first_name, last_name} = req.body;
        if (!first_name || !last_name || !email || !password) {
            return done(null, false);
        }
        try {
            const hashedPassword = await hashData(password);
            const createUser = await userManager.createOne({
                ...req.body, 
                password:hashedPassword
            });
            done(null, createUser);
        } catch (error) {
            done(error);
        }
}))

passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        if (!email || !password) {
          done(null, false);
        }
        try {
          const user = await userManager.findByEmail(email);
          if (!user) {
            done(null, false);
          }
  
          const isPasswordValid = await compareData(password, user.password);
          if (!isPasswordValid) {
            return done(null, false);
          }
          // const sessionInfo =
          //   email === "adminCoder@coder.com"
          //     ? { email, first_name: user.first_name, isAdmin: true }
          //     : { email, first_name: user.first_name, isAdmin: false };
          // req.session.user = sessionInfo;
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
);

//github
passport.use(
    'github', 
    new GithubStrategy(
        {
            clientID: "Iv1.e612a63cdcfa9ef7",
            clientSecret: "48dc4ff8fdde6f21fa966fa8f572e2134088d33d",
            callbackURL: "http://localhost:8080/api/session/callback",
        }, 
        async (accessToken, refreshToken, profile, done) =>{
            try {
                const userDB = await userManager.findByEmail(`${profile._json.login.toLowerCase()}@gmail.com`);
                //login
                if (userDB) {
                    if (userDB.isGithub) {
                        return done(null, userDB);
                    } else {
                        return done(null, false);
                    }
                }
                //signup
                const infoUser = {
                    first_name: profile._json.name.split(' ')[0],
                    last_name:profile._json.name.split(' ')[2],
                    email:`${profile._json.login.toLowerCase()}@gmail.com`,
                    password: " ",
                    isGithub: true
                };
                const createUser = await userManager.createOne(infoUser);
                done(null, createUser);
            } catch (error) {
                done(error)
            }
        }
    )
);

//google
passport.use('google', new GoogleStrategy({
    clientID: "104583531490-5inihd9uefc145fcdr85nl6kaefel5o0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8080/api/session/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    try {
        const userDB = await userManager.findByEmail(profile._json.email);
        //login
        if (userDB) {
            if (userDB.isGoogle) {
                return done(null, userDB);
            } else {
                return done(null, false);
            }
        }
        //signup
        const infoUser = {
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            email: profile._json.email,
            password: " ",
            isGoogle: true
        };
        const createUser = await userManager.createOne(infoUser);
        done(null, createUser);
    } catch (error) {
        done(error)
    }
  }
));

passport.serializeUser((user, done) => {
      return done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userManager.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});