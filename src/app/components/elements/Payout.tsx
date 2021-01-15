import React from 'react'

import { tr, UIContainer, UIText, UITextAlign } from 'dc-react-gamengine'

export const Payout = (props): JSX.Element => {
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
        text={'x' + props.value}
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
