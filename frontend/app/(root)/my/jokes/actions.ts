"use server";

import { Joke, UpdateJokeDTO } from "@/api/Joke";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function editJoke(
	joke: Joke & { updated: boolean },
	formData: FormData
): Promise<Joke & { updated: boolean }> {
	const data: UpdateJokeDTO = {
		joke: formData.get("joke")!.toString(),
	};

	const token = cookies().get("auth")!.value;
	const res = await Joke.update(token, joke.id, data);

	revalidatePath("/my/jokes");

	return { ...res.record, updated: true };
}
