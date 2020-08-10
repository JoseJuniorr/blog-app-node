//Carregando Módulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
// const mongoose = require("mongoose");

//Import da rotas
const admin = require("./routes/admin");

//Configurações
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Mongoose

//Rotas
app.use("/admin", admin);

//Servidor
const PORT = 3005;

app.listen(PORT, () => {
  console.log("Servidor iniciado http://localhost:3005");
});
