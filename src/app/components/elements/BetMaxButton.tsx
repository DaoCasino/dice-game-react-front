import React from 'react'

import { tr, UIButton, UITextAlign } from '@daocasino/dc-react-gamengine'

export const BetMaxButton = (props): JSX.Element => {
  return (
    <UIButton
      x={'x' in props ? props.x : 0}
      y={'y' in props ? props.y : 0}
      interactive={true}
      buttonMode={true}
      shape={{
        x: 0,
        y: 0,
        width: props.width,
        height: props.height,
        gradientFrom: 0xf29f36,
        gradientTo: 0xe3891a,
        gradientType: 'linear',
        borderRadius: 10,
      }}
      text={{
        x: props.width / 2,
        y: props.height / 2,
        anchor: { x: 0.5, y: 0.5 },
        text: tr('betMaxButton'),
        style: {
          fill: 0xffffff,
          fontFamily: 'Rajdhani-Bold-fnt',
          fontSize: 28,
          lineHeight: 25,
          align: UITextAlign.Center,
        },
      }}
    />
  )
}
