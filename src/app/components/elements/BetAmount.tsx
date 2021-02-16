import React from 'react'
import { connect } from 'react-redux'

import { tr, UIContainer, UIText, UITextAlign } from '@daocasino/dc-react-gamengine'
import { TextInputCurrency } from './TextInputCurrency'
import { betInputAction } from '../../reducers/ReducerAction'

const BetAmount = (props): JSX.Element => {
  const { bet: value, betLimits, balance } = props

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
        min={betLimits.min}
        max={Math.min(balance, betLimits.max)}
        value={value}
        onChange={value => betInputAction(value)}
        onBlur={value => betInputAction(value)}
      />
    </UIContainer>
  )
}

const mapState = (state) => {
  const { bet, betLimits, balance } = state

  return {
    bet,
    betLimits,
    balance,
  }
}

export default connect(mapState, null)(BetAmount)
