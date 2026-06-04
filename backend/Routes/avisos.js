const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const avisos = require("../data/avisos");

router.get("/", (req, res) => {
  res.json(avisos);
});

router.delete("/:id", authMiddleware, (req, res) => {
  const id = Number(req.params.id);

  const index = avisos.findIndex((aviso) => aviso.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Aviso não encontrado",
    });
  }

  avisos.splice(index, 1);

  res.json({
    message: "Aviso removido com sucesso",
  });
});

router.post("/", authMiddleware, (req, res) => {
  const { title, description, type } = req.body;

  const novoAviso = {
    id: Date.now(),
    title,
    description,
    type,
  };

  avisos.push(novoAviso);

  res.status(201).json(novoAviso);
});

router.put("/:id", authMiddleware, (req, res) => {
  const id = Number(req.params.id);

  const { title, description, type } = req.body;

  const aviso = avisos.find((aviso) => aviso.id === id);

  if (!aviso) {
    return res.status(404).json({
      error: "Aviso não encontrado",
    });
  }

  aviso.title = title;
  aviso.description = description;
  aviso.type = type;

  res.json(aviso);
});

module.exports = router;
