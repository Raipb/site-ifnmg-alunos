const { PrismaClient } = require("@prisma/client");
const  bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    const senhaHash = await bcrypt.hash("123456", 10);

    await prisma.usuario.create({
        data: {
            nome: "Administrador",
            email: "admin@ifnmg.edu.br",
            senha: senhaHash,
        },
    });

    console.log("Administrador criado!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());