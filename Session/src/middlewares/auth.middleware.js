
export const authMiddleware = (req, res, next) => {
    const { user } = req;
    if (user.email === "ppassport@mail.com") {
        next();
    } else {
        res.send("Not authorized");
    }
};