const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/authMiddleware");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const cursos = await prisma.curso.findMany();

        res.json(cursos);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Erro ao buscar cursos",
        });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            titulo,
            modalidade,
            descricao,
            duracao,
            horario,
            nivel
        } = req.body;

        const curso = await prisma.curso.create({
            data: {
                titulo,
                modalidade,
                descricao,
                duracao,
                horario,
                nivel,
            },
        });

        res.status(201).json(curso);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Erro ao criar curso"
        });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const id = Number(req.params.id);

        const {
            titulo,
            modalidade,
            descricao,
            duracao,
            horario,
            nivel,
        } = req.body;

        const curso = await prisma.curso.update({
            where: {
                id,
            },
            data: {
                titulo,
                modalidade,
                descricao,
                duracao,
                horario,
                nivel,
            },
        });

        res.json(curso);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao atualizar curso",
        });
    }
});

router.delete("/:id", authMiddleware,  async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.curso.delete({
            where: {
                id,
            },
        });

        res.json({
            message: "Curso removido com sucesso",
        });
    } catch (error) {
        res.status(500).json({
            error:"Erro ao remover curso",
        });
    }
});

module.exports = router;