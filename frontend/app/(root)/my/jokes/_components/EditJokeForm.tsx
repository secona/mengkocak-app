"use client";

import { Joke } from "@/api/Joke";
import { useFormState } from "react-dom";
import { editJoke } from "../actions";

export interface EditJokeFormProps {
  joke: Joke;
  onSave: () => void;
}

export function EditJokeForm({ joke, onSave }: EditJokeFormProps) {
  const [state, action] = useFormState(editJoke, { ...joke, updated: false });

  if (state.updated) {
    console.log(state);
    onSave();
  }

  return (
    <form action={action} className="flex flex-row gap-2">
      <input name="joke" defaultValue={joke.joke} className="flex-grow" />
      <button className="primary">Save</button>
    </form>
  )
}
