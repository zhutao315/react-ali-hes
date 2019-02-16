import React from 'react'
import Comments from './comments'
import Content from './content'

export default class extends React.Component {
    
    render () {
        return (
            <div>
                <Content {...this.props}/>
                <Comments {...this.props}/>    
            </div>
        )
    }
}