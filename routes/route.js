import { Register,Login } from "../controller/UserController.js";
import express, { json } from "express";
const router = express.Router();

router.post("/api/register", Register);
router.post("/api/login", Login);

router.all("*", (req, res) => {
  res.status(200).json({ result: "failed", msg: "url not found." });
});
export default router;