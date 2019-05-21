import React, { Component } from 'react'

interface State {
  renderList: string[]
}
export default class scrollWrapper extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      renderList: ['1', '2', '3', '4', '5', '6', '7']
    }
  }
  _renderItem = (val: string) => (
    <div className="scroll-item" key={val}>
      {val}
    </div>
  )
  render() {
    return <div className="scroll-wrapper">{this.state.renderList.map(this._renderItem)}</div>
  }
}
