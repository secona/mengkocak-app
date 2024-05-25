"use client";

import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { register } from "./actions";

export default function Login() {
	const [success, action] = useFormState(register, false);

	if (success) {
		redirect("/login");
	}

	return (
		<form className="flex flex-col items-center gap-2" action={action}>
			<h1 className="text-5xl font-bold uppercase mb-4">Register</h1>
			<input type="text" placeholder="Username" name="username" />
			<input type="text" placeholder="Name" name="name" />
			<input type="text" placeholder="Password" name="password" />
			<button className="primary mt-4">Login</button>
		</form>
	)
}