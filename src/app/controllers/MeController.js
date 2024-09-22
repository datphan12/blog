const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery, Course.countDocumentsWithDeleted({ deleted: true })])
      .then((values) => {
        res.render("me/stored-courses", {
          deletedCount: values[1],
          courses: multipleMongooseToObject(values[0]),
        });
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
