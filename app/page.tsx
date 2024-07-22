import "./style.scss";

export default function Home() {
	return (
		<main>
			<form>
				<label>Name</label>
				<input type='text' />

				<label>Password</label>
				<input type='password' />

				<button>
					<img src='/login.png' />
				</button>
			</form>
		</main>
	);
}
