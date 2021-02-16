import React from 'react'
import { connect } from 'react-redux'

import { tr, UIContainer, UIRectangle, UIText, UITextAlign } from '@daocasino/dc-react-gamengine'
import { DiceMath } from '../../math/DiceMath'

const PayoutOnWin = (props): JSX.Element => {
  const { bet, chance } = props

  const value = DiceMath.getPayoutOnWin(bet, 100 - chance)

  console.log(bet)

  return (
    <UIContainer x={props.x} y={props.y}>
      <UIRectangle
        width={props.width}
        height={props.height}
        fill={0x000000}
        fillAlpha={0.2}
        borderRadius={6}
      />
      <UIText
        x={15}
        y={props.height / 2}
        anchor={{ x: 0, y: 0.5 }}
        alpha={0.4}
        text={tr('payoutOnWin')}
        style={{
          fill: 0xffffff,
          fontFamily: 'Rajdhani-fnt',
          fontSize: 16,
          align: UITextAlign.Center,
        }}
      />
      <UIText
        x={props.width - 15}
        y={props.height / 2}
        anchor={{ x: 1, y: 0.5 }}
        text={value}
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
  const { bet, chance } = state

  return {
    bet,
    chance,
  }
}

export default connect(mapState, null)(PayoutOnWin)
