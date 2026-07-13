import express from "express";
import cors from "cors";

import routes from "./routes/index.js";


const app = express();

/*
  CORS leidžia React frontend
  jungtis prie backend.

  Development:

  React:
  localhost:5173

  API:
  localhost:5000

  Vėliau produkcijoje apribosime
  tik savo domenui.
*/

app.use(
  cors()
);

/*
  Leidžia Express priimti JSON duomenis.

  Pvz. iš React:

  {
    companyName: "Lengvas kodas MB",
    email: "info@lengvaskodas.lt"
  }

*/

app.use(
  express.json()
);

/*
  API versijavimas.

  Visi pagrindiniai API keliai
  prasidės nuo:

  /api/v1

  Pavyzdžiai:

  /api/v1/auth
  /api/v1/company

*/

app.use(
  "/api/v1",
  routes
);

/*
  Pagrindinis testinis maršrutas.

  Patikrinimui, kad serveris veikia.

*/

app.get(
  "/",
  (req, res) => {

    res.json({
      message: "MB-serveris API veikia",
    });

  }
);

export default app;