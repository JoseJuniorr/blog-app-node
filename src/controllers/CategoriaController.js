const mongoose = require("mongoose");

require("../models/Categoria");
const Categoria = mongoose.model("categorias");

class CategoriaController {
  //Listar conteúdo da categoria no formulário de edição
  async show(req, res) {
    Categoria.findOne({ _id: req.params.id })
      .then((categoria) => {
        res.render("admin/edit-categorias", { categoria: categoria });
      })
      .catch((err) => {
        req.flash("error_msg", "Esta categoria não existe!");
        res.redirect("/admin/categorias");
      });
  }

  async store(req, res) {
    var erros = [];

    if (
      !req.body.nome ||
      typeof req.body.nome == undefined ||
      req.body.nome == null
    ) {
      erros.push({ text: "Nome inválido!" });
    }
    if (
      !req.body.slug ||
      typeof req.body.slug == undefined ||
      req.body.slug == null
    ) {
      erros.push({ text: "Slug inválido!" });
    }

    if (req.body.nome.length < 2) {
      erros.push({ text: "Nome muito curto!" });
    }

    if (erros.length > 0) {
      res.render("admin/add-categorias", { erros: erros });
    } else {
      const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug,
      };

      new Categoria(novaCategoria)
        .save()
        .then(() => {
          req.flash("success_msg", "Categoria criada com sucesso!");
          res.redirect("/admin/categorias");
        })
        .catch((err) => {
          req.flash("erro_msg", "Erro ao salvar a categoria");
          res.redirect("/admin");
        });
    }
  }

  async index(req, res) {
    Categoria.find()
      .sort({ updatedAt: "desc" })
      .then((categorias) => {
        res.render("admin/categorias", { categorias: categorias });
      })
      .catch((err) => {
        req.flash("error_msg", "Erro ao listar as categorias!");
        res.redirect("/admin");
      });
  }

  async update(req, res) {
    Categoria.findOne({ _id: req.body.id })
      .then((categoria) => {
        categoria.nome = req.body.nome;
        categoria.slug = req.body.slug;

        categoria
          .save()
          .then(() => {
            req.flash("success_msg", "Categoria editada com sucesso!");
            res.redirect("/admin/categorias");
          })
          .catch((err) => {
            req.flash("error_msg", "Erro ao salvar a edição da categoria!");
            res.redirect("/admin/categorias");
          });
      })
      .catch((err) => {
        req.flash("error_msg", "Erro ao editar a categoria!");
        res.redirect("/admin/categorias");
      });
  }
}

module.exports = new CategoriaController();
