import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import posts from './posts';
import follow from './follow';
import activitiesFeed from './activitiesFeed';

export default combineReducers({ auth, users, posts, follow, activitiesFeed });
