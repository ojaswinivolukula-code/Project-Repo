import express from "express";

import {
  getBalance,
  transferMoney,
  getStatement,
} from "../controllers/accountController.js";

import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/balance", auth, getBalance);
router.post("/transfer", auth, transferMoney);
router.get("/statement", auth, getStatement);

export default router;
