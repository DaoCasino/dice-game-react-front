import * as PIXI from 'pixi.js'

import React from 'react'

import { Engine, tr, UIContainer, UISprite, UIText, UITextAlign, Utils } from 'dc-react-gamengine'

export const RollOver = (props): JSX.Element => {
  const texture = Engine.instance.getResourceManager().getTexture('down_png')

  const valueStyle = {
    fill: 0xffffff,
    fontFamily: 'Rajdhani-fnt',
    fontSize: 20,
    align: UITextAlign.Right,
  }
  const valueText = Utils.formatCurrency(props.value)
  const valueWidth = PIXI.TextMetrics.measureText(valueText, new PIXI.TextStyle(valueStyle)).width

  const totalWidth = valueWidth + texture.width

  return (
    <UIContainer x={props.x} y={props.y}>
      <UIText
        anchor={{ x: 0.5, y: 0 }}
        alpha={0.4}
        text={tr('rollOver')}
        style={{
          fill: 0xffffff,
          fontFamily: 'Rajdhani-fnt',
          fontSize: 16,
          align: UITextAlign.Center,
        }}
      />
      <UIText
        x={-totalWidth / 2}
        y={34}
        anchor={{ x: 0, y: 0.5 }}
        text={valueText}
        style={valueStyle}
      />
      <UISprite
        x={valueWidth - totalWidth / 2}
        y={34}
        anchor={{ x: 0, y: 0.5 }}
        texture={texture}
      />
    </UIContainer>
  )
}
