"use server";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export async function UploadFile(formData: FormData) {
	const supabase = createClient();

	//Get user name
	const sessionId = cookies().get("session_id")?.value;

	const { data: user, error } = await supabase.from("users").select().eq("session_id", sessionId);

	let username;

	const userSnap = user?.forEach((user) => {
		username = user.name;
	});

	//Upload file
	const files = formData.getAll("files") as File[];

	for (let i = 0; i < files.length; i++) {
		const fileToStorage = files[i];

		await supabase.storage
			.from("photos")
			.upload(`/${username}/${fileToStorage.name}`, fileToStorage);
	}
}
