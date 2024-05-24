-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Joke" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "joke" TEXT NOT NULL,

    CONSTRAINT "Joke_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Joke" ADD CONSTRAINT "Joke_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
