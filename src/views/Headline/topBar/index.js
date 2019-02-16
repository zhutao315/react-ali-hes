import React from 'react'
import {withRouter} from 'react-router-dom'
import Icon from 'components/Icon-svg'
import TextComponent from '../text/index'
import connect from 'connect'
import { CSSTransition } from 'react-transition-group';

@connect
@withRouter
export default class extends React.Component {
    state = {
        item: {title: '发布', icon: '24'},
        textBol: false
    }
    
    show (e, text) {
        e.preventDefault();
        const {state: {user: {user}}, showAlert, history} = this.props
        if (!user.name) {
            showAlert({
                content: '请先登录!',
                success: () => {
                    history.slideStatus = 'top'
                    history.push('/login')
                }
            })
            return
        }
        
        this.setState({
            textBol: true
        })
    }
    onClose () {
        this.setState({
            textBol: false
        })
    }
    render () {
        const {item, textBol, content, show} = this.state
    
        return (
            <div className="headeline-top-bar df-c">
                <div  className={`item  ${textBol ? 'hide':''}`}  onClick={e => {this.show(e, item.title)}}>
                    <Icon iconName={item.icon} ></Icon>
                </div>
                
                
            <TextComponent ref="text_wrap" className={textBol ? 'text-active':''} onClose={this.onClose.bind(this)}></TextComponent>
            
            </div>
        )
    }
}
