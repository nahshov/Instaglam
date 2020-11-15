import {all} from 'redux-saga/effects';
import {togglePostLikeSaga, submitAPostSaga, getAllPostsSaga} from './posts';
import {loadUserSaga, loginSaga} from './auth';

export function* rootSaga () {
    yield all([
        togglePostLikeSaga(),
        submitAPostSaga(),
        loadUserSaga(),
        loginSaga(),
        getAllPostsSaga()
    ])
} 