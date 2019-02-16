import { handleActions } from 'redux-actions'

const state = {
    videoList: [],
    hasMore: true,
    comments: []
}
export const video = handleActions({
    GET_VIDEO_LIST: (state, action) => {
        let list = action.payload
        if (list.length < 4) {
            state.hasMore = false
        }
        state.videoList = state.videoList.concat(list)
        return {...state}
    },
    GET_COMMENT_LIST: (state, action) => {
        let list = action.payload
        state.comments = state.comments.concat(list)
        state.comments.hasMore = state.comments.length < 10
        return {...state}
    },
    REFRESH_VIDEO_LIST: (state, action) => {
        state.videoList = action.payload
        state.hasMore = true
        return {...state}
    },
    RENDER_VIDEO_LIST: state => ({...state})
}, state)