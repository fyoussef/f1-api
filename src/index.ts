import express from "express";
import cors from "cors";
import { TeamsRouter } from "./presentation/routes/teams";
import { DriversRouter } from "./presentation/routes/drivers";
import { GrandPrixRouter } from "./presentation/routes/grand-prix";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", TeamsRouter, DriversRouter, GrandPrixRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => `✔ Server is running!`);
