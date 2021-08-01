'use strict'

// import React from 'react'
// import logo from './images/logo.png'
// import { common } from '../../common'
// import { a } from './tree-shaking'
// import './search.less'

const React = require('react')
const logo = require('./images/logo.png')
const { common } = require('../../common')
const { a } = require('./tree-shaking')
require('./search.less')


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

module.exports = <Search />
