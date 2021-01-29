import React from 'react'
import { connect } from 'react-redux'

import { tr, UIContainer, UIText, UITextAlign } from 'dc-react-gamengine'
import { DiceMath } from '../../math/DiceMath'

const Payout = (props): JSX.Element => {
  const { chance } = props

  const value = DiceMath.getPayout(100 - chance)

  return (
    <UIContainer x={props.x} y={props.y}>
      <UIText
        anchor={{ x: 0.5, y: 0 }}
        alpha={0.4}
        text={tr('payout')}
        style={{
          fill: 0xffffff,
          fontFamily: 'Rajdhani-fnt',
          fontSize: 16,
          align: UITextAlign.Center,
        }}
      />
      <UIText
        y={34}
        anchor={{ x: 0.5, y: 0.5 }}
        text={'x' + value}
        style={{
          fill: 0xffffff,
          fontFamily: 'Rajdhani-fnt',
          fontSize: 20,
          align: UITextAlign.Right,
        }}
      />
    </UIContainer>
  )
}

const mapState = (state) => {
  const { chance } = state

  return {
    chance,
  }
}

export default connect(mapState, null)(Payout)

