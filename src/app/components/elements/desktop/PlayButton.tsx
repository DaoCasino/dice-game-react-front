import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
  Engine,
  tr,
  UIButton,
  UIContainer,
  UISprite,
  UITextAlign,
  Utils,
} from '@daocasino/dc-react-gamengine'
import { TweenMax } from 'gsap'

const PlayButton = (props): JSX.Element => {
  const { isPlaying, autobetOnOff, autobetCounter } = props

  const isAutobetRunning = autobetOnOff && autobetCounter > -1
  const interactive = autobetOnOff
    ? isAutobetRunning
      ? true
      : !isPlaying
    : !isPlaying

  const [spriteProps, setSpriteProps] = useState({ rotation: 0 })
  const [tween, setTween] = useState(null)

  useEffect(() => {
    const spritePropsTemp = { rotation: 0 }

    if (isPlaying) {
      setTween(
        TweenMax.to(spritePropsTemp, 0.5, {
          rotation: 360,
          repeat: 20,
          onUpdate: function () {
            setSpriteProps({
              rotation: Utils.remap(this.progress(), 0, 1, 0, 360),
            })
          },
        })
      )
    } else {
      if (tween) {
        tween.kill()
        setTween(null)
      }
    }
  }, [isPlaying])

  return (
    <UIContainer x={'x' in props ? props.x : 0} y={'y' in props ? props.y : 0}>
      <UIButton
        alpha={interactive ? 1 : 0.5}
        interactive={interactive}
        buttonMode={interactive}
        shape={{
          x: 0,
          y: 0,
          width: props.width,
          height: props.height,
          gradientFrom: isAutobetRunning ? 0xeb386e : 0x5792f0,
          gradientTo: isAutobetRunning ? 0xe44141 : 0x6e62e4,
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
          text: tr(
            autobetOnOff
              ? isAutobetRunning
                ? tr('autobetStopButton') +
                  '     ' +
                  (autobetCounter + 1).toString()
                : tr('autobetStartButton')
              : isPlaying
              ? ''
              : tr('spinButton')
          ),
          style: {
            fill: 0xffffff,
            fontFamily: 'Rajdhani-Bold-fnt',
            fontSize: 28,
            align: UITextAlign.Center,
          },
        }}
      />
      {isPlaying && !autobetOnOff && !isAutobetRunning && (
        <UISprite
          x={props.width / 2}
          y={props.height / 2}
          rotation={spriteProps.rotation}
          anchor={{ x: 0.5, y: 0.5 }}
          texture={Engine.instance.getResourceManager().getTexture('dice_png')}
        />
      )}
    </UIContainer>
  )
}

const mapState = state => {
  const { isPlaying, autobetOnOff, autobetCounter } = state

  return {
    isPlaying,
    autobetOnOff,
    autobetCounter,
  }
}

export default connect(mapState, null)(PlayButton)
