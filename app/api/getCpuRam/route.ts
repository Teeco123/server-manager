import { NextResponse, NextRequest } from "next/server";
import os from "node:os";

export async function GET(request: NextRequest) {
	function bytesToSize(bytes: number) {
		const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		if (bytes === 0) return "n/a";
		//@ts-ignore
		const i = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)), 10);
		if (i === 0) return `${bytes} ${sizes[i]}`;
		return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
	}

	const cpu = os.cpus();
	const cpuModel = cpu[1].model;
	const cpuSpeed = cpu[1].speed;

	const ramBytes = os.totalmem();
	const ram = bytesToSize(ramBytes);

	return NextResponse.json({ cpuModel, cpuSpeed, ram }, { status: 200 });
}
