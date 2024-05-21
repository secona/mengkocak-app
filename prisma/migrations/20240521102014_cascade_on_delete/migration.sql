-- DropForeignKey
ALTER TABLE "Joke" DROP CONSTRAINT "Joke_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Joke" ADD CONSTRAINT "Joke_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
