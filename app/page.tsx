"use client";
import "./style.scss";
import { Login } from "./actions";
import { useFormState } from "react-dom";
import { Bounce, toast } from "react-toastify";

const initialState = {
	message: "",
};

export default function Home() {
	const [state, formAction] = useFormState(Login, initialState);

	if (state && state.message == "Invalid credentials") {
		toast.error("Invalid credentials", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
			transition: Bounce,
		});
	}
	return (
		<main>
			<form action={formAction}>
				<label>Name</label>
				<input
					type='text'
					name='name'
				/>

				<label>Password</label>
				<input
					type='password'
					name='password'
				/>

				<button>
					<img src='/login.png' />
				</button>
			</form>
		</main>
	);
}
