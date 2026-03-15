import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);

app.get("/", (req, res) => {
  res.send("Api running");
});
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
