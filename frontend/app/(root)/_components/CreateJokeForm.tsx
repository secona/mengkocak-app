"use client";

import { createJoke } from "../actions";

export function CreateJokeForm() {
  return (
    <form
      className="w-full flex flex-col bg-white rounded-lg p-3 gap-2"
      action={createJoke}
    >
      <input
        type="text"
        name="joke"
        className="w-full border-none focus:outline-none"
        placeholder="Make us laugh!"
      />
      <input hidden value={localStorage.getItem("auth")!} name="auth" />
      <div className="flex flex-row-reverse">
        <button className="primary py-2 text-sm">Post</button>
      </div>
    </form>
  )
}
