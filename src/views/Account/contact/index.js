import React from 'react'
import Icon from 'components/Icon-svg'
import SwiperDeck from 'components/Swiper-Deck'
import './index.less'
import {withRouter} from 'react-router-dom'
import connect from 'connect'
@connect
@withRouter
export default class extends React.Component {
    skip = path => {
        const {state: {user: {user: {name}}}, showAlert, history} = this.props

        // 是否登录
        if (!name) {
            showAlert({
                content: '请先登录!',
                success: () => {
                    history.slideStatus = 'top'
                    history.push('/login')
                }
            })
        }else{
           history.slideStatus = 'left'
           history.push(path) 
        }
        
    }
    render () {
        return (
            <section className="account-contact">
                <div className="account-contact-header">
                    <div className="contact-title">回答问题</div>
                    <div className="more-question">更多问题</div>
                </div>
                <div className="account-contact-content">
                    <SwiperDeck>
                        <div className="question-card">
                            <div className="q-c-desc">个税申报app里面提到的‘自然人’是什么意思啊</div>
                            <footer className="q-c-operat">
                                <div className="q-c-gz">1人关注</div>
                                <div>
                                    <div className="ignore-btn">忽略</div>
                                    <div className="response-btn">回答</div>
                                </div>
                            </footer>
                        </div>
                        <div className="question-card">
                            <div className="q-c-desc">20岁女生穿什么衣服能得到男孩子喜欢</div>
                            <footer className="q-c-operat">
                                <div className="q-c-gz">1人关注</div>
                                <div>
                                    <div className="ignore-btn">忽略</div>
                                    <div className="response-btn">回答</div>
                                </div>
                            </footer>
                        </div>
                        <div className="question-card">
                            <div className="q-c-desc">女生做前端到底合不合适</div>
                            <footer className="q-c-operat">
                                <div className="q-c-gz">1人关注</div>
                                <div>
                                    <div className="ignore-btn">忽略</div>
                                    <div className="response-btn">回答</div>
                                </div>
                            </footer>
                        </div>
                    </SwiperDeck>
                </div>
            </section>
        )
    }
}