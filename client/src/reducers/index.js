import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import users from './users';

export default combineReducers({ auth, alert, users });
