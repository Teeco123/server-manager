"use server";
import { createClient } from "./_utils/supabase/server";
import { cookies } from "next/headers";

export async function Login(prevState: any, form: FormData) {
	const supabase = createClient();

	const name = form.get("name");
	const password = form.get("password");

	const { data: user, error } = await supabase
		.from("users")
		.select()
		.eq("name", name)
		.eq("password", password);

	if (user?.length != 0) {
		const uuid = crypto.randomUUID();

		cookies().set("session_id", uuid);

		return {
			message: "Logged in successfully",
		};
	} else {
		return {
			message: "Invalid credentials",
		};
	}
}
