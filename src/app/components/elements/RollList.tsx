import React from 'react'
import { connect } from 'react-redux'

import {
  tr,
  UIButton,
  UIContainer,
  UIList,
  UIListStyle,
  UIText,
  UITextAlign,
} from '@daocasino/dc-react-gamengine'

const RollListItem = (props): JSX.Element => {
  const { width, height, rollover, profit } = props

  const interactive = true

  const infoRadius = 8
  const infoRightMargin = 15

  return (
    <UIContainer x={props.x} y={props.y}>
      <UIButton
        interactive={interactive}
        buttonMode={interactive}
        shape={{
          x: 0,
          y: 0,
          width: width,
          height: height,
          borderRadius: 18,
          fill: 0x000000,
          fillAlpha: 0.2,
          interactive: interactive,
          buttonMode: interactive,
          pointerdown: props.pointerdown,
        }}
        text={{
          x: 15,
          y: height / 2,
          anchor: { x: 0, y: 0.5 },
          text: rollover.toString(),
          style: {
            fill: profit > 0 ? 0x61ffb1 : 0xff6f61,
            fontFamily: 'Rajdhani-fnt',
            fontSize: 14,
            align: UITextAlign.Left,
          },
        }}
      />
      <UIButton
        x={width - infoRightMargin - infoRadius / 2}
        y={height / 2}
        interactive={interactive}
        buttonMode={interactive}
        shape={{
          type: 'circle',
          radius: infoRadius,
          fill: 0xffffff,
          fillAlpha: 0.2,
          interactive: interactive,
          buttonMode: interactive,
          pointerdown: props.pointerdown,
        }}
        text={{
          anchor: { x: 0.5, y: 0.5 },
          text: 'i',
          style: {
            fill: 0x000000,
            fontFamily: 'Rajdhani-Bold-fnt',
            fontSize: 14,
            align: UITextAlign.Center,
          },
        }}
      />
    </UIContainer>
  )
}

const createListItem = (index: number, number: number, profit: number) => {
  const width = number.toString().length * 7 + 48
  const height = 36

  return (
    <RollListItem
      key={index.toString()}
      rollover={number}
      profit={profit}
      width={width}
      height={height}
    />
  )
}

const RollList = (props): JSX.Element => {
  const { x, y, rolls, maxRolls } = props

  const numItems = rolls.length
  const items = rolls
    .slice(numItems > maxRolls ? numItems - maxRolls : 0, numItems)
    .map((o, index) => createListItem(index, o.number, o.profit))
  const hasItems = items.length > 0

  const journal = (
    <UIList
      x={0}
      y={-18}
      margin={{ x: 5, y: 0 }}
      style={UIListStyle.Horizontal}>
      {items}
    </UIList>
  )

  const label = (
    <UIText
      anchor={{ x: 0, y: 0.5 }}
      alpha={0.5}
      text={tr('rollJournal')}
      style={{
        fill: 0xffffff,
        fontFamily: 'Rajdhani-fnt',
        fontSize: 14,
        align: UITextAlign.Left,
      }}
    />
  )

  return (
    <UIContainer x={x} y={y}>
      {hasItems ? journal : label}
    </UIContainer>
  )
}

const mapState = state => {
  const { isPlaying, rolls } = state

  return {
    isPlaying,
    rolls,
  }
}

export default connect(mapState, null)(RollList)
