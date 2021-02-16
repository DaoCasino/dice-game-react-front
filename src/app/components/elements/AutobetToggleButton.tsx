import React from 'react'
import { connect } from 'react-redux'

import { tr, UICircle, UIContainer, UIRectangle, UIText, UITextAlign } from '@daocasino/dc-react-gamengine'
import { autobetOnOffAction } from '../../reducers/ReducerAction'

const AutobetToggleButton = (props): JSX.Element => {
  const { x, y, autobetOnOff } = props

  const width = 60
  const height = 30

  const onButton = (
    <UIRectangle
      width={width}
      height={height}
      fill={0x61ffb1}
      borderRadius={15}
      interactive={true}
      buttonMode={true}
      pointerdown={() => autobetOnOffAction(!autobetOnOff)}
    />
  )

  const offButton = (
    <UIRectangle
      width={width}
      height={height}
      fill={0xff6f61}
      borderRadius={15}
      interactive={true}
      buttonMode={true}
      pointerdown={() => autobetOnOffAction(!autobetOnOff)}
    />
  )

  const selectorMargin = 2
  const selectorRadius = height / 2 - selectorMargin
  const selector = (
    <UICircle
      fill={0xffffff}
      radius={selectorRadius}
      x={autobetOnOff ? width - height / 2 : height / 2}
      y={height / 2}
    />
  )

  const text = (
    <UIText
      x={
        autobetOnOff
          ? selectorRadius + selectorMargin * 2
          : width - selectorRadius - selectorMargin * 2
      }
      y={height / 2}
      anchor={{ x: 0.5, y: 0.5 }}
      text={tr(autobetOnOff ? 'autobetOn' : 'autobetOff')}
      style={{
        fill: 0x1b1b45,
        fontFamily: 'Rajdhani-fnt',
        fontSize: 12,
        align: UITextAlign.Center,
      }}
    />
  )

  return (
    <UIContainer x={x} y={y}>
      {autobetOnOff === true ? onButton : offButton}
      {selector}
      {text}
    </UIContainer>
  )
}

const mapState = state => {
  const { autobetOnOff } = state

  return {
    autobetOnOff,
  }
}

export default connect(mapState, null)(AutobetToggleButton)
