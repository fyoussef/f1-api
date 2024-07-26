import express from "express";
import cors from "cors";
import { TeamsRouter } from "./presentation/routes/teams";
import { DriversRouter } from "./presentation/routes/drivers";
import { GrandPrixRouter } from "./presentation/routes/grand-prix";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", TeamsRouter, DriversRouter, GrandPrixRouter);

app.listen(3000, () => `✔ Server is running!`);
