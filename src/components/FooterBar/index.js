import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Icon from 'components/Icon-svg'
import './index.less'
import connect from 'connect'
@connect
@withRouter
export default class extends React.Component {
    activeElem = null;
    skipView = (path, e) => {
        this.props.history.push(path);
        this.refs.footer.querySelector('.active').classList.remove('active');
        let target = e.currentTarget;
        target.classList.add("active");  
    }
    render () {
        const {location: {pathname}, state: {user: {footerBarList}}} = this.props
        return (
            <footer ref="footer" className="df-c border-half-top footerbar-wrapper">
                <ul className="cf">
                    {
                        footerBarList.map( (item, index) => (
                            <li key={index} className={item.path === pathname ? 'active':''} 
                                onClick={e => {this.skipView(item.path,e)}}>
                                <Icon iconName={item.icon}></Icon>
                                <div>{item.title}</div>
                            </li>
                        ))
                    }
                </ul>
            </footer>
        )
    }
}