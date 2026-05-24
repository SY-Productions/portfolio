-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "themeA" TEXT NOT NULL DEFAULT '#5A0E12',
    "themeB" TEXT NOT NULL DEFAULT '#3B070A',
    "themeC" TEXT NOT NULL DEFAULT '#141010',
    "themeD" TEXT NOT NULL DEFAULT '#8B1E24',
    "totpSecret" TEXT,
    "profilePic" TEXT NOT NULL DEFAULT '/me.jpg',
    "technologies" TEXT NOT NULL DEFAULT 'Flutter,Dart,Python,FastAPI,Firebase,SQLite,Prisma,Next.js,React,TailwindCSS,GetX,BLoC,Retrofit,Figma,Git'
);
