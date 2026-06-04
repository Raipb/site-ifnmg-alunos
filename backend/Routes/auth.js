const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await prisma.usuario.findUnique({
            where: {
                email,
            },
        });
        
        if (!usuario) {
            return res.status(401).json({
                error: "Email ou senha inválidos",
            });
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                error: "Email ou senha inválidos",
            });
        }

        const token = jwt.sign(
            {
                id:  usuario.id,
                email: usuario.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );

        res.json({
            token,
            nome: usuario.nome,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Erro interno do servidor",
        });
    }
});

module.exports = router;