import React from 'react'
import PullLoad from 'components/PullLoad'
import connect from 'connect'
import {withRouter} from 'react-router-dom'
const NoneImages = ({item}) => (
    <div>
        <h4>{item.title}</h4>
        <p className="wes-3">{item.intro}</p>
        <div className="df-sb">
            <div className="small-box">
                <span>{item.source}</span>
                <span>评论：{item.comment}</span>
                <span>{item.time}</span>
            </div>
        </div>
    </div>
)

const ImagesOne = ({item}) => (
    <div className="df-sb">
        <div className="item-r">
            <img src={item.images[0]} alt=""/>
        </div>
        <div className="item-l">
            <h4>{item.title}</h4>
            <p className="wes-2">{item.intro}</p>
            <div className="df-sb">
                <div className="small-box">
                    <div><span>{item.source}</span><span>{item.type}</span></div>
                    <div>评论：{item.comment}</div>
                </div>
            </div>
        </div>
    </div>
)

const ImagesMore = ({item}) => (
    <div>
        <div className="item-t">
            <h4>{item.title}</h4>
            <p className="wes-1">{item.intro}</p>
        </div>
        <div className="item-b df-sb">
            {
                item.images.map( (img, index) => (<img key={index} src={img} alt={img} style={{width: item.images.length === 2 ? '40%':'25%'}}/>))
            }
        </div>
        <div className="df-sb m-t-10">
            <div className="small-box">
                <div><span>{item.source}</span><span>{item.type}</span></div>
                <div>评论：{item.comment}</div>
            </div>
        </div>
    </div>
)

@connect
@withRouter
export default class extends React.Component {
    state = {
        hasMore: true
    }
    handleLoad  = async () => {
        const {getListOfNews, state: {home: {newsList, newsIndex}}} = this.props
        this.refs.loadBadgt.classList.add('loading');
        await getListOfNews(newsList[newsIndex],{newsList, newsIndex, hasMore: this.state.hasMore})
        this.refs.loadBadgt.classList.remove('loading');
    }
    handleRefresh () {
        const {refreshListOfNews, state: {home: {newsList, newsIndex}}} = this.props
        return refreshListOfNews(newsList[newsIndex], newsIndex)
    }
    render () {
        const {news} = this.props
        
        return (
            <section className="swiper-box">
                <ul>
                    {
                        news.list && news.list.map((item, index) => (
                            <li key={index} className="item border-half-bottom" onClick={e => {
                                this.props.history.slideStatus = 'left'
                                this.props.history.push(`/article/${item.id}`)
                            }}>
                                {
                                    item.images.length === 0 ? <NoneImages item={item}/> :
                                    item.images.length === 1 ? <ImagesOne item={item}/> : <ImagesMore item={item}/>                            
                                }
                            </li>
                        ))
                    }
                    </ul>
                    
                    <div className={`load-badgt ${!news.list && 'loading'}`} ref="loadBadgt">
                        {
                            news.hasMore ? <div className="load-more" onClick={ this.handleLoad }>加载更多</div> : <div className="load-finish">没有了:)</div>
                        }
                        <i/>
                    </div>
            </section>
        )
    }
}
