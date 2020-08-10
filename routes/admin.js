const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("rota raiz do ADM");
});

router.get("/posts", (req, res) => {
  res.send("pagina de posts");
});

router.get("/categorias", (req, res) => {
  res.send("pagina de categorias");
});

module.exports = router;