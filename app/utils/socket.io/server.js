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

		const upTimeSeconds = os.uptime();
		const upTime = format(upTimeSeconds);

		socket.emit("pc-cpu-ram-stats", upTime);
	}, 1000);
});

server.listen(3001, () => {
	console.log("Socket.io is listening on http://localhost:3001");
});
