const express = require("express");
const router = express.Router();

const editais = require("../data/editais");

router.get("/", (req, res) => {
    res.json(editais);
});

router.post("/", (req, res) => {
    const { titulo, descricao, data, status, link } = req.body;

    const novoEdital = {
        id: Date.now(),
        titulo,
        descricao,
        data,
        status,
        link,
    };

    editais.push(novoEdital);

    res.status(201).json(novoEdital);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const edital = editais.find((e) => e.id === id);

    if (!edital) {
        return res.status(404).json({
            error: "Edital não encontrado",
        });
    }

    edital.titulo = req.body.titulo;
    edital.descricao = req.body.descricao;
    edital.data = req.body.data;
    edital.status = req.body.status;
    edital.link = req.body.link;

    res.json(edital);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = editais.findIndex((e) => e.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Edital não encontrado",
        });
    }

    editais.splice(index, 1);

    res.json({
        message: "Edital removido com sucesso",
    });
});

module.exports = router;