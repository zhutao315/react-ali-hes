import { handleActions } from 'redux-actions'

const state = {
    articleInfo: {}
}
export const common = handleActions({
    GET_ARTICLE: (state, action) => {
        state.articleInfo = action.payload
        return {...state}
    },
    RENDER_ARTICLE: state => ({...state}),
    GET_ARTICLE_COMMENTS: (state, action) => {
        state.articleCommentsInfo = action.payload
        return {...state}
    }
}, state)

const configState = {
    alert: {
        show: false,
        content: ''
    },
    loading: {
        show: false
    },
    share: {
        show: false
    }
}
export const config = handleActions({
    SHOW_ALERT: (state, action) => {
        state.alert.show = true
        state.alert = Object.assign({}, state.alert, action.payload)
        return {...state}
    },
    HIDE_ALERT: state => {
        state.alert = {
            show: false,
            content: ''
        }
        return {...state}
    },
    SHOW_SHARE: (state, action) => {
        state.share.show = true
        state.share = Object.assign({}, state.share, action.payload)
        return {...state}
    },
    HIDE_SHARE: state => {
        state.share = {
            show: false,
            content: ''
        }
        return {...state}
    },
    SHOW_LOADING: state => {
        state.loading.show = true
        return {...state}
    },
    HIDE_LOADING: state => {
        state.loading.show = false
        return {...state}
    }
}, configState)