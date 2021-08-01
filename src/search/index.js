'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import logo from './images/logo.png'
import { common } from '../../common'
import { a } from './tree-shaking'
import './search.less'

console.log(common())

/** 下面这段代码会被摇掉！ */
if(4 > 5) {
  console.log(a())
}

class Search extends React.Component {

  constructor() {
    super()
    this.state = {
      Text: null
    };
  }

  loadComponent() {
    debugger
    import('./text.js').then((Text) => {
      this.setState({
          Text: Text.default
      });
  });
  }

  render () {
    const { Text } = this.state;

    return <div className="search-text">
      {
        Text ? <Text /> : null
      }
      Search Text<img src={ logo } onClick={ this.loadComponent.bind(this) } />
    </div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
)
