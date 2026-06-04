const express = require("express");
const cors = require("cors");

const avisosRoutes = require("./routes/avisos");
const editaisRoutes = require("./routes/editais");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/avisos", avisosRoutes);
app.use("/editais", editaisRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
