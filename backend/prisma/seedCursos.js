const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Limpa cursos existentes
    await prisma.curso.deleteMany();

    await prisma.curso.createMany({
        data: [
            {
                titulo: "Técnico em Administração Integrado ao Ensino Médio",
                modalidade: "Presencial",
                descricao: "O curso Técnico em Administração integrado ao Ensino Médio forma alunos críticos e participativos, preparados para aplicar conhecimentos de gestão e contribuir com a sociedade e o mercado de trabalho.",
                duracao: "3 anos",
                horario: "Integral – matutino e vespertino",
                nivel: "Técnico",
            },
            {
                titulo: "Técnico em Zootecnia Integrado ao Ensino Médio",
                modalidade: "Presencial",
                descricao: "Profissional capacitado para atuar na produção agrícola e animal, com foco em manejo, sustentabilidade e gestão rural.",
                duracao: "3 anos",
                horario: "Integral – matutino e vespertino",
                nivel: "Técnico",
            },
            {
                titulo: "Técnico em Agropecuária",
                modalidade: "Presencial Integrado ao Ensino Médio em Regime de Alternância",
                descricao: "O curso Técnico em Agropecuária forma profissionais capazes de atuar na produção vegetal e animal, manejo do solo e gestão rural, integrando teoria e prática com foco no desenvolvimento sustentável.",
                duracao: "3 anos",
                horario: "Integral",
                nivel: "Técnico",
            },
            {
                titulo: "Técnico em Informática Integrado ao Ensino Médio",
                modalidade: "Presencial",
                descricao: "O curso Técnico em Informática forma profissionais capazes de aplicar conhecimentos teóricos e práticos em tecnologia, contribuindo para o mercado de trabalho e a sociedade.",
                duracao: "3 anos",
                horario: "Integrado",
                nivel: "Técnico",
            },
            {
                titulo: "Técnico em Enfermagem Subsequente",
                modalidade: "Presencial",
                descricao: "Forma profissionais para atuar no cuidado à saúde com ética e qualidade.",
                duracao: "2 anos",
                horario: "Noturno",
                nivel: "Técnico",
            },
            {
                titulo: "Bacharelado em Engenharia Agronômica",
                modalidade: "Presencial",
                descricao: "O curso de Engenharia Agronômica forma profissionais capazes de atuar no manejo do solo, produção agrícola e gestão rural, com foco no desenvolvimento sustentável.",
                duracao: "10 semestres",
                horario: "Integral",
                nivel: "Superior",
            },
            {
                titulo: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
                modalidade: "Presencial",
                descricao: "O curso de Análise e Desenvolvimento de Sistemas forma profissionais capacitados para desenvolver e implantar soluções computacionais, atuando em diversas áreas da tecnologia.",
                duracao: "3 anos",
                horario: "Noturno",
                nivel: "Superior",
            },
            {
                titulo: "Superior de Tecnologia em Processos Gerenciais",
                modalidade: "Presencial",
                descricao: "O curso de Processos Gerenciais forma profissionais preparados para atuar na gestão de empresas, com foco prático em administração e tomada de decisões no mercado.",
                duracao: "2 anos e meio",
                horario: "Noturno",
                nivel: "Superior",
            },
        ],
    });

    console.log("Cursos inseridos com sucesso!");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });