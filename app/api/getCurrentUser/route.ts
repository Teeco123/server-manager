import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: NextRequest) {
	const supabase = createClient();

	let sessionId = request.cookies.get("session_id")?.value;

	const { data: user, error } = await supabase.from("users").select().eq("session_id", sessionId);

	let username;

	const userSnap = user?.forEach((user) => {
		username = user.name;
	});
	return NextResponse.json({ username }, { status: 200 });
}
