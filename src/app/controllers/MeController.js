const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}), Course.countDocumentsWithDeleted({ deleted: true })])
      .then(values => {
        res.render("me/stored-courses", {
          deletedCount: values[1],
          courses: multipleMongooseToObject(values[0])
        })
      })
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) =>
        res.render("me/trash-courses", { courses: multipleMongooseToObject(courses) })
      )
      .catch(next);
  }
}

module.exports = new MeController();
