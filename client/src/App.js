import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'App.scss';
import HomePage from 'pages/HomePage/HomePage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import SignUpForm from 'components/AuthForm/SignUpForm/SignUpForm';
import LogInForm from 'components/AuthForm/LogInForm/LogInForm';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import { loadUser } from 'actions/auth';
import store from './store';

const App = () => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/accounts/emailsignup" exact component={SignUpForm} />
            <Route path="/accounts/login" exact component={LogInForm} />
            <ProtectedRoute
              exact
              path="/explore"
              component={() => <div>Explore!</div>}
            />
            <ProtectedRoute exact path="/:profile" component={ProfilePage} />
            <ProtectedRoute
              exact
              path="/direct/inbox"
              component={() => <div>Chat!</div>}
            />
            <ProtectedRoute exact path="/" component={HomePage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
