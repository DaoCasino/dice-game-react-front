import React from 'react'

import { tr, UIButton, UITextAlign } from '@daocasino/dc-react-gamengine'

export const PlayButton = (props): JSX.Element => {
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
        gradientFrom: 0x5792f0,
        gradientTo: 0x6e62e4,
        gradientType: 'linear',
        borderRadius: 10,
        interactive: true,
        buttonMode: true,
      }}
      text={{
        x: props.width / 2,
        y: props.height / 2,
        anchor: { x: 0.5, y: 0.5 },
        text: tr('spinButton'),
        style: {
          fill: 0xffffff,
          fontFamily: 'Rajdhani-Bold-fnt',
          fontSize: 28,
          align: UITextAlign.Center,
        },
      }}
    />
  )
}
