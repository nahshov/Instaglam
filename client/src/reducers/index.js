import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import posts from './posts';
import follow from './follow';

export default combineReducers({ auth, users, posts, follow });
