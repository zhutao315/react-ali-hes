import { createAction } from 'redux-actions'
import axios from 'utils/axios'

let url = 'https://www.easy-mock.com/mock/5b7647524d2b8f332fda95d9/react/';

// 添加videoList
export const getVideoList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get(url + 'video/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('GET_VIDEO_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 添加comments
export const getComments = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get(url + 'comments', params)
            .then( res => {
                const list = res.list
                dispatch(createAction('GET_COMMENT_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 刷新当前videoList 的内容
export const refreshVideoList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get(url + 'video/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('REFRESH_VIDEO_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 重新渲染
export const renderVideoList = createAction('RENDER_VIDEO_LIST')