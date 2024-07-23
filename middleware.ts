import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./app/utils/supabase/server";

export async function middleware(request: NextRequest) {
	const supabase = createClient();

	let sessionId = request.cookies.get("session_id")?.value;

	const { data: user, error } = await supabase.from("users").select().eq("session_id", sessionId);

	const url = request.nextUrl;
	const pathname = url.pathname;

	if (!user && pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
