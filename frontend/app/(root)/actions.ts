"use server";

import { CreateJokeDTO, Joke } from "@/api/Joke";
import { revalidatePath } from "next/cache";

export async function createJoke(formData: FormData) {
	const data: CreateJokeDTO = {
		joke: formData.get("joke")!.toString(),
	};

	await Joke.create(formData.get("auth")!.toString(), data);
	revalidatePath("/");
}
