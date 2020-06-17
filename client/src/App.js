import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';
import HomePage from 'pages/HomePage/HomePage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import 'App.scss';

const App = () => (
  <div className="App">
    <Navbar />
    <Switch>
      <Route exact path="/" render={() => <HomePage />} />
      <Route exact path="/profile" render={() => <ProfilePage />} />
    </Switch>
  </div>
);

export default App;
