import React from 'react'
import { connect } from 'react-redux'

import { tr, UIContainer, UIText, UITextAlign } from '@daocasino/dc-react-gamengine'
import { CurrencyInput } from './CurrencyInput'
import { betInputAction } from '../../reducers/ReducerAction'

const BetAmount = (props): JSX.Element => {
  const { bet: value, betLimits, balance, isPlaying } = props

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
      <CurrencyInput
        width={props.width}
        height={props.height}
        min={betLimits.min}
        max={Math.min(balance, betLimits.max)}
        value={value}
        disabled={isPlaying}
        onBlur={value => betInputAction(value)}
      />
    </UIContainer>
  )
}

const mapState = (state) => {
  const { bet, betLimits, balance, isPlaying } = state

  return {
    bet,
    betLimits,
    balance,
    isPlaying,
  }
}

export default connect(mapState, null)(BetAmount)
