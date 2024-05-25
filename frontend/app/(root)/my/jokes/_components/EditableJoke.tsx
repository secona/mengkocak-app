"use client";

import { useState } from "react";
import { Joke as JokeType } from "@/api/Joke";
import { Joke } from "@/app/(root)/_components/Joke";
import { EditJokeForm } from "./EditJokeForm";

interface JokeProps {
  joke: JokeType
}

export const EditableJoke = ({ joke }: JokeProps) => {
	const [editing, setEditing] = useState(false);

	if (editing) {
		return <EditJokeForm joke={joke} onSave={() => setEditing(false)} />
	}

  return (
		<div className="flex flex-col gap-1 bg-[#F9F9F9] pb-2 rounded-lg">
			<Joke joke={joke} />
			<div className="ml-3 flex-shrink flex flex-row items-start gap-5">
				<button 
					onClick={() => setEditing(true)}
					className="py-0 px-0 text-sm text-gray-400"
				>
					Edit
				</button>
				<button
					className="py-0 px-0 text-sm text-gray-400"
				>
					Delete
				</button>
			</div>
		</div>
  );
}
