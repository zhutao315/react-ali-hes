import React from 'react'
import FooterBar from 'components/FooterBar'
import Contact from './contact/index'
import Head from './head/index'
import Body from './body/index'
import './index.less'

export default () => (
    <article>
        <div className="account-container">
            <Head></Head>
            <Body></Body>
            <Contact></Contact>
        </div>
        <FooterBar></FooterBar>
    </article>
)

