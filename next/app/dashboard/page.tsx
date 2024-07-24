"use client";
import { useEffect, useState } from "react";
import "./style.scss";
import { socket } from "../utils/socket.io/client";

export default function Dashboard() {
	const [upTime, setUpTime] = useState(null);

	useEffect(() => {
		socket.connect();

		socket.on("event", (upTime) => {
			setUpTime(upTime);
		});

		return () => {
			socket.disconnect();
		};
	}, []);
	return (
		<div className='tiles'>
			<div className='grid'>
				<div className='upper-grid-tile'>
					<img src='uptime.png' />
					<div className='tile-title'>Uptime</div>
					<div className='tile-info'>{upTime}</div>
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
