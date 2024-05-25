import { Joke as JokeType } from "@/api/Joke";

interface JokeProps {
  joke: JokeType
}

export const Joke = (props: JokeProps) => {
  return (
    <div className="rounded-lg px-4 py-2 bg-blue-100">
      {props.joke.joke}
    </div>
  );
}
