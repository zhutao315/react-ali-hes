import React from 'react'
import './index.less'
import detectPrefixes from './../../utils/detect-prefixes'

export default class extends React.Component {
    state = {
        stackinit: {
            visible: 3
        },
        pages: this.props.children,
        basicdata: {
            start: {},
            end: {}
          },
          temporaryData: {
            prefixes: detectPrefixes(),
            offsetY: '',
            poswidth: 0,
            posheight: 0,
            lastPosWidth: '',
            lastPosHeight: '',
            lastZindex: '',
            rotate: 0,
            lastRotate: 0,
            visible: 3,
            tracking: false,
            animation: false,
            currentPage: 0,
            opacity: 1,
            lastOpacity: 0,
            swipe: false,
            zIndex: 10,
            isTransitionEnd: false
          }
     
    }
    // 划出面积比例
    offsetRatio () {
        let $el = document.getElementById('swiper_stack')
        if (!$el) return 1;
        let width = $el.offsetWidth
        let height = $el.offsetHeight
        let offsetWidth = width - Math.abs(this.state.temporaryData.poswidth)
        let offsetHeight = height - Math.abs(this.state.temporaryData.posheight)
        let ratio = 1 - (offsetWidth * offsetHeight) / (width * height) || 0
        return ratio > 1 ? 1 : ratio
      }
      // 划出宽度比例
      offsetWidthRatio () {
        let $el = document.getElementById('swiper_stack')
        if (!$el) return 0;
        let width = $el.offsetWidth
        let offsetWidth = width - Math.abs(this.state.temporaryData.poswidth)
        let ratio = 1 - offsetWidth / width || 0
        return ratio
      }
    componentWillMount () {
        
    }
    componentMounted() {
         // 绑定事件
    // this.$on('next', () => {
    //     this.next()
    //   })
    //   this.$on('prev', () => {
    //     this.prev()
    //   })
      document.addEventListener('touchmove', (e) => {
        e.preventDefault()
      })
    }
    touchstart (e) {
        if (this.state.temporaryData.tracking) {
          return
        }
        // 是否为touch
        if (e.type === 'touchstart') {
          if (e.touches.length > 1) {
            this.state.temporaryData.tracking = false
            return
          } else {
            // 记录起始位置
            this.state.basicdata.start.t = new Date().getTime()
            this.state.basicdata.start.x = e.targetTouches[0].clientX
            this.state.basicdata.end.x = e.targetTouches[0].clientX
            
          }
        }
        
        this.state.temporaryData.tracking = true
        this.state.temporaryData.animation = false
        
      }
      touchmove (e) {
        
        // 记录滑动位置
        if (this.state.temporaryData.tracking && !this.state.temporaryData.animation) {
          if (e.type === 'touchmove') {
            
            this.state.basicdata.end.x = e.targetTouches[0].clientX
          }
          // 计算滑动值
          this.state.temporaryData.poswidth = this.state.basicdata.end.x - this.state.basicdata.start.x
          e.currentTarget.style[this.state.temporaryData.prefixes.transition + 'Duration'] = '0ms';
          e.currentTarget.style.transform = 'translate3D(' + this.state.temporaryData.poswidth + 'px' + ',' + 0 + 'px' + ',0px)';
          
        }
      }
      touchend (e) {
        
        this.state.temporaryData.tracking = false
        this.state.temporaryData.animation = true
        // 滑动结束，触发判断
        // 判断划出面积是否大于0.4
        e.currentTarget.style[this.state.temporaryData.prefixes.transition + 'Duration'] = '300ms';

         if (Math.abs(this.state.temporaryData.poswidth) >= 100) {
          // 计算划出后最终位置
         
          this.state.temporaryData.poswidth = this.state.temporaryData.poswidth >= 0 ? this.state.temporaryData.poswidth + 300 : this.state.temporaryData.poswidth - 300
            
          this.state.temporaryData.opacity = 0
          this.state.temporaryData.swipe = true

          this.nextTick()
        // 不满足条件则滑入
        } else {
          this.state.temporaryData.poswidth = 0
          this.state.temporaryData.posheight = 0
          this.state.temporaryData.swipe = false
          this.state.temporaryData.rotate = 0
          e.currentTarget.style.transform = 'translate3D(' + this.state.temporaryData.poswidth + 'px' + ',' + 0 + 'px' + ',0px)';
        }

        this.setState({
            temporaryData: {...this.state.temporaryData},
            basicdata: {...this.state.basicdata}
          });
      }
      nextTick () {
        // 记录最终滑动距离
        this.state.temporaryData.lastPosWidth = this.state.temporaryData.poswidth
        this.state.temporaryData.lastPosHeight = this.state.temporaryData.posheight
        
        this.state.temporaryData.lastZindex = 20
        // 循环currentPage
        this.state.temporaryData.currentPage = this.state.temporaryData.currentPage === this.state.pages.length - 1 ? 0 : this.state.temporaryData.currentPage + 1
      }
      componentDidUpdate() {
          // currentPage切换，整体dom进行变化，把第一层滑动置最低
          this.state.temporaryData.poswidth = 0
          this.state.temporaryData.posheight = 0
          this.state.temporaryData.opacity = 1
          this.state.temporaryData.rotate = 0
      }
      onTransitionEnd (e, index) {
        let lastPage = this.state.temporaryData.currentPage === 0 ? this.state.pages.length - 1 : this.state.temporaryData.currentPage - 1
        // dom发生变化正在执行的动画滑动序列已经变为上一层
        if (this.state.temporaryData.swipe && index === lastPage) {
          this.state.temporaryData.animation = true
          this.state.temporaryData.lastPosWidth = 0
          this.state.temporaryData.lastPosHeight = 0
          this.state.temporaryData.lastOpacity = 0
          this.state.temporaryData.lastRotate = 0
          this.state.temporaryData.swipe = false
          this.state.temporaryData.lastZindex = -1

          // e.currentTarget.style['zIndex'] = '-1'
          // e.currentTarget.style['transform'] = 'translate3D(0,0,' + -1 * this.state.temporaryData.visible * 60 + 'px' + ')'
 
        }
        this.setState({
            temporaryData: {...this.state.temporaryData},
            basicdata: {...this.state.basicdata}
          });
          
          
        }
      prev () {
        this.state.temporaryData.tracking = false
        this.state.temporaryData.animation = true
        // 计算划出后最终位置
        let width = this.refs.$el.offsetWidth
        this.state.temporaryData.poswidth = -width
        this.state.temporaryData.posheight = 0
        this.state.temporaryData.opacity = 0
        this.state.temporaryData.rotate = '-3'
        this.state.temporaryData.swipe = true
        this.nextTick()
        this.setState({
            temporaryData: {...this.state.temporaryData},
            basicdata: {...this.state.basicdata}
          });
      }
      next () {
        this.state.temporaryData.tracking = false
        this.state.temporaryData.animation = true
        // 计算划出后最终位置
        let width = this.refs.$el.offsetWidth
        this.state.temporaryData.poswidth = width
        this.state.temporaryData.posheight = 0
        this.state.temporaryData.opacity = 0
        this.state.temporaryData.rotate = '3'
        this.state.temporaryData.swipe = true
        this.nextTick()
        this.setState({
            temporaryData: {...this.state.temporaryData},
            basicdata: {...this.state.basicdata}
          });
      }
      rotateDirection () {
        if (this.state.temporaryData.poswidth <= 0) {
          return -1
        } else {
          return 1
        }
      }
      angleRatio () {
        let height = this.refs.$el.offsetHeight
        let offsetY = this.state.temporaryData.offsetY
        let ratio = -1 * (2 * offsetY / height - 1)
        return ratio || 0
      }
      inStack (index, currentPage) {
        let stack = []
        let visible = this.state.temporaryData.visible
        let length = this.state.pages.length
        for (let i = 0; i < visible; i++) {
          if (currentPage + i < length) {
            stack.push(currentPage + i)
          } else {
            stack.push(currentPage + i - length)
          }
        }
        return stack.indexOf(index) >= 0
      }
      // 非首页样式切换
      transform (index) {
        let currentPage = this.state.temporaryData.currentPage
        let length = this.state.pages.length;
        let lastPage = currentPage === 0 ? this.state.pages.length - 1 : currentPage - 1
        
        let style = {}
        let visible = this.state.temporaryData.visible
        if (index === this.state.temporaryData.currentPage) {
          return
        }
        
        if (this.inStack(index, currentPage) && index !== lastPage) {
          let perIndex = index - currentPage > 0 ? index - currentPage : index - currentPage + length
          
          style['opacity'] = '1'
          style['transform'] = 'translate3D(0,0,' + -1 * 60 * (perIndex) + 'px' + ')'
          style['zIndex'] = visible - perIndex
          if (!this.state.temporaryData.tracking) {
            style[this.state.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
            style[this.state.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
          }
        } else if (index === lastPage && this.state.temporaryData.swipe) {
          
          style['transform'] = 'translate3D(' + this.state.temporaryData.lastPosWidth + 'px' + ',' + this.state.temporaryData.lastPosHeight + 'px' + ',0px) ' + 'rotate(' + this.state.temporaryData.lastRotate + 'deg)'
          style['opacity'] = 1//this.state.temporaryData.lastOpacity
          style['zIndex'] = this.state.temporaryData.lastZindex
          style[this.state.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
          style[this.state.temporaryData.prefixes.transition + 'Duration'] = 400 + 'ms'
        } else {
          style['zIndex'] = '-1'
          style['opacity'] = 1
          style['transform'] = 'translate3D(0,0,' + -1 * (visible-1) * 60 + 'px' + ')'
        }
        return style
      }
      // 首页样式切换
      transformIndex (index) {
        if (index === this.state.temporaryData.currentPage) {
          let style = {}
          style['transform'] = 'translate3D(' + 0 + 'px' + ',' + this.state.temporaryData.posheight + 'px' + ',0px) ' + 'rotate(' + this.state.temporaryData.rotate + 'deg)'
          style['opacity'] = 1
          style['zIndex'] = 10
          if (this.state.temporaryData.animation) {
            style[this.state.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
            style[this.state.temporaryData.prefixes.transition + 'Duration'] = (this.state.temporaryData.animation ? 300 : 0) + 'ms'
          }
          return style
        }
      }

      bgColor(index){
        let colors = ['red', 'blue', 'orange', 'grey']
        return {'background-color': colors[index]}
      }
    
    render () {
        return (
            
            <ul id="swiper_stack" className="stack" ref="$el">
                {
                    this.props.children.map((item, index) =>
                    (<li key={index} className="stack-item"  
                        onTouchStart={e => this.touchstart(e)}
                        onTouchMove={e => this.touchmove(e)}
                        onTouchEnd={e => this.touchend(e)}
                        onTouchCancel={e => this.touchend(e)}
                        onTransitionEnd={e => this.onTransitionEnd(e, index)}
                        style={{...this.transformIndex(index), ...this.transform(index)}}>
                        {item}
                    </li>))
                }
            </ul>
        )
    }
}