import * as http from "http";
import { Server } from "socket.io";
import os from "node:os";

const server = http.createServer();
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", async (socket) => {
	const interval = setInterval(() => {
		function format(seconds) {
			function pad(s) {
				return (s < 10 ? "0" : "") + s;
			}
			var hours = Math.floor(seconds / (60 * 60));
			var minutes = Math.floor((seconds % (60 * 60)) / 60);
			var seconds = Math.floor(seconds % 60);

			return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
		}

		function bytesToSize(bytes) {
			const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
			if (bytes === 0) return "n/a";
			const i = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)), 10);
			if (i === 0) return `${bytes} ${sizes[i]}`;
			return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
		}

		const upTimeSeconds = os.uptime();
		const upTime = format(upTimeSeconds);

		const cpu = os.cpus();
		const cpuModel = cpu[1].model;
		const cpuSpeed = cpu[1].speed;

		const ramBytes = os.totalmem();
		const ram = bytesToSize(ramBytes);

		socket.emit("event", upTime, cpuModel, cpuSpeed, ram);
	}, 1000);
});

server.listen(3001, () => {
	console.log("Socket.io is listening on http://localhost:3001");
});
