import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); //allows Express to identify configured routes.

router.post("/login", login); 

export default router;