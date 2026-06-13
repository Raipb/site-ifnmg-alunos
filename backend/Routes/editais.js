const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/authMiddleware");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const editais = await prisma.edital.findMany();
        res.json(editais);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar editais" });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { titulo, descricao, data, status, link } = req.body;
        const edital = await prisma.edital.create({
            data: { titulo, descricao, data, status, link },
        });
        res.status(201).json(edital);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar edital" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { titulo, descricao, data, status, link } = req.body;
        const edital = await prisma.edital.update({
            where: { id },
            data: { titulo, descricao, data, status, link },
        });
        res.json(edital);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar edital" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.edital.delete({ where: { id } });
        res.json({ message: "Edital removido com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover edital" });
    }
});

module.exports = router;