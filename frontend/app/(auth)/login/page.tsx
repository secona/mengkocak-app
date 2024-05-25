"use client";

import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { loginAction } from "./actions";

export default function Login() {
	const [state, action] = useFormState(loginAction, { error: "", success: false });

	if (state.success) {
		redirect("/");
	}

	return (
		<form className="flex flex-col items-center gap-2" action={action}>
			<h1 className="text-5xl font-bold uppercase mb-4">Login</h1>
			<input type="text" placeholder="Username" name="username" />
			<input type="password" placeholder="Password" name="password" />
			<button className="primary mt-4">Login</button>
			{state.error != "" && (
				<div className="rounded-lg bg-red-500 text-white px-6 py-3">
					{state.error}
				</div>
			)}
		</form>
	)
}
