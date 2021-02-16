import React, { useState } from 'react'

import { tr, UIButton, UIContainer, UIRectangle, UIText, UITextAlign } from '@daocasino/dc-react-gamengine'

const createButton = (props: any) => {
  return (
    <UIButton
      x={'x' in props ? props.x : 0}
      y={'y' in props ? props.y : 0}
      alpha={props.visible ? 1 : 0.01}
      interactive={props.interactive}
      buttonMode={props.buttonMode}
      shape={{
        x: 0,
        y: 0,
        width: props.width,
        height: props.height,
        gradientFrom: 0x5792f0,
        gradientTo: 0x6e62e4,
        gradientType: 'linear',
        borderRadius: 18,
        interactive: props.interactive,
        buttonMode: props.buttonMode,
        pointerdown: () => {
          'pointerdown' in props ? props.pointerdown() : null
        },
      }}
      text={{
        x: props.width / 2,
        y: props.height / 2,
        anchor: { x: 0.5, y: 0.5 },
        text: props.text,
        style: {
          fill: 0xffffff,
          fontFamily: 'Rajdhani-fnt',
          fontSize: 14,
          align: UITextAlign.Center,
        },
      }}
    />
  )
}

const createText = (props: any) => {
  return (
    <UIText
      x={props.x}
      y={props.y}
      key={props.key}
      anchor={{ x: 0.5, y: 0.5 }}
      text={props.text}
      style={{
        fill: 0xffffff,
        fontFamily: 'Rajdhani-fnt',
        fontSize: 14,
        align: UITextAlign.Center,
      }}
    />
  )
}

export const TripleSelectButton = (props): JSX.Element => {
  const [index, setIndex] = useState('index' in props ? props.index : 0)

  const elementWidth = props.width / 3

  return (
    <UIContainer
      width={props.width}
      height={props.height}
      x={props.x}
      y={props.y}
      alpha={props.disabled ? 0.5 : 1}
      interactive={!props.disabled}
    >
      <UIRectangle
        borderRadius={18}
        fill={0x000000}
        fillAlpha={0.4}
        width={props.width}
        height={props.height}
      />
      {createText({
        key: 'resetLabel',
        text: tr('reset'),
        x: elementWidth / 2,
        y: props.height / 2,
      })}
      {createButton({
        text: tr('reset'),
        width: elementWidth,
        height: props.height,
        visible: index == 0,
        buttonMode: !props.disabled,
        interactive: !props.disabled,
        pointerdown: () => setIndex(0),
      })}
      {createText({
        key: 'increaseByLabel',
        text: tr('increaseBy'),
        x: props.width / 2,
        y: props.height / 2,
      })}
      {createButton({
        text: tr('increaseBy'),
        width: elementWidth,
        height: props.height,
        x: props.width / 2 - elementWidth / 2,
        visible: index == 1,
        buttonMode: !props.disabled,
        interactive: !props.disabled,
        pointerdown: () => setIndex(1),
      })}
      {createText({
        key: 'decreaseByLabel',
        text: tr('decreaseBy'),
        x: props.width - elementWidth / 2,
        y: props.height / 2,
      })}
      {createButton({
        text: tr('decreaseBy'),
        width: elementWidth,
        height: props.height,
        x: props.width - elementWidth,
        visible: index == 2,
        buttonMode: !props.disabled,
        interactive: !props.disabled,
        pointerdown: () => setIndex(2),
      })}
    </UIContainer>
  )
}
