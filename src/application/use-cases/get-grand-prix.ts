import type { GrandPrixRepository } from "@/infra/repositories/grand-prix-repository";
import type { GrandPrixFilterDto } from "../dtos/grand-prix-filter-dto";

export class GetGrandPrix {
  constructor(private grandPrixRepository: GrandPrixRepository) {}

  async execute(filter?: GrandPrixFilterDto) {
    const grandPrix = await this.grandPrixRepository.list(filter);
    for (const gp of grandPrix) {
      gp.events = gp.events.map((value) => {
        return {
          ...value,
          start_at: value.start_at,
        };
      });
    }
    return grandPrix;
  }
}
