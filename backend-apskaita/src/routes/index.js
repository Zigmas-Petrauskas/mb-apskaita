import { Router } from "express";
import authRoutes from "./auth.routes.js";
import companyRoutes from "./company.routes.js";

const router = Router();

/*
  Visi auth keliai:

  /api/v1/auth/...

*/

router.use("/auth", authRoutes);

/*
  Visi company keliai:

  /api/v1/company/...

*/

router.use("/company", companyRoutes);

export default router;