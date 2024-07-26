import { GetDrivers } from "@/application/use-cases/get-drivers";
import { DriversRepository } from "@/infra/repositories/drivers-repository";
import type { Request, Response } from "express";

export class ListDriversController {
  async handle(req: Request, res: Response) {
    const { season, name, teamId, teamName } = req.query;
    const repository = new DriversRepository();
    const getDrivers = new GetDrivers(repository);
    const currentYear = new Date().getFullYear();
    const drivers = await getDrivers.execute({
      season: season ? Number(season) : currentYear,
      name: name as string,
      teamId: teamId as string,
      teamName: teamName as string,
    });
    return res.json(drivers).status(200);
  }
}
