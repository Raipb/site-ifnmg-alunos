require("dotenv").config();

const express = require("express");
const cors = require("cors");

const avisosRoutes = require("./Routes/avisos");
const authRoutes = require("./Routes/auth");
const editaisRoutes = require("./Routes/editais");
const cursosRoutes = require("./Routes/cursos");
const horariosRoutes = require("./Routes/horarios");
const contatoRoutes = require("./Routes/contatos");
const bolsasRoutes = require("./Routes/bolsas");

const app = express();

app.use(cors({
  origin: [
    "https://portal-do-ingressante-ifnmg.vercel.app",
    "http://localhost:5173"
  ]
}));
app.use(express.json());

app.use("/avisos", avisosRoutes);
app.use("/editais", editaisRoutes);
app.use("/auth", authRoutes);
app.use("/cursos", cursosRoutes);
app.use("/horarios", horariosRoutes);
app.use("/contatos", contatoRoutes);
app.use("/bolsas", bolsasRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});