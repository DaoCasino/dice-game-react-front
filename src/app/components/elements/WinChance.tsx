import React from 'react'
import { connect } from 'react-redux'

import { tr, UIContainer, UIText, UITextAlign } from '@daocasino/dc-react-gamengine'
import { DiceMath } from '../../math/DiceMath'

const WinChance = (props): JSX.Element => {
  const { chance } = props

  const value = parseInt((100 - DiceMath.getWinChance(chance) * 100).toFixed(0))

  return (
    <UIContainer x={props.x} y={props.y}>
      <UIText
        anchor={{ x: 0.5, y: 0 }}
        alpha={0.4}
        text={tr('winChance')}
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
        text={value + '%'}
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

export default connect(mapState, null)(WinChance)
