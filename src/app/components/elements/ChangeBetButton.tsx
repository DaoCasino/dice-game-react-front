import React from 'react'

import { UIButton, UITextAlign } from 'dc-react-gamengine'

export const ChangeBetButton = (props): JSX.Element => {
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
        pointerdown: props.pointerdown,
      }}
      text={{
        x: props.width / 2,
        y: props.height / 2,
        anchor: { x: 0.5, y: 0.5 },
        text: props.text,
        style: {
          fill: 0xffffff,
          fontFamily: 'Rajdhani-fnt',
          fontSize: 16,
          align: UITextAlign.Center,
        },
      }}
    />
  )
}
