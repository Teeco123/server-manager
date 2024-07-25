"use client";
import { useEffect, useState } from "react";
import "./style.scss";
import { socket } from "../utils/socket.io/client";

export default function Dashboard() {
	const [upTime, setUpTime] = useState(null);
	const [cpuModel, setCpuModel] = useState(null);
	const [cpuSpeed, setCpuSpeed] = useState(null);
	const [ram, setRam] = useState(null);
	const [totalDiskSize, setTotalDiskSize] = useState(null);
	const [freeDiskSize, setfreeDiskSize] = useState(null);

	useEffect(() => {
		socket.connect();

		socket.on("pc-cpu-ram-stats", (upTime) => {
			setUpTime(upTime);
		});

		fetch("/api/getDiskSize")
			.then((res) => res.json())
			.then((data) => {
				setTotalDiskSize(data.totalDiskSize);
				setfreeDiskSize(data.freeDiskSize);
			});

		fetch("/api/getCpuRam")
			.then((res) => res.json())
			.then((data) => {
				setCpuModel(data.cpuModel);
				setCpuSpeed(data.cpuSpeed);
				setRam(data.ram);
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
					<div className='uptime'>{upTime}</div>
				</div>
				<div className='upper-grid-tile'>
					<img src='cpu.png' />
					<div className='tile-title'>CPU</div>
					<div className='cpu-model'>
						Model: <br /> {cpuModel}
					</div>
					<div className='cpu-speed'>
						Speed: <br /> {cpuSpeed} MHz
					</div>
				</div>
				<div className='upper-grid-tile'>
					<img src='ram.png' />
					<div className='tile-title'>RAM</div>
					<div className='total-ram'>{ram}</div>
				</div>
				<div className='upper-grid-tile'>
					<img src='hdd.png' />
					<div className='tile-title'>Storage</div>
					<div className='total-disk'>
						Total: <br />
						{totalDiskSize}
					</div>
					<div className='free-disk'>
						Free: <br />
						{freeDiskSize}
					</div>
				</div>
				<div className='middle-wide-tile'></div>
				<div className='middle-grid-tile'></div>
				<div className='bottom1-grid-tile'></div>
				<div className='bottom2-grid-tile'></div>
			</div>
		</div>
	);
}
