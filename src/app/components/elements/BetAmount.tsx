import React from 'react'

import { tr, UIContainer, UIRectangle, UIText, UITextAlign, Utils } from 'dc-react-gamengine'

export const BetAmount = (props): JSX.Element => {
  return (
    <UIContainer x={props.x} y={props.y} interactive={true} buttonMode={true}>
      <UIRectangle
        width={props.width}
        height={props.height}
        borderRadius={6}
        fill={0x313354}
        stroke={0x53537b}
        strokeThickness={1}
      />
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
      <UIText
        x={20}
        y={props.height / 2}
        anchor={{ x: 1, y: 0.5 }}
        text={Utils.formatCurrency(props.value)}
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
