import React, {useState} from 'react';
import style from './SignupForm.module.scss';

const SignupForm = () => {

	const [activeInput, setActiveInput] = useState(false)

	let spanStyle = !activeInput ? style.notActiveSpanStyle : style.activeSpanStyle
	let inputStyle = !activeInput ? style.notActiveInputStyle : style.activeInputStyle

	const handleChange = (e) => {
		if(e.target.value === '') {
			setActiveInput(false)
		} else {
			setActiveInput(true)
		}
	}
	

	return (
		<div>
			<h1>Instaglam</h1>
			<form>
				<h2>Sign up to see photos and videos from your friends.</h2>
				<div className={style.fieldDiv}>
					<label className={style.label}>
						<span className={spanStyle}>Mobile Number or Email</span>
						<input className={inputStyle} onChange={handleChange}/>
					</label>
				</div>
				<div>
					<label>
						<span>Full Name</span>
						<input />
					</label>
				</div>
				<div>
					<label>
						<span>Username</span>
						<input />
					</label>
				</div>
				<div>
					<label>
						<span>Password</span>
						<input />
					</label>
				</div>
				<div>
					<button>Sign up</button>
				</div>
			</form>
		</div>
	);
};

export default SignupForm;
