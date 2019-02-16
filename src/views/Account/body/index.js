import React from 'react'
import Icon from 'components/Icon-svg'
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
            <section className="body-wrapper border-half">
                
                
                <div className="li border-half" onClick={this.skip.bind(this, '/mall')}>
                    <div>头条商城</div>
                    <div className="df-c">
                        <span>邀请好友得200元现金</span>
                        <Icon iconName="arrow"></Icon>
                    </div>
                    
                </div>
                <div className="li border-half-top" onClick={this.skip.bind(this,'/jd')}>
                    <div>京东特供</div>
                    <div className="df-c">
                        <span>新人领188红包</span>
                        <Icon iconName="arrow"></Icon>
                    </div>
                </div>

                <div className="li border-half-top account-system-set">
                    <div className="flex-align-icon" onClick={this.skip.bind(this,'/feedback')}>
                        <img src='/src/assets/images/account/account-social.png' />
                        <div>社区建设</div>
                    </div>
                    <div className="flex-align-icon" onClick={this.skip.bind(this,'/feedback')}>
                        <img src='/src/assets/images/account/account-back.png' />
                        <div>用户反馈</div>
                    </div>
                    <div className="flex-align-icon" onClick={this.skip.bind(this,'/system')}>
                        <img src='/src/assets/images/account/account-set.png' />
                        <div>系统设置</div>
                    </div>
                    <div className="flex-align-icon" onClick={this.skip.bind(this, '/msg')}>
                        <img src='/src/assets/images/account/account-message.png' />
                        <div>消息通知</div>
                    </div>
                </div>

                
            </section>
        )
    }
}