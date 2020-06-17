import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthForm from 'components/Forms/AuthForm/AuthForm';
import Navbar from 'components/Navbar/Navbar';
import HomePage from 'pages/HomePage/HomePage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import 'App.scss';

const App = () => {
  const [hasTokens, setHasTokens] = useState(true);

  return (
    <div className="App">
      <AuthForm />
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route exact path="/profile" render={() => <ProfilePage />} />
      </Switch>
    </div>
  );
};

export default App;
