import { PrismaClient } from "@prisma/client";
import db from "../public/db.json";

const prisma = new PrismaClient();

async function main() {
  // Seed WorkSamples
  for (const workSample of db.WorkSmaples) {
    await prisma.workSample.create({
      data: {
        id: workSample.id,
        isWeb: workSample.isWeb,
        faTitle: workSample.faTitle,
        enTitle: workSample.enTitle,
        faDescription: workSample.faDescription,
        enDescription: workSample.enDescription,
        pictures: workSample.pictures,
        link: workSample.link,
        technologys: workSample.technologys,
        faStartDate: workSample.faStartDate,
        enStartDate: workSample.enStartDate,
        faEndDate: workSample.faEndDate,
        enEndDate: workSample.enEndDate,
      },
    });
  }

  // Seed Educations
  for (const education of db.Educations) {
    await prisma.education.create({
      data: {
        name: education.name,
        fromYear: education.from,
        toYear: education.to,
        picture: education.picture,
        description: education.description,
      },
    });
  }

  // Seed Works
  for (const work of db.Works) {
    await prisma.work.create({
      data: {
        name: work.name,
        technos: JSON.stringify(work.technos),
        fromYear: work.from,
        toYear: work.to,
        picture: work.picture,
        url: work.url,
        description: work.description,
      },
    });
  }

  // Seed Events
  for (const event of db.Events) {
    await prisma.event.create({
      data: {
        name: event.name,
        date: event.date,
        picture: event.picture,
        attachment: event.attachment,
        description: event.description,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
