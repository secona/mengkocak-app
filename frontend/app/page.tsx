import { Joke } from "@/api/Joke";

export default async function Home() {
  const res = await Joke.getMany();

  return (
    <main>
      <pre>
        {JSON.stringify(res, null, 2)}
      </pre>
    </main>
  );
}
