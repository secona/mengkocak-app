import { User } from "@/api/User";
import { EditableJoke } from "./_components/EditableJoke";
import { Joke } from "@/api/Joke";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MyJokes() {
	const auth = cookies().get("auth")?.value;

	if (!auth) {
		redirect("/");
	}
	
	const currentUser = await User.getLoggedIn(auth!);
	const jokes = await Joke.getMany({ userId: currentUser.record.id, withUser: "true" });

	return (
		<main className="flex flex-col flex-wrap max-w-2xl gap-2 py-8 mx-auto">
			{jokes.records.map((joke, i) => (
				<EditableJoke joke={joke} key={i} />
			))}
		</main>
	)
}
