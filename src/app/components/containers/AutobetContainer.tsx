import React, { Component } from 'react'
import { connect } from 'react-redux'

import { UIContainer, UIRectangle } from 'dc-react-gamengine'

class AutobetContainer extends Component<any, any> {
  render() {
    const { x, y, width, height, state } = this.props

    return (
      <UIContainer x={x} y={y}>
        <UIRectangle width={width} height={height} fill={0x1b1b46} />
      </UIContainer>
    )
  }
}

const mapState = state => {
  return {
    state: state,
  }
}

export default connect(mapState, null)(AutobetContainer)
