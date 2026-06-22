import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

function getDbUrl(): string {
  if (process.env.NODE_ENV !== "production") {
    return process.env.DATABASE_URL ?? "file:./app.db";
  }

  const tmpPath = "/tmp/app.db";
  if (!fs.existsSync(tmpPath)) {
    const sourcePath = path.join(process.cwd(), "prisma", "app.db");
    fs.copyFileSync(sourcePath, tmpPath);
  }

  return `file:${tmpPath}`;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: { db: { url: getDbUrl() } },
  });
};

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
