import axios from 'axios'

export function deletePostLike (postId) {
    return axios.delete(`/api/posts/${postId}/likes`)
}

export function addPostLike (postId) {
    return axios.post(`/api/posts/${postId}/likes`);
}

export function submitAPost (fd) {
    return axios.post('/api/posts', fd);
}

export function loadUser() {
    return axios.get('/api/me')
}

export function login(body, config){
    return axios.post('/api/login', body, config);
}

export function getAllPosts (page) {
    return axios.get('/api/posts', { params: { includeComments: 2, page } });
}