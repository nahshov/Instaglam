import React, { useState } from 'react';
import style from './SignupForm.module.scss';

const SignupForm = ({ hasAccount }) => {

	const [activeInput, setActiveInput] = useState(false)

	let spanStyle = !activeInput ? style.notActiveSpanStyle : style.activeSpanStyle
	let inputStyle = !activeInput ? style.notActiveInputStyle : style.activeInputStyle

	const handleChange = (e) => {
		if (e.target.value === '') {
			setActiveInput(false)
		} else {
			setActiveInput(true)
		}
		console.log(e.target.name)
	}

	console.log(hasAccount)

	return (
		<React.Fragment>
			<div className={style.authHeader}>
				<h1 className={style.title}>Instaglam</h1>
				<h2 className={style.h2}>Sign up to see photos and videos from your friends.</h2>
			</div>
			<form className={style.authForm} onChange={handleChange}>
				<div className={style.fieldDiv}>
					<label className={style.label}>
						<span className={spanStyle}>Mobile Number or Email</span>
						<input type="text" name="mobileOrEmail" className={inputStyle} />
					</label>
				</div>
				<div className={style.fieldDiv}>
					<label className={style.label}>
						<span className={spanStyle}>Full Name</span>
						<input type="text" name="fullName" className={inputStyle} />
					</label>
				</div>
				<div className={style.fieldDiv}>
					<label className={style.label}>
						<span className={spanStyle}>Username</span>
						<input type="text" name="userName" className={inputStyle} />
					</label>
				</div>
				<div className={style.fieldDiv}>
					<label className={style.label}>
						<span className={spanStyle}>Password</span>
						<input type="text" name="password" className={inputStyle} />
					</label>
				</div>
				<div className={style.signUpBtnDiv}>
					<button>Sign up</button>
				</div>
			</form>
		</React.Fragment>
	);
};

export default SignupForm;
