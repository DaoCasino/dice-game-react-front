import React from 'react'
import { connect } from 'react-redux'

import { tr, UIButton, UITextAlign } from '@daocasino/dc-react-gamengine'

const PlayButton = (props): JSX.Element => {
  const interactive = !props.isPlaying

  return (
    <UIButton
      x={'x' in props ? props.x : 0}
      y={'y' in props ? props.y : 0}
      alpha={interactive ? 1 : 0.5}
      interactive={interactive}
      buttonMode={interactive}
      shape={{
        x: 0,
        y: 0,
        width: props.width,
        height: props.height,
        gradientFrom: 0x5792f0,
        gradientTo: 0x6e62e4,
        gradientType: 'linear',
        borderRadius: 10,
        interactive: interactive,
        buttonMode: interactive,
        pointerdown: props.pointerdown,
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

const mapState = state => {
  const { isPlaying } = state

  return {
    isPlaying,
  }
}

export default connect(mapState, null)(PlayButton)
