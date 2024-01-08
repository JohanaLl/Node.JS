
// export const authMiddleware = (req, res, next) => {
//     const { user } = req;
//     if (user.email === "ppassport@mail.com") {
//         next();
//     } else {
//         res.send("Not authorized");
//     }
// };

//UN SOLO ROL
// export const authMiddleware = (role) => {
//     return (req, res, next) => {
//         if (req.user.role !== role) {
//             return res.status(403).json('Not authorized')
//         }
//         next();
//     }
// }

//vARIOS ROLES
export const authMiddleware = (roles) => {
    return (req, res, next) => {
        if (roles.includes("PUBLIC")) {
            return next();
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json('Not authorized')
        }
        next();
    }
}