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

  //[GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById({ _id: req.params.id })
      .then((course) => res.render("courses/edit", { course: mongooseToObject(course) }))
      .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  //[DELETE] /courses/:id
  destroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new CourseController();
