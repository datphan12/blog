const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  // [GET] /courses/:slug
  async show(req, res, next) {
    await Course.findOne({ slug: req.params.slug })
      .then((course) => res.render("courses/show", { course: mongooseToObject(course) }))
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }
  //[POST] /courses/store
  async store(req, res, next) {
    try {
      const formData = req.body;
      formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCML-byK5TPhWN_-ZuZal4h5KasYw`;

      const course = new Course(formData);
      await course.save();

      res.redirect("/");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new CourseController();
