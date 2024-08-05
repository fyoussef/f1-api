import express from "express";
import cors from "cors";
import { TeamsRouter } from "./presentation/routes/teams";
import { DriversRouter } from "./presentation/routes/drivers";
import { GrandPrixRouter } from "./presentation/routes/grand-prix";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", TeamsRouter, DriversRouter, GrandPrixRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res) => {
  res.status(404);
  res.json({
    error: "Not Found",
    message: `To see available routes, access: ${req.protocol}://${req.hostname == "localhost" ? req.hostname + ":" + PORT : req.hostname}/api-docs`,
  });
});

app.listen(3000, () => console.log(`✔ Server is running!`));
