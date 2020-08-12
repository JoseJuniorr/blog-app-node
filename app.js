//Carregando Módulos
const express = require("express");
const handlebars = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

//MongoDb connection
require("./src/database/connection");

const app = express();
// const mongoose = require("mongoose");

//Import da rotas
const admin = require("./routes/admin");

//Configurações

//Sessão
app.use(
  session({
    secret: `${process.env.SECRET_SESSION}`,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

//carregar pasta de arquivos estáticos
app.use(express.static("public"));

//Rotas
app.use("/admin", admin);

//Servidor
const PORT = 3005;

app.listen(PORT, () => {
  console.log("Servidor iniciado http://localhost:3005");
});
