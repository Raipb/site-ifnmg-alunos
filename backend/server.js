const express = require("express");
const cors = require("cors");

const avisosRoutes = require("./Routes/avisos");
const authRoutes = require("./Routes/auth");
const avisosRoutes = require("./Routes/avisos");
const editaisRoutes = require("./Routes/editais");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/avisos", avisosRoutes);
app.use("/editais", editaisRoutes);

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});