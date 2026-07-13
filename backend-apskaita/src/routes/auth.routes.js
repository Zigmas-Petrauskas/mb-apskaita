import { Router } from "express";
import { loginUser } from "../controllers/auth.controller.js";

const router = Router();

/*
    POST

    /api/v1/auth/login


    Vartotojo prisijungimas.
*/

router.post("/login", loginUser);

export default router;