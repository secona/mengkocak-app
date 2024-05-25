import { Joke as JokeType } from "@/api/Joke";

interface JokeProps {
  joke: JokeType
}

export const Joke = ({ joke }: JokeProps) => {
  return (
    <div className="flex-grow rounded-lg px-4 py-2 bg-white">
      <p className="">
        <span className="font-bold mr-1">
          {joke.author?.name}
        </span>
        <span className="text-gray-400">
          @{joke.author?.username}
        </span>
      </p>
      <p>{joke.joke}</p>
    </div>
  );
}
