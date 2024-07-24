import { WebSocketServer } from "ws";
import os from "node:os";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
	const interval = setInterval(() => {
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

		ws.send(JSON.stringify({ uptime }));
	}, 1000);

	ws.on("close", () => {
		clearInterval(interval);
	});
});
