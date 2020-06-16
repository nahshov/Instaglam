import React from 'react';
import './App.css';
import AuthForm from './components/Forms/AuthForm/AuthForm';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthForm />
      </div>
    </Router>
  );
}

export default App;
