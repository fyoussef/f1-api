import type { DriverFilterDto } from "@/application/dtos/driver-filter-dto";
import { prisma } from "../database/prisma";

export class DriversRepository {
  async list(filter?: DriverFilterDto) {
    const season = await prisma.season.findFirst({
      where: { year: filter?.season },
    });
    const drivers = await prisma.drivers.findMany({
      where: {
        teamDrivers: {
          some: {
            season_id: season?.id,
            team_id: filter?.teamId,
            teams: {
              name: {
                contains: filter?.teamName,
              },
            },
          },
        },
        name: filter?.name && {
          contains: filter?.name,
        },
      },
      include: {
        teamDrivers: {
          where: {
            season_id: season?.id,
          },
          select: {
            teams: {
              select: { name: true, id: true },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return drivers;
  }
}
