import { readFileSync } from "fs";
import { prisma } from "./infra/database/prisma";

const addSeasons = async () => {
  await prisma.season.createMany({
    data: [{ year: 2024 }, { year: 2023 }],
  });
};

const readJSONFile = (path: string) =>
  JSON.parse(readFileSync(path).toString());

const addTeams = async () => {
  const teams2024: string[] = readJSONFile("_data/2024/teams.json");
  const teams2023: string[] = readJSONFile("_data/2023/teams.json");
  for (const team of [...teams2024, ...teams2023]) {
    const exist = await prisma.teams.findFirst({
      where: {
        name: team,
      },
    });
    if (exist) continue;
    await prisma.teams.create({ data: { name: team } });
  }
};

const addDrivers = async () => {
  const drivers2024: string[] = readJSONFile("_data/2024/drivers.json");
  const drivers2023: string[] = readJSONFile("_data/2023/drivers.json");
  for (const driver of [...drivers2024, ...drivers2023]) {
    const exist = await prisma.drivers.findFirst({
      where: {
        name: driver,
      },
    });
    if (exist) continue;
    await prisma.drivers.create({ data: { name: driver } });
  }
};

const getSeason = async (year: number) =>
  await prisma.season.findFirst({ where: { year } });

const addGrandPrix = async () => {
  const grandPrix2024: string[] = readJSONFile("_data/2024/grand-prix.json");
  const grandPrix2023: string[] = readJSONFile("_data/2023/grand-prix.json");
  for (const gp of grandPrix2024) {
    const exist = await prisma.grandPrix.findFirst({
      where: {
        name: gp,
      },
    });
    const season2024 = await getSeason(2024);
    const gpCreated = exist
      ? exist
      : await prisma.grandPrix.create({ data: { name: gp } });
    await prisma.grandPrixSeason.create({
      data: { grand_prix_id: gpCreated.id, season_id: season2024?.id! },
    });
  }
  for (const gp of grandPrix2023) {
    const exist = await prisma.grandPrix.findFirst({
      where: {
        name: gp,
      },
    });
    const season2023 = await getSeason(2023);
    const gpCreated = exist
      ? exist
      : await prisma.grandPrix.create({ data: { name: gp } });
    await prisma.grandPrixSeason.create({
      data: { grand_prix_id: gpCreated.id, season_id: season2023?.id! },
    });
  }
};

const addTeamDriver = async () => {
  const teamDrivers2024: { name: string; team: string }[] = readJSONFile(
    "_data/2024/team-drivers.json",
  );
  const teamDrivers2023: { name: string; team: string }[] = readJSONFile(
    "_data/2023/team-drivers.json",
  );
  for (const data of teamDrivers2024) {
    const driver = await prisma.drivers.findFirst({
      where: { name: data.name },
    });
    if (!driver) continue;
    const team = await prisma.teams.findFirst({ where: { name: data.team } });
    if (!team) continue;
    const season2024 = await getSeason(2024);
    if (!season2024) continue;
    await prisma.teamDrivers.create({
      data: {
        driver_id: driver.id,
        season_id: season2024.id,
        team_id: team.id,
      },
    });
  }
  for (const data of teamDrivers2023) {
    const driver = await prisma.drivers.findFirst({
      where: { name: data.name },
    });
    if (!driver) continue;
    const team = await prisma.teams.findFirst({ where: { name: data.team } });
    if (!team) continue;
    const season2023 = await getSeason(2023);
    if (!season2023) continue;
    await prisma.teamDrivers.create({
      data: {
        driver_id: driver.id,
        season_id: season2023.id,
        team_id: team.id,
      },
    });
  }
};

type Events = {
  place: string;
  events: {
    name: string;
    start: string;
  }[];
};

const addEvents = async () => {
  const events2024: Events[] = readJSONFile("_data/2024/events.json");
  const events2023: Events[] = readJSONFile("_data/2023/events.json");
  for (const event of events2024) {
    const season2024 = await getSeason(2024);
    const gp = await prisma.grandPrix.findFirst({
      where: { name: event.place },
    });
    const gpSeason = await prisma.grandPrixSeason.findFirst({
      where: { grand_prix_id: gp?.id!, season_id: season2024?.id! },
    });
    await prisma.events.createMany({
      data: event.events.map((e) => {
        const date = new Date(e.start);
        return {
          name: e.name,
          start_at: new Date(date.setHours(date.getHours() - 3)),
          grand_prix_season_id: gpSeason?.id!,
        };
      }),
    });
  }
  for (const event of events2023) {
    const season2023 = await getSeason(2023);
    const gp = await prisma.grandPrix.findFirst({
      where: { name: event.place },
    });
    const gpSeason = await prisma.grandPrixSeason.findFirst({
      where: { grand_prix_id: gp?.id!, season_id: season2023?.id! },
    });
    await prisma.events.createMany({
      data: event.events.map((e) => {
        const date = new Date(e.start);
        return {
          name: e.name,
          start_at: new Date(date.setHours(date.getHours() - 3)),
          grand_prix_season_id: gpSeason?.id!,
        };
      }),
    });
  }
};

const main = async () => {
  // await addSeasons();
  // await addTeams();
  // await addDrivers();
  // await addGrandPrix();
  // await addTeamDriver();
  // await addEvents();
};

main();
