import "./style.scss";
import { createClient } from "./utils/supabase/server";
import { cookies } from "next/headers";

async function Login(form: FormData) {
	"use server";
	const supabase = createClient();

	const name = form.get("name");
	const password = form.get("password");

	const { data: user, error } = await supabase
		.from("users")
		.select()
		.eq("name", name)
		.eq("password", password);

	if (user?.length != 0) {
		const uuid = crypto.randomUUID();
		cookies().set("session_id", uuid);
	} else {
		console.log("nuh uh");
	}
}

export default function Home() {
	return (
		<main>
			<form action={Login}>
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
