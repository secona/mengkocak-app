"use server";

import { Auth, LoginDTO } from "@/api/Auth";
import { cookies } from "next/headers";

export interface LoginState {
	success: boolean,
	error: string,
}

export async function loginAction(_current: LoginState, formData: FormData) {
	const data: LoginDTO =  {
		username: formData.get("username")!.toString(),
		password: formData.get("password")!.toString(),
	}

	const res = await Auth.login(data);

	if (!res.token) {
		return {
			success: false,
			error: (res as any).message,
		}
	}

	cookies().set("auth", res.token, { secure: true });
	return {
		success: true,
		error: null,
	};
}
