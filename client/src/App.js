import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'App.scss';
import HomePage from 'pages/HomePage/HomePage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import WelcomePage from 'pages/WelcomePage/WelcomePage';
import PostPage from 'pages/PostPage/PostPage';
import SignUpForm from 'components/AuthForm/SignUpForm/SignUpForm';
import LogInForm from 'components/AuthForm/LogInForm/LogInForm';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import { loadUser } from 'actions/auth/authActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/" component={HomePage} />
          <Route path="/accounts/welcomepage" component={WelcomePage} />
          <Route path="/accounts/emailsignup" exact component={SignUpForm} />
          <Route path="/accounts/login" exact component={LogInForm} />
          <ProtectedRoute path="/p/:postId" component={PostPage} />
          <ProtectedRoute path="/accounts/edit" component={() => { return <h1>Edit Profile page...</h1>; }} />
          <ProtectedRoute
            exact
            path="/direct/inbox"
            component={() => (
              <div>
                Chat! (soon to come
                <span role="img" aria-label="chat">
                  {' '}
                  💬
                </span>
                )
              </div>
            )}
          />
          <ProtectedRoute path="/:profile" component={ProfilePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
