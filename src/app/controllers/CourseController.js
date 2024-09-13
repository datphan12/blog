const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  // [GET] /courses/:slug
  async show(req, res, next) {
    await Course.findOne({ slug: req.params.slug })
      .then((course) => res.render("courses/show", { course: mongooseToObject(course) }))
      .catch(next);
  }
}

module.exports = new CourseController();
