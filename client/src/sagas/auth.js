import {put, takeLeading, call, takeLatest} from 'redux-saga/effects'
import * as api from '../api/index'
import { 
    RESET_AUTH_LOADING, 
    AUTHENTICATED_USER_LOADED, 
    AUTH_ERROR, 
    LOAD_USER_REQUESTED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUESTED
} from '../actions/auth/authTypes'

export function* loadUser () {
    try {
        yield put({type: RESET_AUTH_LOADING})
        const res = yield call(api.loadUser)
        yield put({type: AUTHENTICATED_USER_LOADED, payload: res.data})
    } catch (e) {
        yield put({type: AUTH_ERROR, payload: e.message})
    }
};

export function* loadUserSaga(){
    yield takeLeading(LOAD_USER_REQUESTED, loadUser)
}
  
export function* login (action) {
    const email = action.payload.logInForm.email
    const password = action.payload.logInForm.password
    const body = {email, password}
    const setLogInAlert = action.payload.setLogInAlert
    try {
        yield put({type: RESET_AUTH_LOADING})
        const config = {headers: {'Content-Type': 'application/json'}};
        const res = yield call(api.login, body, config)
        yield put({type: LOGIN_SUCCESS, payload: res.data })
    } catch (error) {
        const { errors } = error.response.data;
        if (errors) {
            setLogInAlert(errors);
        }
        yield put({type: LOGIN_FAIL})
    }
};

export function* loginSaga(){
    yield takeLeading(LOGIN_REQUESTED, login);
}
  