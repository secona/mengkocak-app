"use server";

import { CreateJokeDTO, Joke } from "@/api/Joke";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createJoke(formData: FormData) {
	const auth = cookies().get("auth")!.value;
	const data: CreateJokeDTO = {
		joke: formData.get("joke")!.toString(),
	};

	await Joke.create(auth, data);

	revalidatePath("/");
	revalidatePath("/my/jokes")
}

export async function isLoggedIn(): Promise<boolean> {
	return cookies().has("auth");
}

export async function logout(): Promise<void> {
	cookies().delete("auth");
}
