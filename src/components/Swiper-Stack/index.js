import React from 'react'
import './index.less'

export default class extends React.Component {

    render () {
      setTimeout(() => {
        new ElastiStack( document.getElementById( 'elasticstack' ));
      }, 4000);
        return (
          <section>
            <ul id="elasticstack" className="elasticstack">
              {this.props.children}
            </ul>
            <script src="http://www.bluestep.cc/demos/html5css3/p3768/js/modernizr.custom.js"></script>
            <script src="http://www.bluestep.cc/demos/html5css3/p3768/js/draggabilly.pkgd.min.js"></script>
            <script src="http://www.bluestep.cc/demos/html5css3/p3768/js/elastiStack.js"></script>
           
          </section>
        )
    }
}
