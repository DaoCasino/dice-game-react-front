import React from 'react'
import { connect } from 'react-redux'

import { Engine, UISprite } from '@daocasino/dc-react-gamengine'
import { soundOnOffAction } from '../../reducers/ReducerAction'

const SoundOnOffButton = (props): JSX.Element => {
  const { x, y, soundOnOff } = props

  const texture = Engine.instance.getResourceManager().getTexture(soundOnOff ?
    'sound_on_button_png' : 'sound_off_button_png')

  return <UISprite
    texture={texture}
    scale={{ x: 0.65, y: 0.65 }}
    x={x}
    y={y}
    buttonMode={true}
    interactive={true}
    pointerup={() => soundOnOffAction(!soundOnOff)}
  />
}

const mapState = (state) => {
  const { soundOnOff } = state

  return {
    soundOnOff,
  }
}

export default connect(mapState, null)(SoundOnOffButton)
