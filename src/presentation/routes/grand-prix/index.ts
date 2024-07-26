import { GrandPrixController } from "@/presentation/controllers/grand-prix";
import { Router } from "express";
import { middleware } from "apicache";

const router = Router();
const cache = middleware;
const grandPrixController = new GrandPrixController();

router.get("/grand-prix", cache("2 minutes"), grandPrixController.handle);

export { router as GrandPrixRouter };
