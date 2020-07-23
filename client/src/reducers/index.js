import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import users from './users';
import posts from './posts';
import follow from './follow';
import likes from './likes';

export default combineReducers({ auth, alert, users, posts, follow, likes });
