import React from 'react'
import Icon from 'components/Icon-svg'
import CircleLoading from 'components/CircleLoading'
import connect from 'connect'
import './index.less'
@connect
export default class extends React.Component {
    
    async componentWillMount () {
        const {match: {params: {id}}, getArticleComments} = this.props
        await getArticleComments({id})
    }

    render () {
        const {articleCommentsInfo = []} = this.props.state.common
        return (
            <div id="comments" className="comments-wrapper">
    <div className="container">
        <h3 className="comments-count">
            <i></i>文章评论
        </h3>
        <div id="commentlist">
        <ul className="commentlist">
            {
                articleCommentsInfo.map((comment, index) => (
                    <li key={index} className="comment byuser comment-author-Steve even thread-even depth-1" id="li-comment-322538" >
                        <div id="comment-322538" className="comment-block">
                        <div className="comment-avatar">
                        <img src={comment.image} alt="" height="32" width="32" className="avatar"/></div>
                        <div className="comment-info">
                        <div className="comment-meta">
                        <div className="comment-author" >{comment.name}</div></div>
                        <div className="comment-content" >
                        <p>{comment.content}</p>
                        </div>
                        </div>
                        <ul className="children">
                            {
                                comment.reply.map((replyItem, index1) => (
                                    <li key={index + '-' + index1} className="comment byuser comment-author-2280 bypostauthor odd alt depth-2" id="li-comment-322982"  >
                                        <div id="comment-322982" className="comment-block">
                                        <div className="comment-avatar">
                                        <img src={replyItem.image} alt="" height="32" width="32" className="avatar"/></div>
                                        <div className="comment-info">
                                            <div className="comment-meta">
                                            <div className="comment-author" >{replyItem.name}
                                                <span className="iconfont icon-level" title="文章作者"></span></div>
                                            </div>
                                            <div className="comment-content" >
                                            <p>{replyItem.content}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        </div>
                    </li>
                ))
            }
        </ul>
        <nav className="commentnav"></nav>
        </div>
    </div>
</div>
        )
    }
}
