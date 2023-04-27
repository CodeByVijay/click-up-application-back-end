import { Register } from "../controller/UserController.js";
import express, { json } from "express";
const router = express.Router();

router.post('/api/register',Register)

// router.all('*',(req,res)=>{
// res.status(200).send("<h1>Page not found.</h1>");
// })
export default router;