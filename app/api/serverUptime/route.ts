import { NextResponse } from "next/server";
import os from "node:os";

// To handle a GET request to /api
export async function GET(request: any) {
	function format(seconds: number) {
		function pad(s: number) {
			return (s < 10 ? "0" : "") + s;
		}
		var hours = Math.floor(seconds / (60 * 60));
		var minutes = Math.floor((seconds % (60 * 60)) / 60);
		var seconds = Math.floor(seconds % 60);

		return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
	}

	const uptimeSeconds = os.uptime();
	const uptime = format(uptimeSeconds);

	return NextResponse.json({ uptime }, { status: 200 });
}
