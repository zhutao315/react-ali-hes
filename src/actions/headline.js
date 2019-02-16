import { createAction } from 'redux-actions'
import axios from 'utils/axios'
let url = 'https://www.easy-mock.com/mock/5b7647524d2b8f332fda95d9/react/';

const Mock_add_res = {
    avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538246747039&di=d9f4fbc27e1993b3cb799c7589d81f73&imgtype=0&src=http%3A%2F%2Fcdnq.duitang.com%2Fuploads%2Fblog%2F201504%2F03%2F20150403225532_Jtxak.thumb.700_0.png",
    city: "杭州市",
    id: 10000,
    images: [],
    intro: "。。。。。。。。。",
    name: "admin",
    source: "央视财经",
    tag: "资深媒体人",
    time: 1,
    title: "",
}
// 添加headlineList
export const addHeadlineList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.post(url + 'headline/add', {...params, items: []})
            .then( res => {
                Mock_add_res.images = params.items
                Mock_add_res.intro = params.intro
                const info = Mock_add_res;//res.data
                dispatch(createAction('ADD_HEADLINE_LIST')(info))
                resolve(info)
            }).catch( err => {
                reject(err)
            })
    })
}

// 获取headlineList
export const getHeadlineList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get(url + 'headline/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('GET_HEADLINE_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 刷新当前headlineList 的内容
export const refreshHeadlineList = (params) => dispatch => {
    return new Promise( (resolve, reject) => {
        axios.get(url + 'headline/list', params)
            .then( res => {
                const list = res.data.list
                dispatch(createAction('REFRESH_HEADLINE_LIST')(list))
                resolve(list)
            }).catch( err => {
                reject(err)
            })
    })
}

// 重新渲染
export const renderHeadlineList = createAction('RENDER_HEADLINE_LIST')