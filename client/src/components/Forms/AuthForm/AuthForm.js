import React, { useState } from 'react';
import Signup from '../SignupForm/SignupForm';
import AuthSwitch from '../AuthSwitch/AuthSwitch';

const AuthForm = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <div>
      <Signup />
      <AuthSwitch hasAccount={hasAccount} setHasAccount={setHasAccount} />
    </div>
  );
};

export default AuthForm;
