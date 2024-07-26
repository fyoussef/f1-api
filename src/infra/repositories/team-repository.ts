import type { TeamFilterDto } from "@/application/dtos/team-filter-dto";
import { prisma } from "../database/prisma";

export class TeamRepository {
  async list(filter?: TeamFilterDto) {
    const season = await prisma.season.findFirst({
      where: { year: filter?.season },
    });
    const teams = await prisma.teams.findMany({
      where: {
        teamDrivers: {
          some: {
            season_id: season?.id,
          },
        },
        name: filter?.name && {
          contains: filter?.name,
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return teams.map(({ created_at, updated_at, ...output }) => output);
  }
}
