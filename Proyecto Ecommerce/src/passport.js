import passport from "passport";
import { usersManager } from "./dao/managers/usersManager.js";
import { Strategy as GithubStrategy } from "passport-github2";

//GitHub
passport.use('github', 
    new GithubStrategy(
        {
            clientID: "Iv1.e612a63cdcfa9ef7",
            clientSecret: "48dc4ff8fdde6f21fa966fa8f572e2134088d33d",
            callbackURL: "http://localhost:8080/api/session/callback",
        }, 
        async (accessToken, refreshToken, profile, done) =>{
            try {
                console.log(profile._json.email);
                console.log('email ', `${profile._json.login.toLowerCase()}@gmail.com`);
                var email = "";
                if (profile._json.email !== null) {
                    email = profile._json.email;
                } else {
                    email = `${profile._json.login.toLowerCase()}@gmail.com`;
                }
                const userDB = await usersManager.findByEmail(email);
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

// const fromCookies = (req) => {
//     return req.cookies.token;
// }

//Generar Token
// passport.use('jwt', new JWTStrategy({
//     jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
//     secretOrKey: SECRETJWT,
// }, (jwt_payload, done) => {
//     done(null, jwt_payload);    
// }))

//Obtener usuario asociado a Token
// passport.use('jwt-cookie', 
//     new CustomStrategy({}, async (req, done) => {
//         try {
//             const token = req.cookies[req.cookies];
//             if (!token) {
//                 return done(null, false); // No token found
//             }

//             const payload = jwt.verify(token, "secretJWT"); // Usa tu secret key aquí
//             const user = await findUser(payload);
            
//         } catch (error) {
            
//         }
// }))

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