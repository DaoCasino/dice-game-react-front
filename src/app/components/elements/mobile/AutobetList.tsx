import React from 'react'
import { connect } from 'react-redux'

import {
  UIButton,
  UIContainer,
  UIList,
  UIListStyle,
  UITextAlign,
} from '@daocasino/dc-react-gamengine'
import { setAutobetCountAction } from '../../../state/reducers/ReducerAction'

const AutobetListItem = (props): JSX.Element => {
  const { width, height, count, selected, interactive } = props

  return (
    <UIContainer x={props.x} y={props.y} alpha={interactive ? 1 : 0.5}>
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
          gradientFrom: selected ? 0x5792f0 : -1,
          gradientTo: selected ? 0x6e62e4 : -1,
          gradientType: selected ? 'linear' : 'none',
          interactive: interactive,
          buttonMode: interactive,
          pointerdown: props.pointerdown,
        }}
        text={{
          x: width / 2,
          y: height / 2,
          anchor: { x: 0.5, y: 0.5 },
          text: count ? count.toString() : '∞',
          style: {
            fill: 0xffffff,
            fontFamily: 'Rajdhani-fnt',
            fontSize: 18,
            align: UITextAlign.Center,
          },
        }}
      />
    </UIContainer>
  )
}

const createListItem = (
  width: number,
  height: number,
  index: number,
  count: number,
  selected: boolean = false,
  interactive: boolean = true,
) => {
  return (
    <AutobetListItem
      key={index.toString()}
      count={count}
      width={width}
      height={height}
      selected={selected}
      interactive={interactive}
      buttonMode={interactive}
      pointerdown={() => setAutobetCountAction(count)}
    />
  )
}

const AutobetList = (props): JSX.Element => {
  const {
    x,
    y,
    width,
    counts,
    isPlaying,
    autobetOnOff,
    autobetCount,
    autobetCounter,
  } = props

  const isAutobetRunning = autobetOnOff && autobetCounter > -1
  const interactive = !isPlaying && !isAutobetRunning

  const items = counts.map((count, index) => {
    const w = width / counts.length - 5
    const h = 50

    return createListItem(
      w,
      h,
      index,
      count,
      count === autobetCount,
      interactive,
    )
  })

  return (
    <UIContainer x={x} y={y}>
      <UIList
        x={0}
        y={-18}
        margin={{ x: 5, y: 0 }}
        style={UIListStyle.Horizontal}>
        {items}
      </UIList>
    </UIContainer>
  )
}

const mapState = state => {
  const { isPlaying, autobetOnOff, autobetCount, autobetCounter } = state

  return {
    isPlaying,
    autobetOnOff,
    autobetCount,
    autobetCounter,
  }
}

export default connect(mapState, null)(AutobetList)
