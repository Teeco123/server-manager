import os from "node:os";
import checkDiskSpace from "check-disk-space";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
	function bytesToSize(bytes: number) {
		const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		if (bytes === 0) return "n/a";
		//@ts-ignore
		const i = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)), 10);
		if (i === 0) return `${bytes} ${sizes[i]}`;
		return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
	}
	const osType = os.type();

	let totalDiskSize;
	let freeDiskSize;

	if (osType == "Windows_NT") {
		await checkDiskSpace("C:/").then((diskSpace) => {
			totalDiskSize = bytesToSize(diskSpace.size);
			freeDiskSize = bytesToSize(diskSpace.free);
		});
	}

	if (osType == "Linux") {
		await checkDiskSpace("/dev/sda").then((diskSpace) => {
			totalDiskSize = bytesToSize(diskSpace.size);
			freeDiskSize = bytesToSize(diskSpace.free);
		});
	}

	return NextResponse.json({ totalDiskSize, freeDiskSize }, { status: 200 });
}
