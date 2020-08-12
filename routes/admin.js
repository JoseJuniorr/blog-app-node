const express = require("express");
const router = express.Router();

const CategoriaController = require("../src/controllers/CategoriaController");

//Rota para a view admin
router.get("/", (req, res) => {
  res.render("admin/admin");
});

//View Add categorias
router.get("/categorias/add", (req, res) => {
  res.render("admin/add-categorias");
});

//CRUD de categorias
//Cadastrar Categoria
router.post("/categorias/nova", CategoriaController.store);
//Listar todas Categorias
router.get("/categorias", CategoriaController.index);
//Editar Categoria
//Listar conteúdo no form de edição
router.get("/categorias/edit/:id", CategoriaController.show);
//atualizar a categoria
router.post("/categorias/edit", CategoriaController.update);

// router.post("/categorias/deletar/:id", CategoriaController.delete);

module.exports = router;
