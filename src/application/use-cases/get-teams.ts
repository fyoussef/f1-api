import type { TeamRepository } from "@/infra/repositories/team-repository";
import type { TeamFilterDto } from "../dtos/team-filter-dto";

export class GetTeams {
  constructor(private readonly teamRepository: TeamRepository) {}

  async execute(filter?: TeamFilterDto) {
    return this.teamRepository.list(filter);
  }
}
