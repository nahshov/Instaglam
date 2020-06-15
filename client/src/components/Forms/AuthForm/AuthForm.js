import React, { useState } from 'react';
import Signup from '../SignupForm/SignupForm';
import LoginForm from '../LoginForm/LoginForm';
import AuthSwitch from '../AuthSwitch/AuthSwitch';
import style from './AuthForm.module.scss';

const AuthForm = () => {
	const [
		hasAccount,
		setHasAccount
	] = useState(true);
	return (
		<div className={style.authWrapper}>
			<div className={style.authDiv}>
				<Signup hasAccount={hasAccount} />
				{/* <LoginForm /> */}
			</div>
				<AuthSwitch hasAccount={hasAccount} setHasAccount={setHasAccount} />
		</div>
	);
};

export default AuthForm;
