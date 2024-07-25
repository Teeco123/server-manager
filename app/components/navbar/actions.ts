"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function Logout() {
	const supabase = createClient();

	const session_id = cookies().get("session_id")?.value;

	const { data: user, error } = await supabase.from("users").select().eq("session_id", session_id);

	if (user?.length != 0) {
		cookies().delete("session_id");

		const { error } = await supabase
			.from("users")
			.update({ session_id: null })
			.eq("session_id", session_id);

		redirect("/");
	}
}
