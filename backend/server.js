const express = require("express");
const cors = require("cors");

const avisosRoutes = require("./Routes/avisos");
const authRoutes = require("./Routes/auth");
const editaisRoutes = require("./Routes/editais");
const cursosRoutes = require("./Routes/cursos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/avisos", avisosRoutes);
app.use("/editais", editaisRoutes);
app.use("/auth", authRoutes);
app.use("/cursos", cursosRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});