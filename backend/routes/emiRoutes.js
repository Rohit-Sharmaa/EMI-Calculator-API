import express from "express";
import {
  calculateEmi,
  getAllEmis,
  getEmiById,
} from "../controllers/emiController.js";

const router = express.Router();

router.post("/calculate-emi", calculateEmi);
router.get("/emis", getAllEmis);
router.get("/emi/:id", getEmiById);

export default router;
