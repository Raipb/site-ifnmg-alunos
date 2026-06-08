const { PrismaClient } = require('@prisma/client'); 
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const senhaHash = await bcrypt.hash('123456', 10);

    await prisma.usuario.deleteMany(); // Limpa a tabela de usuários antes de criar o admin

    await prisma.usuario.create({
        data: {
            nome: 'Admin',
            email: 'admin@ifnmg.edu.br',
            senha: senhaHash,
        },
    });

    console.log('Usuário admin criado com sucesso!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });