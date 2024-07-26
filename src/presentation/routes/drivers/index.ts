import { ListDriversController } from "@/presentation/controllers/drivers/list-drivers-controller";
import { Router } from "express";
import { middleware } from "apicache";

const router = Router();
const listDriversController = new ListDriversController();

const cache = middleware;

router.get("/drivers", cache("2 minutes"), listDriversController.handle);

export { router as DriversRouter };
