const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/authMiddleware");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const avisos = await prisma.aviso.findMany();
    res.json(avisos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar avisos" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const aviso = await prisma.aviso.create({
      data: { title, description, type },
    });
    res.status(201).json(aviso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar aviso" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, type } = req.body;
    const aviso = await prisma.aviso.update({
      where: { id },
      data: { title, description, type },
    });
    res.json(aviso);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aviso" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.aviso.delete({ where: { id } });
    res.json({ message: "Aviso removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover aviso" });
  }
});

module.exports = router;