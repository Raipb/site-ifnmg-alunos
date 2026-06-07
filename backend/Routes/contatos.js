const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const contatos = await prisma.contato.findMany();
  res.json(contatos);
});

router.post("/", async (req, res) => {
  const contato = await prisma.contato.create({
    data: req.body,
  });

  res.status(201).json(contato);
});

router.put("/:id", async (req, res) => {
  const contato = await prisma.contato.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });

  res.json(contato);
});

router.delete("/:id", async (req, res) => {
  await prisma.contato.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.status(204).send();
});

module.exports = router;
