import type { GrandPrixFilterDto } from "@/application/dtos/grand-prix-filter-dto";
import { prisma } from "../database/prisma";

export class GrandPrixRepository {
  async list(filter?: GrandPrixFilterDto) {
    const season = await prisma.season.findFirst({
      where: { year: filter?.season },
    });
    const gpSeason = await prisma.grandPrixSeason.findMany({
      where: {
        season_id: season?.id,
      },
      select: {
        grandPrix: {
          select: {
            name: true,
          },
        },
        events: {
          select: {
            name: true,
            start_at: true,
          },
        },
      },
    });
    return gpSeason;
  }
}
