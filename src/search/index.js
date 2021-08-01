'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import logo from './images/logo.png'
import { common } from '../../common'
import './search.less'

console.log(common())

class Search extends React.Component {
  render () {
    return <div className="search-text">
      Search Text<img src={ logo } />
    </div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
)
