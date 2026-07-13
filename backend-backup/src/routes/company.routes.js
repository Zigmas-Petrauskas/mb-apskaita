import { Router } from "express";
import { registerCompany } from "../controllers/company.controller.js";

const router = Router();

/*
    Įmonės registracija

    POST:

    /api/v1/company/register

*/

router.post("/register", registerCompany);
/*
router.get("/test", (req, res) => {
    res.json({ message: "Company route veikia" });
});
*/
export default router;