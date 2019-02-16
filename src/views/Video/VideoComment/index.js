import React from 'react'
import Icon from 'components/Icon-svg'
import './index.less'
import connect from 'connect'
@connect
export default class extends React.Component {
    state = {
        hasMore: true,
        pageindex: 1
    }
    componentWillMount () {
        const {getVideoList, state: {video: {hasMore}}} = this.props
        if (!hasMore) return
    }
    handleRefresh () {
        this.setState({
            pageindex: 1
        })
        return this.props.refreshVideoList({
            pageindex: 1
        })
    }
    handleLoad () {
        let {pageindex} = this.state
        pageindex ++
        this.setState({
            pageindex 
        })
        /*return this.props.getVideoList({
            pageindex
        })*/
    }
    // canvas 绘制
    dragVideo (index) {
        let video = document.querySelectorAll('video')[index],
            ctx = document.querySelectorAll('canvas')[index].getContext('2d')
        video.play()
        let fps = 1000/30,
            w = document.querySelectorAll('.video')[index].clientWidth,
            h = document.querySelectorAll('.video')[index].clientHeight

        video.addEventListener('play', () => {
            setInterval( () => {
                ctx.drawImage(video, 0, 0, 320, 176);
            }, fps)
        })
    }
    // 播放
    play (index, item) {
        item.playBol = true
        this.dragVideo(index)
        // 添加playBol属性,重新渲染
        this.props.renderVideoList()
    }
    // 暂停
    pause (index, item) {
        if (!item.playBol) return
        document.querySelectorAll('video')[index].pause()
        this.attrReverse(item, 'playBol')
    }
    //属性置反
    attrReverse (item, attr) {
        item[attr] = !item[attr]
        this.props.renderVideoList()
    }
    showShare () {
        const {state: {user: {user}}, showShare, history} = this.props
        showShare();
    }
    like (index, video) {
        video.count ++;
        this.setState({
            like:'like'
        });
        //TODO call request
    }
    linkMore () {
        let {pageindex} = this.state
        pageindex ++
        this.props.getVideoList({
            pageindex
        })
        this.setState({
            pageindex 
        })
    }
    render () {
        return (
            <div className="video-comment">
                <div className="video-pp-user">
                    <div className="video-user-image" style={{backgroundImage: `url(${this.props.header})`}}></div>
                    <div className="video-feed-name">
                        <div className="video-user-name">{this.props.name}</div>
                        <div className="video-user-infoBox">                    
                            <span className="video-user-time">{this.props.time}</span>                    
                            <span className="video-user-time">{this.props.count}万人阅读</span>                
                        </div>
                    </div>
                </div>
                <div className="video-pp-longlist">
                    <pre className="video-pp-txt">
                        {this.props.content}
                    </pre>
                    {
                        this.props.image && <ul className="video-long-piclist">            
                        <li className="video-pic">
                            {
                                this.props.image && (<div className="piclist-img">                    
                                    <a href="javascript:;" className="c-pic-link" 
                                    style={{backgroundImage: `url(${this.props.image})`}}
                                data-rseat="707211_picall">                                            
                                    </a>                
                                </div>) 
                            }                          
                        </li>        
                    </ul>
                    }
                    {
                        this.props.reply && <div className="reply" glue-node="commentItem">
                        {
                            this.props.reply.map((user, index) => (
                                <div key={index} className="reply-info">
                                    <span className="name">{user.name}: </span>{user.content}
                                </div>
                            ))
                        }
                        <div className="c-link-more"></div>
                    </div>
                    }
                </div>
            </div>
        )
    }
} 