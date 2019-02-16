import React from 'react'
import Icon from 'components/Icon-svg'
import connect from 'connect'
import move from './move.js'
import './move.less'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
  <div className="sortItem"><img src={`${value}`} /></div>
);
 
const SortableList = SortableContainer(({items}) => {
  return (
    <div id="ul1">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} helperClass="sortItem-active" index={index} value={value} />
      ))}
    </div>
  );
});

class SortableComponent extends React.Component {
    render() {
      return <SortableList {...this.props} axis="xy" helperClass="sortItem-active"  />;
    }
  }


@connect
export default class extends React.Component {
    state = {
        val: '',
        input: null,
        items: [],
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
          items: arrayMove(this.state.items, oldIndex, newIndex),
        });
      };
      bindTeansitionEnd() {
        this.refs.text_wrap_content.addEventListener('transitionend', () => {
            this.refs.text_wrap_content.style.height = 
            this.refs.text_wrap_content.classList.contains('text-active') ? '100%' : '0px'
        });
      } 
    componentDidMount () {
        //this.bindTeansitionEnd();
        let that = this;
        this.refs.text.focus();
        this.refs.uploadImage.addEventListener("change",function() {
            console.log('this');
            var filePath = this.value//读取图片路径								
            var fr = new FileReader();//创建new FileReader()对象				
            var imgObj = this.files[0];//获取图片								
            fr.readAsDataURL(imgObj);//将图片读取为DataURL											
            if(filePath.indexOf("jpg") != -1 || filePath.indexOf("JPG") != -1 
            || filePath.indexOf("PNG") != -1 || filePath.indexOf("png") != -1) {
                fr.addEventListener('load', function() {
                    console.log('that::',that);
                    let {items} = that.state;
                    items.push(this.result);
                    that.setState({items});	
                });				
            } else {
                  
            }
        });
    }
    componentDidUpdate () {
       
    }
    handleChange (val) {
        this.setState({val})
    }
    async send () {
        const {onClose, addHeadlineList, showAlert, showLoading, hideLoading} = this.props
        const {val, items} = this.state
        if (!val) {
            showAlert({
                content: '请输入你的分享内容!'
            })
            return
        }
        showLoading()

        await addHeadlineList({
            intro: val,
            name: 'admin',
            items: items
        })
        hideLoading()

        onClose()

    }
    handleUploadClick() {
        const {showAlert} = this.props
        if (this.state.items.length === 6) {
            showAlert({
                content: '图片最多6张'
            })
            return
        }
    }
    render () {
        const {val} = this.state
        
        return (
            <div ref="text_wrap_content"  className={`text-wrapper  ${this.props.className}`}>
                <div className="title df-sb border-half-bottom">
                    <div className="t-l" onClick={this.props.onClose}>取消</div>
                    <div className="t-r t-disable" className={val ? 't-active':''} onClick={this.send.bind(this)}>发布</div>
                </div>
                <div className="text-box">
                    <textarea placeholder="分享新鲜事..." ref="text" value={val} onChange={e => {this.handleChange(e.target.value)}}></textarea>
                </div>
                <div className="image-box">
                    <SortableComponent items={this.state.items} onSortEnd={this.onSortEnd}  />
                    <div className="upload-image">
                        <label htmlFor="uploadImage">+</label>
                        <input id="uploadImage" type="file" ref="uploadImage" onClick={e => {this.handleUploadClick(e.target.value)}} />
                    </div>
                </div>
            </div>
        )
    }
}
