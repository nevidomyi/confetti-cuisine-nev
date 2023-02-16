const usersController = require("../controllers/usersController");

const router = require("express").Router(),
    coursesController = require("../controllers/coursesController"),
    userConroller = require("../controllers/usersController");

router.use(usersController.verifyJWT);
router.post("/login", usersController.apiAuthenticate);
router.use(coursesController.errorJSON);
router.get("/courses", coursesController.index, coursesController.filterUserCourses, coursesController.respondJSON);
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);

module.exports = router;