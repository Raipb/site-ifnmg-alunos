const express = require("express");
const cors = require("cors");

const avisosRoutes = require("./Routes/avisos");
const authRoutes = require("./Routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/avisos", avisosRoutes);

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});