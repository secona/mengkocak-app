"use server";

import { Auth, LoginDTO } from "@/api/Auth";
import { cookies } from "next/headers";

export async function loginAction(_current: boolean, formData: FormData) {
	const data: LoginDTO =  {
		username: formData.get("username")!.toString(),
		password: formData.get("password")!.toString(),
	}

	const res = await Auth.login(data);

	cookies().set("auth", res.token, { secure: true });
	return true;
}
