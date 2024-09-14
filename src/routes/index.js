const newsRouter = require("./news.route");
const siteRouter = require("./site.route");
const coursesRouter = require("./courses.route");
const meRouter = require("./me.route");

const route = (app) => {
  app.use("/news", newsRouter);
  app.use("/courses", coursesRouter);
  app.use("/me", meRouter);
  app.use("/", siteRouter);
};

module.exports = route;
