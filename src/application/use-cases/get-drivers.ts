import type { DriversRepository } from "@/infra/repositories/drivers-repository";
import type { DriverFilterDto } from "../dtos/driver-filter-dto";

export class GetDrivers {
  constructor(private readonly repository: DriversRepository) {}

  async execute(filter?: DriverFilterDto) {
    const drivers = await this.repository.list(filter);
    return drivers.map(
      ({ created_at, updated_at, teamDrivers, ...output }) => ({
        ...output,
        team: teamDrivers[0].teams.name,
        team_id: teamDrivers[0].teams.id,
      }),
    );
  }
}
