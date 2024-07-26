"use client";
import "./style.scss";
import { UploadFile } from "./actions";

export default function Photos() {
	return (
		<div className='main-panel'>
			<div className='upload'>
				<form action={UploadFile}>
					<input
						name='files'
						type='file'
						multiple
					/>
					<button type='submit'></button>
				</form>
			</div>
		</div>
	);
}
