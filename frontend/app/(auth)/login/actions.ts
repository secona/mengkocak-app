"use server";

import { Auth, LoginDTO } from "@/api/Auth";

export async function loginAction(_current: string, formData: FormData) {
	const data: LoginDTO =  {
		username: formData.get("username")!.toString(),
		password: formData.get("password")!.toString(),
	}

	const res = await Auth.login(data);
	return res.token;
}
