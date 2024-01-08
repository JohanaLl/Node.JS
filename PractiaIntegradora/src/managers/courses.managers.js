import { coursesModel } from "../db/models/courses.model.js";
import BasicManger from "./basic.manager.js";

class CoursesManager extends BasicManger {

    constructor() {
        super(coursesModel, ['teacher', 'students']);
    }
}

export const coursesManager = new CoursesManager();