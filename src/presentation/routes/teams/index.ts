import { ListTeamsController } from "@/presentation/controllers/teams/list-teams-controller";
import { Router } from "express";
import { middleware } from "apicache";

const router = Router();
const cache = middleware;

const listTeamsController = new ListTeamsController();

router.get("/teams", cache("2 minutes"), listTeamsController.handle);

export { router as TeamsRouter };
