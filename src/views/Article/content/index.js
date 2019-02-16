import React from 'react'
import Icon from 'components/Icon-svg'
import CircleLoading from 'components/CircleLoading'
import connect from 'connect'
import './index.less'

@connect
export default class extends React.Component {
    state = {
        loading: false
    }
    async componentWillMount () {
        
        const {match: {params: {id}}, getArticle, state: {common: {articleInfo}}} = this.props
        if (articleInfo.id === id) return 
        this.setState({
            loading: true
        })
        await getArticle({id});
        this.setState({
            loading: false
        })
    }
    // 点赞
    likeNum (info) {
        info.islike = !info.islike
        if (info.islike) {
            info.like_num ++
        }else{
            info.like_num --
        } 
        this.props.renderHeadlineList()
    }
    //属性置反
    attrReverse (info, attr) {
        info[attr] = !info[attr]
        this.props.renderArticle()
    }
    goBack() {
        this.refs.article_wrapper.style.height = '100%';
    }
    render () {
        const {articleInfo} = this.props.state.common
       
        return (
            <article ref="article_wrapper" className="article-wrapper">
                <div className="head df-sb border-half-bottom">
                    <div onClick={e => {this.props.history.goBack()}}>
                        <Icon iconName="jiantou"></Icon>
                    </div>
                    <Icon iconName="More"></Icon>
                </div>
                {
                    !this.state.loading ? (
                        <div className="article-block">
                            <h2 className="article-block-title">{articleInfo.title}</h2>
                            <div className="info df-sb">
                                <div className="info-a">
                                    <div className="avatar bg-cover-all" style={{backgroundImage: `url(${articleInfo.avatar})`}}></div>
                                    <div>
                                        <h6 className="cute">{articleInfo.source}</h6>
                                        <time>{articleInfo.time}小时前</time>
                                    </div>
                                </div>
                                <div  className={articleInfo.attention?'like-box like-n':'like-box like-y'} onClick={e => {this.attrReverse(articleInfo, 'attention')}}>{articleInfo.attention?'取消关注':'点击关注'}</div>
                            </div>
                            <div className="blockquote desc">{articleInfo.desc}</div>
                            {
                                articleInfo.images && articleInfo.images.map((url, index) => (
                                    <div className="article-block-images" key={index}><img src={url} /></div>
                                ))
                            }
                            <p className="intro">{articleInfo.intro}</p>
                            <div className="tags">
                                {
                                    articleInfo.tags && articleInfo.tags.map((tag, index) => (
                                        <div className="tag" key={index}>{tag}</div>
                                    ))
                                }
                            </div>
                            <div className="like-container df-sa">
                                <div className={`like df-c ${articleInfo.islike ? 'like-y':''}`} onClick={e => {this.likeNum(articleInfo)}}>
                                    <Icon iconName="zan"></Icon>
                                    <span>{articleInfo.like_num}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="loading-wrapper df-c">
                            <CircleLoading />
                        </div>
                    ) 
                }
            </article>
        )
    }
}