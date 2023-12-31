export const authMiddleware = (req, res, nex) => {
    const { age } = req.body;
    if (age < 18) {
        return res.status(401).json({ message: "You need to be 18 or older"});
    }
    next();
}