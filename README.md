git 上传流程：

git add .
git commit -m "<commit>"
git push -u aliOrigin master 
 
 以下是该项目 redux 流程：

 Import createAction from redux-action;                        
Exort  actionFunc = createAction(‘TO-DO’);         
---------------------------------------------------------------------                                                                                                                   
import handleAction from redux-action; 
let initState = {};
export reducers = handleAction({
      ‘TO-DO’: (state) => {…state}
}, initState)

import { createStore } from  ‘redux’;
export  store = createStore(reducers);
-----------------------------------------------------------------------------

Import { Provider } from ‘react-redux’;
<Provider store={store}>
<App>
</Provider>
Let {data} = this.context.store; ----   in component
----------------------------------------------------------------------------

Import { connect } from ‘react-redux’;
Import { bindActionCreators } from ‘redux’
Export connect(
   state = > {sate},
   dispatch => bindActionCreators(actions, dispatch)
)
------------------------------------------------------------------------------
@connect
class Home extends React.Component {
      let {actionFunc} = this.props;
      actionFunc({a:1}) -------    return {a:1};
}
