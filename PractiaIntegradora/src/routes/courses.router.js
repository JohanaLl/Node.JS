import { Router } from "express";
import { coursesManager } from "../managers/courses.managers.js";
import passport from "passport";

const router = Router();

router.post("/", passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
    const { name } = req.body;
    if (req.user.role === 'STUDENTS') {
        return res.status(403).json({ message: 'Not authorized'})
    }
    if (!name) {
        return res.status(400).json({ message: 'Name is missing'})
    }
    try {
        const createdCourse = await coursesManager.createdOne(req.body);
        res.status(200).json({ message: "Course created", course: createdCourse});
    } catch (error) {
        res.status(500).json({ error });
    }
})

export default router;