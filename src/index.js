const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;
const route = require("./routes/index");
const db = require("./config/db/index");
const methodOverride = require("method-override");
const sortMiddleware = require("./app/middlewares/SortMiddleware");

// Connect db
db.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//using middleware
app.use(sortMiddleware);

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,

      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
          default: 'bi bi-chevron-expand',
          desc: 'bi bi-sort-down',
          asc: 'bi bi-sort-down-alt',
        }

        const types = {
          default: 'desc',
          desc: 'asc',
          asc: 'desc',
        }

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
            <i class="${icon}"></i>
          </a>`;
      }
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Route init
route(app);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
