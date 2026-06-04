const express = require("express");
const router = express.Router();

const horarios = require("../Data/horarios");

router.get("/", (req, res) => {
    res.json(horarios);
});

router.post("/", (req, res) => {
    const { titulo, descricao, tipo, link } = req.body;

    const novoHorario = {
        id: Date.now(),
        titulo,
        descricao,
        tipo,
        link,
    };

    horarios.push(novoHorario);

    res.status(201).json(novoHorario);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const horario = horarios.find((h) => h.id === id);

    if (!horario) {
        return res.status(404).json({
            error: "Horário não encontrado",
        });
    }

    horario.titulo = req.body.titulo;
    horario.descricao = req.body.descricao;
    horario.tipo = req.body.tipo;
    horario.link = req.body.link;

    res.json(horario);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = horarios.findIndex((h) => h.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Horário não encontrado",
        });
    }

    horarios.splice(index, 1);

    res.json({
        message: "Horário removido com sucesso",
    });
});

module.exports = router;