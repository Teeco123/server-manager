"use client";
import { useEffect, useState } from "react";
import { Logout } from "./actions";
import "./style.scss";

export default function Navbar() {
	const [username, setUsername] = useState(null);

	useEffect(() => {
		fetch("/api/getCurrentUser")
			.then((res) => res.json())
			.then((data) => {
				setUsername(data.username);
			});
	}, []);

	return (
		<div className='navbar'>
			<div className='user-info'>
				<img src='/account.png' />
				<div className='user'>{username}</div>
				<form action={Logout}>
					<button>
						<img src='/logout.png' />
					</button>
				</form>
			</div>
			<a
				href='/dashboard'
				className='nav-tile'>
				<img src='/overview.png' />
				<div className='tile-name'>Overview</div>
			</a>
			<a
				href='/dashboard/usage'
				className='nav-tile'>
				<img src='/usage.png' />
				<div className='tile-name'>Usage</div>
			</a>
			<a
				href='/dashboard/photos'
				className='nav-tile'>
				<img src='/photos.png' />
				<div className='tile-name'>Photos</div>
			</a>
			<a
				href='/dashboard/docker'
				className='nav-tile'>
				<img src='/docker.png' />
				<div className='tile-name'>Docker</div>
			</a>
		</div>
	);
}
