import React from 'react'

import { tr, UIContainer, UIRectangle, UIText, UITextAlign, Utils } from 'dc-react-gamengine'

export const PayoutOnWin = (props): JSX.Element => {
  return (
    <UIContainer x={props.x} y={props.y} interactive={true} buttonMode={true}>
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
