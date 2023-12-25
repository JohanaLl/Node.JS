import passport from "passport";
import { usersManager } from "./dao/managers/usersManager.js";
import { Strategy as GithubStrategy } from "passport-github2";

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
                console.log(profile);
                console.log('email ', `${profile._json.login.toLowerCase()}@gmail.com`);
                const userDB = await usersManager.findByEmail(`${profile._json.login.toLowerCase()}@gmail.com`);
                console.log('userDB ', userDB);
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
                console.log('infoUser ', infoUser);
                const createUser = await usersManager.createOne(infoUser);
                done(null, createUser);
            } catch (error) {
                done(error)
            }
        }
    )
);

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await usersManager.findById(id);
      done(null, user);
  } catch (error) {
      done(error);
  }
});