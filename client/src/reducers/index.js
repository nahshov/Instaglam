import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import users from './users';
import posts from './posts';
import follow from './follow';

export default combineReducers({ auth, alert, users, posts, follow });
