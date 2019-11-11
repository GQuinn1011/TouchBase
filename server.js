/* SETUP HANDLEBARS SERVER */
var express = require("express");
var path = require("path");
var PORT = process.env.PORT || 8080;
var exphbs = require("express-handlebars");
var routes = require("./controllers/catsController.js");
var app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
