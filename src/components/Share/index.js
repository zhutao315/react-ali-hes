import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import connect from 'connect'
import Icon from 'components/Icon-svg'
import './index.less'
@connect
export default class extends React.Component {
    static propTypes = {
        show: PropTypes.bool,
        content: PropTypes.string,
        success: PropTypes.func
    }
    static defaultProps = {
        content: '',
        success: function(){}
    }
    state = {
        title: '提示',
        btn: '确定',
        show: false
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            show: nextProps.show
        })
    }
    hideShare = () => {
        this.setState({
            show: false
        })
        const {success, hideShare} = this.props
        hideShare()
        success && success()
    }
    render () {
        let {title, btn, show} = this.state
        const {content} = this.props
        return show ? (
                <div className="share">
                    <div className="share-title"><span>分享至</span><Icon iconName="close" onClick={this.hideShare.bind(this)}/></div>
                    <div className="share-content-wrapper">
                        <div className="share-content">
                            <div><div className="share-icon weix" src="/src/assets/images/share.jpg" ></div><div>微信</div></div>
                            <div><div className="share-icon pengyou" src="/src/assets/images/share.jpg" ></div><div>微信朋友圈</div></div>
                            <div><div className="share-icon qq" src="/src/assets/images/share.jpg" ></div><div>QQ</div></div>
                            <div><div className="share-icon qq-kongjian" src="/src/assets/images/share.jpg" ></div><div>QQ空间</div></div>
                            <div><div className="share-icon weibo" src="/src/assets/images/share.jpg" ></div><div>微博</div></div>
                            <div><div className="share-icon zhifubao" src="/src/assets/images/share.jpg" ></div><div>支付宝</div></div>
                        </div>
                    </div>
                    
                    <div className="share-other">
                        <div className="share-other-title"><span>其他功能</span><div className="share-line ui-border-t"></div></div>
                        <div className="share-other-content">
                        <div className="share-content">
                            <div><div className="share-icon shouchan" src="/src/assets/images/shouchan.png" ></div><div>收藏</div></div>
                            <div><div className="share-icon xinxi" src="/src/assets/images/xinxi.png" ></div><div>举报</div></div>
                            <div><div className="share-icon un-like" src="/src/assets/images/chanpin1.png" ></div><div>不喜欢</div></div>
                        </div>
                        </div>
                    </div>
                </div>
            ) : ''
    }
}
