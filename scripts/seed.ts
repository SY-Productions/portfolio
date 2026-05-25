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
        arStartDate: (workSample as any).arStartDate ?? "",
        faEndDate: workSample.faEndDate,
        enEndDate: workSample.enEndDate,
        arEndDate: (workSample as any).arEndDate ?? "",
        arTitle: (workSample as any).arTitle ?? "",
        arDescription: (workSample as any).arDescription ?? "",
      },
    });
  }

  // Seed Educations
  for (const education of db.Educations) {
    await prisma.education.create({
      data: {
        name: education.name,
        nameEn: (education as any).nameEn ?? "",
        nameAr: (education as any).nameAr ?? "",
        fromYear: education.from,
        toYear: education.to,
        picture: education.picture,
        description: education.description,
        descriptionEn: (education as any).descriptionEn ?? "",
        descriptionAr: (education as any).descriptionAr ?? "",
      },
    });
  }

  // Seed Works
  for (const work of db.Works) {
    await prisma.work.create({
      data: {
        name: work.name,
        nameEn: (work as any).nameEn ?? "",
        nameAr: (work as any).nameAr ?? "",
        technos: JSON.stringify(work.technos),
        fromYear: work.from,
        toYear: work.to,
        picture: work.picture,
        url: work.url,
        description: work.description,
        descriptionEn: (work as any).descriptionEn ?? "",
        descriptionAr: (work as any).descriptionAr ?? "",
      },
    });
  }

  // Seed Events
  for (const event of db.Events) {
    await prisma.event.create({
      data: {
        name: event.name,
        nameEn: (event as any).nameEn ?? "",
        nameAr: (event as any).nameAr ?? "",
        date: event.date,
        picture: event.picture,
        attachment: event.attachment,
        description: event.description,
        descriptionEn: (event as any).descriptionEn ?? "",
        descriptionAr: (event as any).descriptionAr ?? "",
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
