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
    const express = require("express");
    const router = express.Router();
    const { PrismaClient } = require("@prisma/client");

    const prisma = new PrismaClient();

    router.get("/", async (req, res) => {
        try {
            const horarios = await prisma.horario.findMany();
            res.json(horarios);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar horários" });
        }
    });

    router.post("/", async (req, res) => {
        try {
            const { titulo, descricao, tipo, link } = req.body;
            const horario = await prisma.horario.create({
                data: { titulo, descricao, tipo, link },
            });
            res.status(201).json(horario);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar horário" });
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { titulo, descricao, tipo, link } = req.body;
            const horario = await prisma.horario.update({
                where: { id },
                data: { titulo, descricao, tipo, link },
            });
            res.json(horario);
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar horário" });
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);
            await prisma.horario.delete({ where: { id } });
            res.json({ message: "Horário removido com sucesso" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao remover horário" });
        }
    });

    module.exports = router;
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