import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthForm from 'pages/AuthPage/AuthPage';
import Navbar from 'components/Navbar/Navbar';
import HomePage from 'pages/HomePage/HomePage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import 'App.scss';

const App = () => {
  const [hasTokens, setHasTokens] = useState(false);

  return (
    <div className="App">
      {!hasTokens ? (
        <AuthForm />
      ) : (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/profile" render={() => <ProfilePage />} />
          </Switch>
        </>
      )}
    </div>
  );
};

export default App;
