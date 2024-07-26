"use client";
import "./style.scss";
import { UploadFile } from "./actions";

export default function Photos() {
	return (
		<div className='main-panel'>
			<div className='upload'>
				<form action={UploadFile}>
					<label className='input-label'>
						<img src='/upload file.png' />
						<input
							className='file-input'
							name='files'
							type='file'
							multiple></input>
					</label>

					<button type='submit'>
						<img src='/upload.png' />
						SUBMIT
					</button>
				</form>
			</div>
		</div>
	);
}
