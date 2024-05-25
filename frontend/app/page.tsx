import { Joke as JokeType } from "@/api/Joke";
import { Joke } from "./_components/Joke";

export default async function Home() {
  const res = await JokeType.getMany();

  return (
    <main>
      <div className="flex flex-col flex-wrap max-w-2xl gap-2 py-8 mx-auto">
        {res.records.map(record => <Joke joke={record} />)}
      </div>
    </main>
  );
}
