import { createAction } from 'redux-actions'
import axios from 'utils/axios'

let url = 'https://www.easy-mock.com/mock/5b7647524d2b8f332fda95d9/react/';

// 添加文章数据
export const getArticle = params => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get(url+'article/info/' + getRandomId(params.id), params)
            .then( res => {
                dispatch(createAction('GET_ARTICLE')(res.data))
                resolve(res.data)
            }).catch( err => {
                reject(err)
            })
    })
}
// 重新渲染文章数据
export const renderArticle = createAction('RENDER_ARTICLE')

let getRandomId = (id) => {
    return id % 2 === 0 ? 10000 : 10001;
}

// 获取文章评论
export const getArticleComments = params => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get(url+'article/comments/' + getRandomId(params.id), params)
            .then( res => {
                dispatch(createAction('GET_ARTICLE_COMMENTS')(res.data))
                resolve(res.data)
            }).catch( err => {
                reject(err)
            })
    })
}


// 显示Alert
export const showAlert = createAction('SHOW_ALERT')
// 隐藏Alert
export const hideAlert = createAction('HIDE_ALERT')

// 显示Share
export const showShare = createAction('SHOW_SHARE')
// 隐藏Share
export const hideShare = createAction('HIDE_SHARE')

// 显示Loading
export const showLoading = createAction('SHOW_LOADING')
// 隐藏Loading
export const hideLoading = createAction('HIDE_LOADING')


