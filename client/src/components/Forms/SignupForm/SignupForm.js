import React from 'react';
import { h1 } from './SignupForm.module.scss';

const SignupForm = () => {
	return (
		<div>
			<h1 className={h1}>Instaglam</h1>
			<form>
				<h2>Sign up to see photos and videos from your friends.</h2>

				<div>
					<label>
						<span>Mobile Number or Email</span>
						<input />
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
			<div>
				<div>
					<p>
						Don't have an account?
						<a href='#'>
							<span>Sign up</span>
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignupForm;

/* 

Components: 

Logo: 
Input text field: Roi
Button primary: Omer
AuthSwitch:


*/
