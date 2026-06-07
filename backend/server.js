require("dotenv").config();

const express = require("express");
const cors = require("cors");

const avisosRoutes = require("./Routes/avisos");
const authRoutes = require("./Routes/auth");
const editaisRoutes = require("./Routes/editais");
const horariosRoutes = require("./Routes/horarios");
const contatoRoutes = require("./Routes/contatos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/avisos", avisosRoutes);
app.use("/editais", editaisRoutes);
app.use("/horarios", horariosRoutes);
app.use("/auth", authRoutes);
app.use("/contatos", contatoRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
