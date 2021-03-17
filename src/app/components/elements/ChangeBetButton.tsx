import React from 'react'
import { connect } from 'react-redux'

import { UIButton, UITextAlign } from '@daocasino/dc-react-gamengine'

const ChangeBetButton = (props): JSX.Element => {
  const { autobetOnOff, autobetCounter, isPlaying } = props

  const isAutobetRunning = autobetOnOff && autobetCounter > -1
  const interactive = !isPlaying && !isAutobetRunning

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

const mapState = state => {
  const { autobetOnOff, autobetCounter, isPlaying } = state

  return { autobetOnOff, autobetCounter, isPlaying }
}

export default connect(mapState, null)(ChangeBetButton)
