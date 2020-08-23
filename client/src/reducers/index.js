import { combineReducers } from 'redux';
import auth from './auth';
import posts from './posts';
import post from './post';
import follow from './follow';
import search from './search';
import profile from './profile';
import activitiesFeed from './activitiesFeed';

export default combineReducers({ auth, posts, post, follow, search, profile, activitiesFeed });
