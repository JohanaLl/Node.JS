import jwt from "jsonwebtoken";
const SECRET_KEY_JWT = "secretJWT";

//objener token de los headers
// export const jwtValidation = (req, res, next) => {
//     try {
//         const authHeader = req.get('Authorization')
//         const token = authHeader.split(" ")[1];
//         console.log('authorization ', token);
//         const userToken = jwt.verify(token, SECRET_KEY_JWT);
//         req.user = userToken;
//         next();
//     } catch (error) {
//         res.json({ error: error.message })
//     }
// }

//obtener token de las cookies
export const jwtValidation = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(req);
        const userToken = jwt.verify(token, SECRET_KEY_JWT);
        req.user = userToken;
        next();
    } catch (error) {
        res.json({ error: error.message });
    }
}