import React, { useState } from 'react';
import './App.scss';
import AuthForm from './components/Forms/AuthForm/AuthForm';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  const [hasAuthTokens, setHasAuthTokens] = useState(true);

  return (
    <div className="App">
      {!hasAuthTokens ? (
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
}

export default App;
