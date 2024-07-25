"use client";
import { useEffect, useState } from "react";
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
			<div className='user'>{username}</div>
		</div>
	);
}
