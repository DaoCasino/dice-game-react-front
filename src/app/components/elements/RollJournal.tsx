import React from 'react'
import { connect } from 'react-redux'

import { tr, UIContainer, UIText, UITextAlign } from '@daocasino/dc-react-gamengine'

const RollJournal = (props): JSX.Element => {
  const {x, y} = props

  const hasEntries = false

  const journal = null;
  const label = <UIText
    anchor={{ x: 0, y: 0.5 }}
    alpha={0.5}
    text={tr('rollJournal')}
    style={{
      fill: 0xffffff,
      fontFamily: 'Rajdhani-fnt',
      fontSize: 14,
      align: UITextAlign.Left,
    }}
  />

  return (
    <UIContainer x={x} y={y}>
      {hasEntries ? journal : label}
    </UIContainer>
  )
}

const mapState = state => {
  return {
    state: state,
  }
}

export default connect(mapState, null)(RollJournal)
