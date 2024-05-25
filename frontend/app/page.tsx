import { Joke as JokeType } from "@/api/Joke";
import { Joke } from "./_components/Joke";

export default async function Home() {
  const res = await JokeType.getMany();

  return (
    <main>
      <div className="grid grid-cols-4 gap-3 p-10">
        {res.records.map(record => <Joke joke={record} />)}
      </div>
    </main>
  );
}
