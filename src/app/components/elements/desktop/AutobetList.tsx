import React from 'react'
import { connect } from 'react-redux'

import { UIButton, UIContainer, UIList, UIListStyle, UITextAlign } from '@daocasino/dc-react-gamengine'
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
          text: count.toString(),
          style: {
            fill: 0xffffff,
            fontFamily: 'Rajdhani-fnt',
            fontSize: 14,
            align: UITextAlign.Center,
          },
        }}
      />
    </UIContainer>
  )
}

const createListItem = (
  index: number,
  count: number | string,
  selected: boolean = false,
  interactive: boolean = true,
) => {
  const initialCount = count

  if (count === Number.MAX_SAFE_INTEGER) {
    count = '∞'
  }

  const width = count.toString().length * 7 + 30
  const height = 36

  return (
    <AutobetListItem
      key={index.toString()}
      count={count}
      width={width}
      height={height}
      selected={selected}
      interactive={interactive}
      buttonMode={interactive}
      pointerdown={() => setAutobetCountAction(initialCount)}
    />
  )
}

const AutobetList = (props): JSX.Element => {
  const { x, y, counts, isPlaying, autobetCount } = props

  const items = counts.map((count, index) =>
    createListItem(index, count, count === autobetCount, !isPlaying),
  )

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
  const { isPlaying, autobetCount } = state

  return {
    isPlaying,
    autobetCount,
  }
}

export default connect(mapState, null)(AutobetList)
