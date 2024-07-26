import type { Request, Response } from "express";
import { GetTeams } from "@/application/use-cases/get-teams";
import { TeamRepository } from "@/infra/repositories/team-repository";

export class ListTeamsController {
  async handle(req: Request, res: Response) {
    const { season, name } = req.query;
    const currentYear = new Date().getFullYear();
    const filter = {
      season: Number(season) || currentYear,
      name: name as string,
    };
    const repository = new TeamRepository();
    const getTeam = new GetTeams(repository);
    const teams = await getTeam.execute(filter);
    return res.json(teams).status(200);
  }
}
