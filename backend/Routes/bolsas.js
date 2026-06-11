const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/authMiddleware");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const bolsas = await prisma.bolsa.findMany();
        res.json(bolsas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar bolsas" });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { nome, descricao, valor, requisitos, tipo, link } = req.body;
        const bolsa = await prisma.bolsa.create({
            data: { nome, descricao, valor, requisitos, tipo, link },
        });
        res.status(201).json(bolsa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar bolsa" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, descricao, valor, requisitos, tipo, link } = req.body;
        const bolsa = await prisma.bolsa.update({
            where: { id },
            data: { nome, descricao, valor, requisitos, tipo, link },
        });
        res.json(bolsa);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar bolsa" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.bolsa.delete({ where: { id } });
        res.json({ message: "Bolsa removida com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover bolsa" });
    }
});

module.exports = router;