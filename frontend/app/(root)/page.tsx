import { Joke as JokeType } from "@/api/Joke";
import { Joke } from "./_components/Joke";
import { CreateJokeForm } from "./_components/CreateJokeForm";

export default async function Home() {
  const res = await JokeType.getMany({
    withUser: "true"
  });

  return (
    <main className="flex flex-col flex-wrap max-w-2xl gap-2 py-8 mx-auto">
      <CreateJokeForm />
      {res.records.map(record => <Joke joke={record} />)}
    </main>
  );
}
