"use server";

import { CreateUserDTO, User } from "@/api/User";

export interface RegisterState {
	success: boolean,
	error: string,
}

export async function register(_state: RegisterState, formData: FormData) {
	const data: CreateUserDTO = {
		name: formData.get("name")!.toString(),
		password: formData.get("password")!.toString(),
		username: formData.get("username")!.toString(),
	}

	const res = await User.create(data);

	if (!res.record) {
		return {
			success: false,
			error: (res as any).message.join("\n"),
		};
	}

	return {
		success: true,
		error: "",
	}
}
