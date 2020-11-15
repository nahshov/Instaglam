import { call, put, takeLeading, takeEvery, all  } from 'redux-saga/effects'
import { loadUser } from '../sagas/auth.js'
import { TOGGLE_POST_LIKE, TOGGLE_POST_LIKE_FAILED, TOGGLE_POST_LIKE_REQUESTED } from '../actions/post/postTypes';
import { SUBMIT_A_POST, SUBMIT_A_POST_FAILED, SUBMIT_A_POST_REQUESTED, POSTS_ERROR, SET_POSTS, SET_POSTS_REQUESTED } from '../actions/posts/postTypes';
import * as api from '../api/index'
  
function* togglePostLike(action) {
    const postId = action.payload.postId
    const isLike = action.payload.isLike
    const setHeartClickLoading = action.payload.setHeartClickLoading
    try{
        if (postId) {
            yield call(setHeartClickLoading, true)
            if (isLike) {
                yield call(api.deletePostLike, postId);
                yield put({type: TOGGLE_POST_LIKE, payload: { postId, isLike: false, numOfLikes: -1 }})
                yield call(setHeartClickLoading, false)
            } else {
                yield call(api.addPostLike, postId)
                yield put({type: TOGGLE_POST_LIKE, payload: { postId, isLike: true, numOfLikes: 1 }})
                yield call(setHeartClickLoading, false)
            }
        }
    } catch(e){
        yield put({type: TOGGLE_POST_LIKE_FAILED, message: e.message, postId})
    }
};

export function* togglePostLikeSaga(){
    yield takeLeading(TOGGLE_POST_LIKE_REQUESTED, togglePostLike)
}

export function* submitAPost (action){
    const fd = action.payload.fd
    console.log(action.payload)
    try {
        yield all([call(api.submitAPost, fd), call(getAllPosts, 0, true), call(loadUser)])
        yield put({type: SUBMIT_A_POST});
    } catch (e) {
        yield put({type: SUBMIT_A_POST_FAILED, message: e.message})
    }
}  

export function* submitAPostSaga(){
    yield takeEvery(SUBMIT_A_POST_REQUESTED, submitAPost);
}



export function* getAllPosts(action) {
    const page = action.payload.page
    const initialLoad = action.payload.initialLoad
    try {
        const { data: posts } = yield call(api.getAllPosts, page, initialLoad);
        yield put({type: SET_POSTS, payload: {posts, noMorePosts: !posts.length, initialLoad}})
    } catch (e) {
        yield put({type: POSTS_ERROR, message: e.message})
    }
};

export function* getAllPostsSaga(){
    yield takeEvery(SET_POSTS_REQUESTED, getAllPosts)
}
  
  
  