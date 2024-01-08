//obtener token de las cookies
import jwt from "jsonwebtoken";
const SECRET_KEY_JWT = "secretJWT";

//obtener token de las cookies
export const jwtValidation = (req, res, next) => {
    try {
        console.log("jwtValidation", req);
        const token = req.cookies.token;
        const userToken = jwt.verify(token, SECRET_KEY_JWT);
        req.user = userToken;
        next();
    } catch (error) {
        res.json({ error: error.message });
    }
}