import React from 'react'
import VideoComment from '../VideoComment'
import PullLoad from 'components/PullLoad'
import Icon from 'components/Icon-svg'
import './index.less'
import connect from 'connect'
import CircleLoading from 'components/CircleLoading'

@connect
export default class extends React.Component {
    state = {
        hasMore: true,
        pageindex: 1
    }
    componentWillMount () {
        const {getVideoList, getComments, state: {video: {hasMore}}} = this.props
        if (!hasMore) return
        getVideoList({
            pageindex: this.state.pageindex
        })
        console.log('video-details');
        getComments({
            pageindex: this.state.pageindex
        })
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
        return this.props.getComments({
            pageindex
        })
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
        const {comments, videoList, hasMore} = this.props.state.video
        let item = videoList[0];
        let index = 0;
        let like = this.state.like;
        
        return (
            <div className="video">
                <div className="head df-sb border-half-bottom">
                        <div onClick={e => {this.props.history.goBack()}}>
                            <Icon iconName="jiantou"></Icon>
                        </div>
                        <Icon iconName="More" onClick={this.showShare.bind(this)}></Icon>
               </div>
               {item ? 
                    (
            <PullLoad handleLoad={this.handleLoad.bind(this)} handleRefresh={this.handleRefresh.bind(this)} hasMore={comments.hasMore}>
                
                <article className="video-wrapper">
                <div className="video-header">
                    <section className="item border-half-bottom" key={index}>
                                    <div className="video">
                                        <video src={item.video}></video>

                                        <div className="canvas-video bg-cover" style={{backgroundImage: `url(${item.images})`}}>
                                            <canvas onClick={e => {this.pause(index, item)}}></canvas>
                                        </div>
                                
                                        {
                                            !item.playBol ? (
                                                <div className="play" onClick={e => {this.play(index, item)}}>
                                                    <Icon iconName="play"></Icon>
                                                </div>
                                            ) : ''
                                        }
                                        {!item.playBol ? <time>{item.time}</time> : ''}
                                        {!item.playBol ? <div className="avatar bg-cover-all" style={{backgroundImage: `url(${item.image})`}}></div> : ''}
                                    </div>
                                    
                                </section>
                        <div className="video-title">
                            {item.title}
                        </div>
                        <div className="publish-time">
                            {item.publishTime} 发布
                            <small>{item.video_num}次播放</small>
                        </div>
                        <div className="video-share">
                            <div className={`video-share-shouchan ${like}`} onClick={e => {this.like(index, item)}}>{item.like_count || 29}</div>
                            <div className="video-share-weixin">微信</div>
                            <div className="video-share-pengyouquan">朋友圈</div>
                            <div className="video-share-qq">QQ</div>
                        </div>
                    </div>
                    <div className="video-container">
                        {
                            videoList.map( (item, index) => (
                                <section className="item border-half-bottom" key={index}>
                                    <div className="video">
                                        <div className="canvas-video bg-cover" style={{backgroundImage: `url(${item.images})`}}>
                                            <canvas onClick={e => {this.pause(index, item)}}></canvas>
                                        </div>
                                        
                                        {
                                            !item.playBol ? (
                                                <div className="play" onClick={e => {this.play(index, item)}}>
                                                    <Icon iconName="play"></Icon>
                                                </div>
                                            ) : ''
                                        }
                                        {!item.playBol ? <time>{item.time}</time> : ''}
                                        {!item.playBol ? <div className="avatar bg-cover-all" style={{backgroundImage: `url(${item.image})`}}></div> : ''}
                                    </div>
                                    <div className="title">
                                        <h4>{item.title}</h4>
                                        <small><span>{item.source}</span>{item.video_num}次播放</small>
                                    </div>
                                </section>
                            ))
                        }
                        <div className="video-link-more" onClick={e => this.linkMore()}>查看更多</div>

                    </div>
                    <div className="video-comments">
                        <div className="video-comments-title">发布评论</div>
                        <div className="video-comments-list">
                            {
                                comments.map( (item, index) => (
                                    <VideoComment {...item} key={index}></VideoComment>        
                                ))
                            }
                        </div>        
                    </div>
                    
                </article>
                
            </PullLoad>
            ) : (
                <div className="loading-wrapper df-c">
                    <CircleLoading/>
                </div>
            )}
            </div>
        )
    }
} 