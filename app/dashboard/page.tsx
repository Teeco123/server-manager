"use client";
import "./style.scss";
import { useState, useEffect } from "react";

export default function Dashboard() {
	const [upTime, setUptime] = useState(null);

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:3001");

		ws.onopen = () => {
			console.log("WebSocket connected");
		};

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setUptime(data.uptime);
		};

		ws.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		ws.onclose = () => {
			console.log("WebSocket closed");
		};
	}, []);

	return (
		<div className='tiles'>
			<div className='grid'>
				<div className='upper-grid-tile'>
					<img src='uptime.png' />
					<div className='tile-title'>{upTime}</div>
				</div>
				<div className='upper-grid-tile'>
					<img src='cpu.png' />
					<div className='tile-title'>CPU</div>
					<div className='tile-info'></div>
				</div>
				<div className='upper-grid-tile'>
					<img src='ram.png' />
					<div className='tile-title'>RAM</div>
				</div>
				<div className='upper-grid-tile'>
					<img src='hdd.png' />
					<div className='tile-title'>Storage</div>
				</div>
				<div className='middle-wide-tile'></div>
				<div className='middle-grid-tile'></div>
				<div className='bottom1-grid-tile'></div>
				<div className='bottom2-grid-tile'></div>
			</div>
		</div>
	);
}
