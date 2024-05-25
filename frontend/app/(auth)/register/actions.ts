"use server";

import { CreateUserDTO, User } from "@/api/User";

export async function register(_state: boolean, formData: FormData) {
	const data: CreateUserDTO = {
		name: formData.get("name")!.toString(),
		password: formData.get("password")!.toString(),
		username: formData.get("username")!.toString(),
	}

	const res = await User.create(data);
	return !!res.record;
}
