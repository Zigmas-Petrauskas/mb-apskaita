import { Router } from "express";

const router = Router();

router.get("/test", (req, res) => {
    res.json({ message: "Company route veikia" });
});

export default router;