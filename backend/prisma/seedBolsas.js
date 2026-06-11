const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.bolsa.deleteMany();

    await prisma.bolsa.createMany({
        data: [
            {
                nome: "Auxílio Permanência — R$ 140,00",
                descricao: "Apoio financeiro para estudantes em situação de vulnerabilidade socioeconômica que necessitam de suporte para se manter no curso.",
                valor: "R$ 140,00/mês",
                requisitos: "Vulnerabilidade socioeconômica comprovada e matrícula ativa",
                tipo: "Assistência",
                link: "https://www.ifnmg.edu.br/mais-noticias-almenara/723-almenara-noticias-2026",
            },
            {
                nome: "Auxílio Permanência — R$ 240,00",
                descricao: "Apoio financeiro para estudantes em situação de vulnerabilidade socioeconômica com necessidades adicionais de permanência.",
                valor: "R$ 240,00/mês",
                requisitos: "Vulnerabilidade socioeconômica comprovada, matrícula ativa e análise da assistência estudantil",
                tipo: "Assistência",
                link: "https://www.ifnmg.edu.br/mais-noticias-almenara/723-almenara-noticias-2026",
            },
            {
                nome: "Auxílio Permanência — R$ 500,00",
                descricao: "Apoio financeiro para estudantes em situação de alta vulnerabilidade socioeconômica, com prioridade para estudantes de cursos integrais.",
                valor: "R$ 500,00/mês",
                requisitos: "Alta vulnerabilidade socioeconômica comprovada, matrícula ativa e aprovação em edital específico",
                tipo: "Assistência",
                link: "https://www.ifnmg.edu.br/mais-noticias-almenara/723-almenara-noticias-2026",
            },
        ],
    });

    console.log("Bolsas inseridas com sucesso!");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });