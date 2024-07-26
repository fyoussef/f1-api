import { GetGrandPrix } from "@/application/use-cases/get-grand-prix";
import { GrandPrixRepository } from "@/infra/repositories/grand-prix-repository";
import type { Request, Response } from "express";

export class GrandPrixController {
  async handle(req: Request, res: Response) {
    const { season } = req.query;
    const repository = new GrandPrixRepository();
    const getGrandPrix = new GetGrandPrix(repository);
    const currentYear = new Date().getFullYear();
    const grandPrix = await getGrandPrix.execute({
      season: season ? Number(season) : currentYear,
    });
    return res.json(grandPrix).status(200);
  }
}
