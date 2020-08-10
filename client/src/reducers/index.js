import { combineReducers } from 'redux';
import auth from './auth';
import posts from './posts';
import follow from './follow';
import search from './search';
import profile from './profile';
import activitiesFeed from './activitiesFeed';

export default combineReducers({ auth, posts, follow, search, profile, activitiesFeed });
