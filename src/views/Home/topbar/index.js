import React from 'react'
import './index.less'
import TopBarBox from 'components/TopBarBox'
import connect from 'connect'
import Swiper from 'react-id-swiper'
@connect
export default class extends React.Component {
    state = {
        swiper: {},
        isTopBarBox: false
    }
    componentWillMount () {
        this.getListOfNews(this.props.state.home.newsIndex)
    }
    componentDidMount () {
        const swiper = this.refs['top-bar-swiper'].swiper
        const index = this.props.state.home.newsIndex
        this.setState({
            swiper 
        })
        swiper.slideTo((index-2 >= 0 ? index-2 : 0), 500, false);
        this.bindScrollEvent();
    }
    componentDidUpdate () {
        const swiper = this.refs['top-bar-swiper'].swiper
        const index = this.props.state.home.newsIndex
        swiper.slideTo((index-2 >= 0 ? index-2 : 0), 500, false);
    }
    bindScrollEvent() {
        let homeTopBarWarp = this.refs['top-bar-warp'];
        let main = document.getElementById('main');
        main.onscroll = () => {
            if (main.scrollTop > 200) {    
                this.setState({active: true});
            }else {
                this.setState({active: false});
            }
        }
    }
    getListOfNews (newsIndex) {
        const {getListOfNews, state: {home: {newsList}}} = this.props
        getListOfNews(newsList[newsIndex],{newsList, newsIndex})
    }
    closeBox () {
        this.setState({
            isTopBarBox: false
        })
    }
    active (index) {
        this.props.setNewsIndex(index)
        this.state.swiper.slideTo((index-2 >= 0 ? index-2 : 0), 500, false)
        this.getListOfNews(index)
    }
    render () {
        const {swiper, isTopBarBox, active} = this.state
        const {newsList, newsIndex} = this.props.state.home
        return (
            <div className={`${active ? 'home-topbar active':'home-topbar'}`}>
            <div className="topbar-content">
            <div className="home-topbar-wrapper border-half-bottom" ref="top-bar-warp">
                <div className="top-menu-bar">
                    <Swiper slidesPerView={5} ref='top-bar-swiper' shouldSwiperUpdate={true}>
                        {
                            newsList.map((news, index) => (
                                <div key={index} className={`${newsIndex === index ? 'active':''}`} onClick={this.active.bind(this, index)}>{news.title}</div>
                            ))
                        }
                    </Swiper>
                </div>
                <a className="top-menu-more-btn df-c" href="javascript:void(0)" onClick={()=>{this.setState({isTopBarBox:true})}}><i className="list-shadow"></i><span className="cross"></span></a>
                
                <TopBarBox className={isTopBarBox ? 'top-bar-active' : ''} closeBox={this.closeBox.bind(this)}/>        
            </div>
            </div>
            
                <div className="top-menu-content">
                {
                    newsList.map((news, index) => {
                        if (index > 9) return;
                        return (
                            <div key={index} className={`top-menu-item ${newsIndex === index ? 'active':''}`}   onClick={this.active.bind(this, index)}>
                                <img  src={require("assets/images/icon_1.png") }/>
                                <div>{news.title}</div>
                            </div>
                        )
                    })        
                }
                </div>
            </div>
        )
    }
}
