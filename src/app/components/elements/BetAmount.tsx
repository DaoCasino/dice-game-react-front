import React from 'react'
import { connect } from 'react-redux'

import { tr, UIContainer, UIText, UITextAlign, Utils } from '@daocasino/dc-react-gamengine'
import { TextInputCurrency } from './TextInputCurrency'

const BetAmount = (props): JSX.Element => {
  const { bet: value } = props

  return (
    <UIContainer x={props.x} y={props.y} interactive={false} buttonMode={false}>
      <UIText
        x={0}
        y={-8}
        anchor={{ x: 0, y: 1 }}
        alpha={0.4}
        text={tr('betAmount')}
        style={{
          fill: 0xffffff,
          fontFamily: 'Rajdhani-fnt',
          fontSize: 16,
          align: UITextAlign.Left,
        }}
      />
      <TextInputCurrency
        width={props.width}
        height={props.height}
        value={value}
      />
    </UIContainer>
  )
}

const mapState = (state) => {
  const { bet } = state

  return {
    bet,
  }
}

export default connect(mapState, null)(BetAmount)
